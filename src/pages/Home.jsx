import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setPage } from '../redux/Slices/filterSlice'
import axios from "axios";


const Home = ({ searchValue }) => {

    const dispatch = useDispatch();
    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector((state) => state.filter.sort);
    const page = useSelector((state) => state.filter.page);
    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onClickPage = (number) => {
        dispatch(setPage(number))
    }
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const limit = 20;

    console.log(items);
    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((json) => {
                setCategories([{ slug: "", name: "Все категории" }, ...json])
                
            })
            .catch((err) => {
                console.error(err);
                alert('Ошибка загрузки категорий(')
            })
    }, [])

    useEffect(() => {
        setIsLoading(true)
        const categoryQuery = categoryId === 0 ? '' : `category/${categories[categoryId]?.slug}`;
        const sortQuery = `sortBy=${sortType.sortProperty}&order=${sortType.order}`;
        const paginationQuery = `limit=${limit}&skip=${page}`;
        axios.get(`https://dummyjson.com/products${categoryQuery ? "/" + categoryQuery : ""}?${paginationQuery}&${sortQuery}`)
            .then((res) =>
                setItems(res.data.products),
                setIsLoading(false)
            ).catch((err) => {
                console.error('ERROR', err);
                alert('Ошибка при загрузки товаров (')
            })
        window.scrollTo(0, 0);
    }, [categoryId, sortType, page]);

    useEffect(() => {
        setPage(0);
    }, [categoryId, sortType]);

    const pizzas = items.filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false
    }).map((obj) => (
        <PizzaBlock
            key={obj.id}
            id={obj.id}
            title={obj.title}
            price={obj.price}
            images={obj.thumbnail}
            description={obj.description}
        />
    ))
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={onClickCategory}
                />
                <Sort
                />
            </div>
            <h2 className="content__title">Все товары</h2>
            <div className="content__items">
                {
                    isLoading
                        ?
                        skeleton
                        :
                        pizzas
                }
            </div>
            <Pagination value={page} onClickPage={onClickPage} />
        </div>
    )
}

export default Home;



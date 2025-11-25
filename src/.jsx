
import { useEffect, useState } from "react";
import Categories from "../components/Categories/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort/Sort";

const Home = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: "популярности (убыв)",
        sort: "rating",
        order: "desc",
    });
    const [page, setPage] = useState(3); // Текущая страница
    const [total, setTotal] = useState(0); // Общее количество продуктов
    const limit = 20; // Количество продуктов на странице

    // Опции сортировки
    const sortOptions = [
        { name: "популярности (убыв)", sort: "rating", order: "desc" },
        { name: "популярности (возр)", sort: "rating", order: "asc" },
        { name: "цене (убыв)", sort: "price", order: "desc" },
        { name: "цене (возр)", sort: "price", order: "asc" },
        { name: "алфавиту (убыв)", sort: "title", order: "desc" },
        { name: "алфавиту (возр)", sort: "title", order: "asc" },
    ];

    // Загрузка категорий
    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки категорий");
                return res.json();
            })
            .then((json) => {
                setCategories([{ slug: "", name: "Все категории" }, ...json]);
            })
            .catch((err) => {
                console.error(err);
                alert("Ошибка загрузки категорий");
            });
    }, []);

    // Загрузка продуктов
    useEffect(() => {
        if (!categories.length) return; // Ждём загрузки категорий

        setIsLoading(true);
        const categoryQuery = categoryId === 0 ? "" : `category/${categories[categoryId]?.slug}`;
        const sortQuery = `sortBy=${sortType.sort}&order=${sortType.order}`;
        const paginationQuery = `limit=${limit}&skip=${page * limit}`;
        const url = `https://dummyjson.com/products${categoryQuery ? "/" + categoryQuery : ""}?${paginationQuery}&${sortQuery}`;

        console.log("Запрос:", url); // Для отладки

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки данных");
                return res.json();
            })
            .then((json) => {
                setItems(json.products || []);
                setTotal(json.total || 0); // Сохраняем общее количество продуктов
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                alert("Ошибка при загрузке товаров");
                setItems([]);
                setIsLoading(false);
            });

        window.scrollTo(0, 0);
    }, [categoryId, sortType, page, categories]);

    // Сброс страницы при смене категории или сортировки
    useEffect(() => {
        setPage(0); // Сбрасываем страницу на 0 при смене категории или сортировки
    }, [categoryId, sortType]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={(i) => setCategoryId(i)}
                    categories={categories}
                />
                <Sort
                    sortType={sortType}
                    onClickSort={(sortObj) => setSortType(sortObj)}
                    sortOptions={sortOptions}
                />
            </div>
            <h2 className="content__title">
                {categoryId === 0 ? "Все товары" : categories[categoryId]?.name || "Товары"}
            </h2>
            <div className="content__items">
                {isLoading ? (
                    [...new Array(limit)].map((_, index) => <Skeleton key={index} />)
                ) : items.length ? (
                    items.map((obj) => (
                        <PizzaBlock
                            key={obj.id}
                            title={obj.title}
                            price={obj.price}
                            images={obj.thumbnail}
                            description={obj.description}
                        />
                    ))
                ) : (
                    <p>Товары не найдены</p>
                )}
            </div>
            {/* Кнопка "Загрузить ещё" */}
            {items.length < total && !isLoading && (
                <button
                    className="load-more"
                    onClick={() => setPage(page + 1)}
                    disabled={isLoading}
                >
                    Загрузить ещё
                </button>
            )}
        </div>
    );
};

export default Home;
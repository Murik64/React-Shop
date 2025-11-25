import ReactPaginate from 'react-paginate'
import style from './Pagination.module.scss'
const Pagination = ({ value, onClickPage }) => {

    return (
        <>
            <ReactPaginate
                className={style.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => onClickPage(event.selected)}
                pageRangeDisplayed={10}
                pageCount={10}
                forcePage={value}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default Pagination;
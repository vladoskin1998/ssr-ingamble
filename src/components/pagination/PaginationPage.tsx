import ReactPaginate from 'react-paginate'
import './style.css'

export const PaginationPage = ({ currentPage = 1, setCurrentPage = () => {}, countElem = 30, countPageElem = 5 }: { currentPage?: number; countElem?: number; setCurrentPage?: (n: number) => void; countPageElem?: number }) => {
    const totalPages = Math.ceil(countElem / countPageElem)

    const handlePageChange = (selectedItem: { selected: number }) => {
        const newPage = selectedItem.selected + 1
        setCurrentPage(newPage)
    }



    return (
        <>
            {totalPages > currentPage ? (
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className="main-loyaltie-programs__btn-more"
                >
                    Show More
                </button>
            ) : (
                <></>
            )}
            {totalPages <= 1 ? (
                <></>
            ) : (
                <ReactPaginate
                    previousLabel={
                        currentPage > 1 ? (
                            <button>
                                <svg>
                                    <use xlinkHref="#arrow-btn"></use>
                                </svg>
                            </button>
                        ) : null
                    }
                    nextLabel={
                        currentPage < totalPages ? (
                            <button>
                                <svg>
                                    <use xlinkHref="#arrow-btn"></use>
                                </svg>
                            </button>
                        ) : null
                    }
                    breakLabel="..."
                    breakClassName="pages-pagination__page-numbers dots"
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName="main-loyaltie-programs__pagination pagination"
                    pageClassName="pages-pagination__page-numbers"
                    pageLinkClassName="pagination__link"
                    previousClassName={currentPage > 1 ? 'pagination__btn pagination__btn_prev' : ''}
                    nextClassName={currentPage < totalPages ? 'pagination__btn pagination__btn_next' : ''}
                    activeClassName="paginate--current"
                    forcePage={currentPage - 1}
                />
            )}
        </>
    )
}

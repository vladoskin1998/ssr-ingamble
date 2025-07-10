import ReactPaginate from 'react-paginate'
import './style.css'
import { useEffect, useState } from 'react'
import { isMobileDevice } from '@/helper/adaprive-bahavior'

export const PaginationPage = ({ 
    currentPage = 1, 
    setCurrentPage = () => {}, 
    countElem = 30, 
    countPageElem = 5,
    onShowMore = null, // Новий проп для функції "Show More"
    isLoading = false // Новий проп для стану завантаження
}: { 
    currentPage?: number; 
    countElem?: number; 
    setCurrentPage?: (n: number) => void; 
    countPageElem?: number;
    onShowMore?: ((nextPage: number) => void) | null;
    isLoading?: boolean;
}) => {
    const totalPages = Math.ceil(countElem / countPageElem)
    const [isMobile, setIsMobile] = useState(false)

    // Визначаємо тип пристрою при монтуванні компонента
    useEffect(() => {
        setIsMobile(isMobileDevice());
        
        const handleResize = () => {
            setIsMobile(isMobileDevice());
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePageChange = (selectedItem: { selected: number }) => {
        const newPage = selectedItem.selected + 1
        setCurrentPage(newPage)
    }

    const handleShowMore = (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            
            if (isMobile && onShowMore) {
                // Для мобільних використовуємо спеціальну функцію
                onShowMore(nextPage);
            } else {
                // Для десктопів стандартна поведінка
                setCurrentPage(nextPage);
            }
        }
    }

    // Логіка показу кнопки "Show More"
    const shouldShowMoreButton = () => {
        if (isMobile && onShowMore) {
            // Для мобільних з накопичувальним завантаженням показуємо кнопку, 
            // якщо поточна сторінка менше загальної кількості сторінок
            return currentPage < totalPages;
        } else {
            // Для десктопів стандартна логіка
            return totalPages > currentPage;
        }
    };



    return (
        <>
            {shouldShowMoreButton() ? (
                <button
                    onClick={handleShowMore}
                    className="main-loyaltie-programs__btn-more"
                    disabled={isLoading}
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

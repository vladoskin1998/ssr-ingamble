'use client'
import { useAdaptiveBehavior, useHandlerSidebarActive } from '@/context/AppContext'
import { useFilterContext } from '@/context/FilterContext'
import { sliceString } from '@/helper'
import {  useState } from 'react'
import { FormatedCategoryType } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default function CheckMoreWhatSuitsYouBest() {
    const { isSidebarActive, category } = useAdaptiveBehavior()
    const { handlerSidebarActive } = useHandlerSidebarActive()

    const [isMobile] = useState(false)
    
    // Не рендеримо доки дані не завантажені (для уникнення hydration mismatch)
    if (!category || category.length === 0) {
        return (
            <section className="main-gamble__bottom-filter-tags bottom-filter-tags check-bottom-filter-tags">
                <div className="bottom-filter-tags__container container">
                    <div className="bottom-filter-tags__top top">
                        <div className="top__title-block">
                            <span className="top__title-icon">
                                <Image width={18} height={18} loading="lazy" src="/img/icons/search-filter.svg" alt="search" />
                            </span>
                            <h2 className="top__title">Get More of What Suits You Best</h2>
                        </div>
                    </div>
                    <div className="bottom-filter-tags__row">
                        {/* Загрузка... або заглушка */}
                    </div>
                    <button onClick={() => handlerSidebarActive(!isSidebarActive)} className="bottom-filter-tags__btn-filter">
                        <span>
                            <svg>
                                <use xlinkHref="#filter"></use>
                            </svg>
                        </span>
                        Filter What You need
                    </button>
                </div>
            </section>
        )
    }
    // const [isMobile, setIsMobile] = useState(window.innerWidth <= 480)

    // useEffect(() => {
    //     const handleResize = () => setIsMobile(window.innerWidth <= 480)
    //     window.addEventListener('resize', handleResize)

    //     handleResize()
    //     return () => window.removeEventListener('resize', handleResize)
    // }, [])

    return (
        <section className="main-gamble__bottom-filter-tags bottom-filter-tags check-bottom-filter-tags">
            <div className="bottom-filter-tags__container container">
                <div className="bottom-filter-tags__top top">
                    <div className="top__title-block">
                        <span className="top__title-icon">
                            <Image width={18} height={18} loading="lazy" src="/img/icons/search-filter.svg" alt="search" />
                        </span>
                        <h2 className="top__title">Get More of What Suits You Best</h2>
                    </div>
                </div>
                <div className="bottom-filter-tags__row">
                    {category?.map((item, index) => (
                        <div className="bottom-filter-tags__column bottom-filter-tags__link" key={`${item.slug}-${index}`}>
                            <ItemCategory item={item} isMobile={isMobile} />
                        </div>
                    )) || []}
                </div>
                <button onClick={() => handlerSidebarActive(!isSidebarActive)} className="bottom-filter-tags__btn-filter">
                    <span>
                        <svg>
                            <use xlinkHref="#filter"></use>
                        </svg>
                    </span>
                    Filter What You need
                </button>
            </div>
        </section>
    )
}

const ItemCategory = ({ item, isMobile }: { item: FormatedCategoryType; isMobile: boolean }) => {
    const { fooCategorySanitazeLink } = useFilterContext()

    const { seeAllLink, seeAllFoo } = fooCategorySanitazeLink({
        type_category: item.categoryType,
        slug: item.slug,
    })

    return (
        <Link
            href={seeAllLink}
            onClick={seeAllFoo}
            aria-label="Put your description here."
            className="bottom-filter-tags__btn slide-filter-tags-gamble__btn"
        >
            {isMobile ? sliceString(item?.name, 23) : item?.name}
        </Link>
    )
}

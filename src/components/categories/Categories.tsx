'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { useAdaptiveBehavior, useHandlerSidebarActive } from '@/context/AppContext'
import { useEffect, useState, useMemo } from 'react'
import { DataHomeItemsBlockCategoryType, DataHomeItemsBlockEnumCategory, FormatedCategoryType } from '@/types'
import { useFilterContext } from '@/context/FilterContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation' // добавьте импорт

export const Categories = ({
    type_category = DataHomeItemsBlockEnumCategory.all_category as DataHomeItemsBlockCategoryType,
}: {
    type_category?: DataHomeItemsBlockCategoryType
}) => {
    const { isSidebarActive, category } = useAdaptiveBehavior()
    const { handlerSidebarActive } = useHandlerSidebarActive()
    const pathname = usePathname() // используйте хук

    const listCategory = useMemo(() => {
        let filteredCategory =
            type_category === (DataHomeItemsBlockEnumCategory.all_category as DataHomeItemsBlockCategoryType)
                ? category
                : category.filter((item) => item.categoryType === type_category)

        if (pathname === '/') {
            filteredCategory = filteredCategory.filter((item) => item.categoryType !== DataHomeItemsBlockEnumCategory.loyaltie_category)
        }

        return filteredCategory
    }, [category, type_category, pathname])

    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 480 : false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 480)
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (!listCategory) {
        return null
    }

    return (
        <div className="filter-tags-gamble main-gamble__filter-tags categorie--tags">
            <div className="filter-tags-gamble__container container" style={{ display: 'flex' }}>
                <div
                    className="filter-tags-gamble__slide slide-filter-tags-gamble slide-filter-tags-gamble_first slide-filter-tags-gamble_mob"
                    style={{ marginRight: '4px' }}
                    onClick={() => {
                        handlerSidebarActive(!isSidebarActive)
                    }}
                >
                    <button className="title-filters-sidebar-gamble__btn filter-open" style={{ display: 'block', padding: '12px' }}>
                        <span className="title-filters-sidebar-gamble__btn-icon_main">
                            <svg>
                                <use xlinkHref="#filter"></use>
                            </svg>
                        </span>
                    </button>
                </div>
                <Swiper
                    slidesPerView="auto"
                    breakpoints={{
                        320: {
                            spaceBetween: 4,
                        },
                        1650.98: {
                            spaceBetween: 8,
                        },
                        1920: {
                            spaceBetween: 8,
                        },
                    }}
                    spaceBetween={8}
                    style={{ margin: 0 }}
                >
                    {isMobile && (
                        <>
                            {pathname !== '/bonuses' && (
                                <SwiperSlide key={1} style={{ width: 'auto' }}>
                                    <Link
                                        rel="nofollow noopener"
                                        href={'/bonuses'}
                                        aria-label="Put your description here."
                                        className="slide-filter-tags-gamble__btn"
                                        prefetch={false} // отключаем предзагрузку для мобильных
                                    >
                                        Bonuses
                                    </Link>
                                </SwiperSlide>
                            )}

                            {pathname !== '/casinos' && (
                                <SwiperSlide key={3} style={{ width: 'auto' }}>
                                    <Link
                                        rel="nofollow noopener"
                                        href={'/casinos'}
                                        aria-label="Put your description here."
                                        className="slide-filter-tags-gamble__btn"
                                        prefetch={false} // отключаем предзагрузку для мобильных
                                    >
                                        Casinos
                                    </Link>
                                </SwiperSlide>
                            )}
                            {pathname !== '/all-loyalties' && (
                                <SwiperSlide key={2} style={{ width: 'auto' }}>
                                    <Link
                                        rel="nofollow noopener"
                                        href={'/all-loyalties'}
                                        aria-label="Put your description here."
                                        className="slide-filter-tags-gamble__btn"
                                        prefetch={false} // отключаем предзагрузку для мобильных
                                    >
                                        Loyalty
                                    </Link>
                                </SwiperSlide>
                            )}
                        </>
                    )}
                    {listCategory.map((item, index) => (
                        <SwiperSlide key={index + 10} style={{ width: 'auto' }}>
                            <ItemCategory item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

const ItemCategory = ({ item }: { item: FormatedCategoryType }) => {
    const { fooCategorySanitazeLink } = useFilterContext()

    const { seeAllLink, seeAllFoo } = useMemo(
        () =>
            fooCategorySanitazeLink({
                type_category: item.categoryType,
                slug: item.slug,
            }),
        [fooCategorySanitazeLink, item.categoryType, item.slug],
    )

    return (
        <Link
            rel="nofollow noopener"
            href={`${seeAllLink}/1`}
            onClick={seeAllFoo}
            aria-label="Put your description here."
            className="slide-filter-tags-gamble__btn"
            prefetch={false} // отключаем предзагрузку для мобильных
        >
            {item?.name}
        </Link>
    )
}

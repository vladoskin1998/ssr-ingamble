'use client'
// import { Wraper } from '../Wraper'
import { Categories } from '@/components/categories/Categories'
import { BreadCrumb } from '@/components/breadcrumb/index'
import { PaginationPage } from '@/components/pagination/PaginationPage'

import $api from '@/http'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { DataHomeItemsBlockEnumCategory, LoyaltiesFilterBodyType, NAMETITLECATEGORYSLUGType, SeeAllEssentialLoyaltyCasino } from '../../types'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'
import './style.css'

import { useEffect, useState, useMemo } from 'react'
import { cloacingFetch, cloacingLink, filterEmptyValues, LOYALTIECATEGORYIES } from '@/helper'
import { LoadingLink } from '@/components/LoadingLink'
import { useParams } from 'next/navigation'
import { initialLoyaltiesFilters, useFilterContext } from '@/context/FilterContext'
import initializeAdaptiveBehavior from '@/helper/adaprive-bahavior'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const CheckMoreWhatSuitsYouBest = dynamic(() => import('@/components/categories/CheckMoreWhatSuitsYouBest'), {
    loading: () => null,
})
const SubscribeForm = dynamic(() => import('@/components/subscribe/SubscribeForm'), {
    loading: () => null,
})
const BottomInfo = dynamic(() => import('@/components/footer/BottomInfo'), {
    loading: () => null,
})
const Footer = dynamic(() => import('@/components/footer'), {
    loading: () => null,
})

const pathBreadCrumb = [
    {
        name: 'Home',
        link: '/',
    },
    {
        name: 'Essential VIP Loyalty Programs',
        link: '/all-loyalties',
    },
]

// Define NAMETITLECATEGORYSLUG with type safety
const NAMETITLECATEGORYSLUG: NAMETITLECATEGORYSLUGType = {
    'loyalty-rank': { key: 'loyalty_rank', value: { min: 8, max: 10 } },
    'vip-manager': { key: 'vip_manager', value: true },
    'level-up-bonus': { key: 'level_up_bonus', value: true },
    withdrawals: { key: 'withdrawals', value: true },
    'special-prizes': { key: 'special_prizes', value: true },
    gifts: { key: 'gifts', value: true },
}

const getFilteringLoyaltiesList = async (payload: LoyaltiesFilterBodyType, page: number, pageSize: number) => {
    const body = filterEmptyValues(payload)
    const response = await $api.post(`filter/loyalty/?page=${page}&page_size=${pageSize}`, body)
    return response.data
}

// Helper function to create unique identifier for casino items
const createUniqueId = (item: SeeAllEssentialLoyaltyCasino, index: number): string => {
    const safeName = item.casino_name?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() || 'unknown'
    const safeSlug = item.casino_slug || `casino-${index}`
    return `${safeSlug}-${safeName}-${index}`
}

// Helper function to remove duplicates from array based on casino_slug
const removeDuplicates = (items: SeeAllEssentialLoyaltyCasino[]): SeeAllEssentialLoyaltyCasino[] => {
    const seen = new Set<string>()
    const duplicates: string[] = []
    const result = items.filter(item => {
        if (seen.has(item.casino_slug)) {
            duplicates.push(item.casino_slug)
            return false
        }
        seen.add(item.casino_slug)
        return true
    })
    
    // if (duplicates.length > 0) {
    //     console.warn('Removed duplicate casino items:', duplicates)
    // }
    
    return result
}

const SeeAllEssentialsLoyalty = ({ 
    loyaltieSlug,
    onContentReady,
    setContentLoaded 
}: { 
    loyaltieSlug?: string | null
    onContentReady?: (isLoading: boolean, dataLength: number) => (() => void) | undefined
    setContentLoaded?: () => void
}) => {
    // document.title = "All Essentials Loyalty"

    const { loyaltiesFilters } = useFilterContext()
    const params = useParams()
    
    // Використовуємо пропс loyaltieSlug замість params.loyaltie_slug
    const loyaltie_slug = (loyaltieSlug || params.loyaltie_slug) as string | undefined

    const [currentPage, setCurrentPage] = useState(1)
    const [allData, setAllData] = useState<SeeAllEssentialLoyaltyCasino[]>([])
    
    // Initialize isMobile immediately to avoid hydration issues
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 900
        }
        return false
    })
    
    // Use useMemo to ensure stable countPageSize
    const countPageSize = useMemo(() => {
        return isMobile ? 8 : 15
    }, [isMobile])

    // Create the filter for this specific page
    const pageSpecificFilters = useMemo(() => {
        if (loyaltie_slug && NAMETITLECATEGORYSLUG[loyaltie_slug]) {
            const { key, value } = NAMETITLECATEGORYSLUG[loyaltie_slug]
            return {
                ...initialLoyaltiesFilters,
                [key]: value,
            }
        }
        return loyaltiesFilters
    }, [loyaltie_slug, loyaltiesFilters])

    const { data, isLoading } = useQuery({
      queryKey: ['filter/loyalty', pageSpecificFilters, currentPage, countPageSize],
      queryFn: () => getFilteringLoyaltiesList(pageSpecificFilters, currentPage, countPageSize),
      placeholderData: keepPreviousData, // заміна keepPreviousData: true
      staleTime: 1000 * 60 * 5,
      // Don't disable query - let it run with initial filters
    })

    // Reset data when filters change (not just page)
    useEffect(() => {
        setAllData([])
        setCurrentPage(1)
    }, [pageSpecificFilters])

    // Handle data processing
    useEffect(() => {
        if (!data?.results) {
            return
        }

        // Process data immediately when it arrives
        const processedData = removeDuplicates(data.results)
        
        if (isMobile) {
            if (currentPage === 1) {
                // For mobile on first page, replace all data
                setAllData(processedData)
            } else {
                // For mobile on subsequent pages, append new unique items
                setAllData((prevData) => {
                    const combinedData = [...prevData, ...data.results]
                    return removeDuplicates(combinedData)
                })
            }
        } else {
            // For desktop, always replace data (no pagination accumulation)
            setAllData(processedData)
        }
    }, [data, currentPage, isMobile])

    // Handle window resize
    useEffect(() => {
        // Update mobile state on resize only
        const handleResize = () => setIsMobile(window.innerWidth < 900)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Initialize adaptive behavior after loading
    useEffect(() => {
        initializeAdaptiveBehavior()
    }, [isLoading])

    // Use data directly if allData is empty to ensure immediate rendering
    const displayedData = allData.length > 0 ? allData : (data?.results ? removeDuplicates(data.results) : [])

    // Позначаємо контент як завантажений коли дані готові
    useEffect(() => {
        if (setContentLoaded && !isLoading && displayedData.length >= 0) {
            // Використовуємо стандартну логіку setContentLoaded
            setContentLoaded()
        } else if (onContentReady) {
            // Fallback на старий колбек якщо він переданий
            const cleanup = onContentReady(isLoading, displayedData.length)
            return cleanup
        }
    }, [isLoading, displayedData.length, setContentLoaded, onContentReady])

    // Show loader only on initial load, not when data is already available
    // if (isLoading) {
    //     return <LogoLoader />
    // }

    return (
            <main className="gamble__loyaltie-programs main-gamble loyaltie-programs loyaltie-filtered__main">
                <div className="main-gamble__body">
                    <Categories type_category={DataHomeItemsBlockEnumCategory.loyaltie_category} />
                    <BreadCrumb
                        path={
                            loyaltie_slug
                                ? [
                                      ...pathBreadCrumb,
                                      {
                                          name: LOYALTIECATEGORYIES.find((item) => item.slug === loyaltie_slug)?.name || 'Loyalty Programs',
                                          link: `/all-loyalties/${loyaltie_slug}`,
                                      },
                                  ]
                                : pathBreadCrumb
                        }
                    />
                    <section className="loyaltie-programs__main main-loyaltie-programs">
                        <div className="main-loyaltie-programs__container container">
                            <div className="main-loyaltie-programs__top top">
                                <div className="top__row">
                                    <div className="top__column">
                                        <div className="top__title-block">
                                            <h2 className="top__title">{loyaltie_slug ? LOYALTIECATEGORYIES.find((item) => item.slug === loyaltie_slug)?.name : 'Essential VIP Loyalty Programs'}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-loyaltie-programs__items loyaltie-programs__items">
                                {displayedData?.length > 0 ? (
                                    displayedData.map((item: SeeAllEssentialLoyaltyCasino, index: number) => {
                                        // Create a more unique key using multiple identifiers
                                        const uniqueKey = createUniqueId(item, index)
                                        
                                        return (
                                        <div 
                                          className="loyaltie-programs__item item-loyaltie-programs"
                                          key={uniqueKey}
                                        >
                                            <div className="item-loyaltie-programs__row">
                                                <div className="item-loyaltie-programs__main">
                                                    <LoadingLink href={`/casino/${item.casino_slug}`} className="item-loyaltie-programs__image loyalty-img-custom">
                                                        <LazyCardImg img={item?.casino_image || ''} width="100%" />
                                                    </LoadingLink>
                                                </div>
                                                <div className="item-loyaltie-programs__content content-item-loyaltie-programs">
                                                    <div className="content-item-loyaltie-programs__top top-content-item-loyaltie-programs">
                                                        <h2 className="top-content-item-loyaltie-programs__name">{item.casino_name}</h2>
                                                        <div className="info-casino-card__stake-rating">
                                                            <span className="info-casino-card__stake-rating-icon">
                                                                <Image src="/img/icons/star.svg" width={16} height={16} alt="star" />
                                                            </span>
                                                            <span className="info-casino-card__stake__rating-number">{item.casino_rank}</span>
                                                        </div>
                                                    </div>
                                                    <div className="content-item-loyaltie-programs__features features-essential-programs-gamble">
                                                        {item.loyalty_program.loyalty_keypoint.map((it: { text_1: string; text_2: string; image?: string | null }, keypointIndex: number) => (
                                                            <div 
                                                              className="features-essential-programs-gamble__column"
                                                              key={`${uniqueKey}-keypoint-${keypointIndex}`}
                                                            >
                                                                <div className="features-essential-programs-gamble__item">
                                                                    <div className="features-essential-programs-gamble__icon ">
                                                                        <LazyCardImg img={it?.image || ''} width="100%" size="medium" />
                                                                    </div>
                                                                    <div className="features-essential-programs-gamble__info">
                                                                        <div className="features-essential-programs-gamble__name">{it.text_1}</div>
                                                                        <div className="features-essential-programs-gamble__text">{it.text_2}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}

                                                        <div className="features-essential-programs-gamble__column features-essential-programs-gamble__column_rating">
                                                            <div className="features-essential-programs-gamble__item features-essential-programs-gamble__item_rating">
                                                                <div className="item-essential-programs-gamble__rating">
                                                                    <div className="item-essential-programs-gamble__rating-number">
                                                                        {parseInt(String(item?.loyalty_program?.loyalty_rank), 10)}
                                                                        /10
                                                                    </div>
                                                                    <div className="item-essential-programs-gamble__rating-body">
                                                                        <div className="item-essential-programs-gamble__rating-items items-rating-essential-programs-gamble">
                                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                                                                                <div
                                                                                    key={`${uniqueKey}-rating-${level}`}
                                                                                    className={`items-rating-essential-programs-gamble__item items-rating-essential-programs-gamble__item_${level} ${
                                                                                        level <= (Number(item?.loyalty_program?.loyalty_rank) || 10) && 'full'
                                                                                    }`}
                                                                                ></div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="item-essential-programs-gamble__rating-text">{item?.loyalty_program?.loyalty_level_description || 'Excellent'}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content-item-loyaltie-programs__bottom bottom-content-item-loyaltie-programs">
                                                        <div className="bottom-content-item-loyaltie-programs__btns">
                                                            <a
                                                                href={cloacingLink(item?.casino_name)}
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    e.preventDefault()
                                                                    cloacingFetch(item?.casino_affiliate_link)
                                                                    window.open(item?.casino_affiliate_link || item?.url_casino, '_blank', 'noopener,noreferrer')
                                                                }}
                                                                className="bottom-content-item-loyaltie-programs__btn-view"
                                                            >
                                                                Visit Casino
                                                            </a>
                                                            <LoadingLink href={`/casino/${item.loyalty_program.loyalty_slug}/loyalty`} aria-label="Put your description here." className="bottom-content-item-loyaltie-programs__btn-more">
                                                                Read More
                                                            </LoadingLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )})
                                ) : (
                                    !isLoading && (
                                        <div className="no-results">
                                            <p>No loyalty programs found matching your criteria.</p>
                                        </div>
                                    )
                                )}
                            </div>
                            <PaginationPage
                                countElem={data?.count}
                                currentPage={currentPage}
                                countPageElem={countPageSize}
                                setCurrentPage={(s) => {
                                    setCurrentPage(s)
                                    if (!isMobile) {
                                        window.scrollTo({
                                            behavior: 'smooth',
                                            top: 0,
                                        })
                                    }
                                }}
                            />
                        </div>
                    </section>
                    <CheckMoreWhatSuitsYouBest />
                    <SubscribeForm />
                    <BottomInfo />
                    <Footer />
                </div>
            </main>
    )
}

SeeAllEssentialsLoyalty.displayName = 'SeeAllEssentialsLoyalty'

export default SeeAllEssentialsLoyalty
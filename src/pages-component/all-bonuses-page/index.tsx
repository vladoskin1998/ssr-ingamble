'use client'
import { BreadCrumb } from '@/components/breadcrumb/index'
import { Categories } from '@/components/categories/Categories'
import { PaginationPage } from '@/components/pagination/PaginationPage'

import { useEffect, useState } from 'react'
import './style.css'
import $api from '@/http'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { LogoLoader } from '@/components/loader/LogoLoader'
import { useAdaptiveBehavior } from '@/context/AppContext'
import { SeeAllBonus as SeeAllBonusType, SeeAllBonusResponse, DataHomeItemsBlockEnumCategory } from '@/types'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'
import { cloacingFetch, cloacingLink, getTagColorByindex, sanitizeNumberLike } from '@/helper'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { NoResult } from '@/components/no-result'
import initializeAdaptiveBehavior from '@/helper/adaprive-bahavior'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const CheckMoreWhatSuitsYouBest = dynamic(() => import('@/components/categories/CheckMoreWhatSuitsYouBest'))
const SubscribeForm = dynamic(() => import('@/components/subscribe/SubscribeForm'))
const BottomInfo = dynamic(() => import('@/components/footer/BottomInfo'))
const Footer = dynamic(() => import('@/components/footer'))

const pathBreadCrumb = [
    {
        name: 'Home',
        link: '/',
    },
    {
        name: 'All Bonuses',
        link: '/all-bonuses',
    },
]

const getAllBonusFetchData = async (page: number, slug: string | null, countPageSize: number) => {
    if (process.env.USE_NEXT_API === 'true') {
        const params = new URLSearchParams()
        if (slug) params.set('slug', slug)
        params.set('page', page.toString())
        params.set('page_size', countPageSize.toString())
        
        const response = await fetch(`/api/see-all-bonuses?${params}`)
        return response.json()
    }
    
    const response = await $api.get(`get-see-all-bonus-category${slug ? '/' + slug : ''}/?page=${page}&page_size=${countPageSize}`)
    return response.data
}

export default function SeeAllBonus({ bonusSlug }: { bonusSlug?: string | null }) {
    // // document.title = "All Bonus"

    const [currentPage, setCurrentPage] = useState(1)
    const [allData, setAllData] = useState<SeeAllBonusType[]>([])
    const [isMobile, setIsMobile] = useState(false)
    const { category, isShowPlayButton } = useAdaptiveBehavior()
    
    // Динамічний countPageSize на основі isMobile
    const countPageSize = isMobile ? 10 : 20

    const params = useParams()
    
    // Використовуємо пропс bonusSlug замість прямого отримання з params
    const bonus_slug = bonusSlug || params.bonus_slug

    const [slug, setSlug] = useState<string>(Array.isArray(bonus_slug) ? bonus_slug[0] || '' : bonus_slug || '')

    useEffect(() => {
        setSlug(Array.isArray(bonus_slug) ? bonus_slug[0] || '' : bonus_slug || '')
        setAllData([]) // Reset data when slug changes
        setCurrentPage(1) // Reset pagination
        window.scrollTo(0, 0)
    }, [bonus_slug])

    const { data, isLoading } = useQuery<SeeAllBonusResponse>({
      queryKey: ['get-see-all-bonus-category/', currentPage, slug, countPageSize],
      queryFn: () => getAllBonusFetchData(currentPage, slug, countPageSize),
      placeholderData: keepPreviousData,
      staleTime: 1000 * 60 * 5, // 5 хвилин
    })

    useEffect(() => {
        if (isMobile && !data?.bonuses?.results) {
            setAllData([])
            return
        }
        if (isMobile && currentPage === 1 && data?.bonuses?.results) {
            setAllData(data?.bonuses?.results)
            return
        }
        if (isMobile) {
            setAllData((s) => {
                const newItems = data?.bonuses?.results || []
                const existingIds = new Set(s.map(item => item.bonus_id))
                const uniqueNewItems = newItems.filter(item => !existingIds.has(item.bonus_id))
                const combinedData = [...s, ...uniqueNewItems]
                return combinedData
            })
            return
        }
    }, [data, slug, currentPage, isMobile])

    useEffect(() => {
        // Безпечна ініціалізація для SSR
        const updateMobile = () => setIsMobile(window.innerWidth < 900)
        
        // Встановлюємо початкове значення
        updateMobile()
        
        window.addEventListener('resize', updateMobile)
        return () => window.removeEventListener('resize', updateMobile)
    }, [])

    const displayedData = isMobile ? allData : data?.bonuses?.results

    // Debug: Check for duplicate bonus_ids
    useEffect(() => {
        if (displayedData?.length) {
            const bonusIds = displayedData.map(item => item.bonus_id)
            const duplicates = bonusIds.filter((id, index) => bonusIds.indexOf(id) !== index)
            // if (duplicates.length > 0) {
            //     console.warn('Duplicate bonus_ids found:', duplicates)
            //     console.log('All bonus_ids:', bonusIds)
            // }
        }
    }, [displayedData])

    // Generate unique key for each bonus item
    const generateUniqueKey = (item: SeeAllBonusType, index: number) => {
        // Use bonus_id as primary identifier, fallback to combination if needed
        const primaryId = item.bonus_id || 'no-id'
        const secondaryId = item.bonus_slug || 'no-slug'
        return `bonus-${primaryId}-${secondaryId}-${index}`
    }

    useEffect(() => {
        initializeAdaptiveBehavior()
    }, [isLoading])

    const titlePage = slug ? data?.category_name || category?.find((item) => item?.slug === slug)?.name : 'All Bonuses'

    if (isLoading) return <LogoLoader />

    return (
            <main className="gamble__see-all main-gamble see-all">
                <div className="main-gamble__body">
                    <Categories type_category={DataHomeItemsBlockEnumCategory.bonus_category} />
                    <BreadCrumb
                        path={
                            slug
                                ? [
                                      ...pathBreadCrumb,
                                      {
                                          name: titlePage || 'Categories',
                                          link: `/all-bonuses/${slug}`,
                                      },
                                  ]
                                : pathBreadCrumb
                        }
                    />
                    <section className="see-all__main main-see-all">
                        <div className="main-see-all__container container">
                            <div className="main-see-all__top top">
                                <div className="top__row">
                                    <div className="top__column">
                                        <div className="top__title-block">
                                            <h2 className="top__title">{titlePage}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="main-see-all__row custom-main-see-all__row">
                                {displayedData?.map((item, index) => (
                                    <div 
                                      className="main-see-all__column"
                                      key={generateUniqueKey(item, index)}
                                      >
                                        <div className="slide-slider__item casino-card">
                                            <div className="casino-card__top">
                                                <div
                                                    style={{
                                                        padding: '0 8px 50.432% 8px',
                                                    }}
                                                    className="casino-card__image-block"
                                                >
                                                    <Link href={`/casino/${item.casino_slug}/bonuses/${item.bonus_slug}`} className="casino-card__image see-all-custom__image-custom">
                                                        <LazyCardImg img={item.bonus_image} width="100%" />
                                                    </Link>
                                                    {isShowPlayButton && (
                                                        <a
                                                            href={cloacingLink(item?.casino_name)}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                cloacingFetch(item?.casino_affiliate_link)
                                                                window.open(item?.casino_affiliate_link || item?.url_casino, '_blank', 'noopener,noreferrer')
                                                            }}
                                                            aria-label="Put your description here."
                                                            className="casino-card__bnt"
                                                        >
                                                            Play
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="casino-card__content">
                                                <div className="casino-card__tags tags-casino-card">
                                                    {item.labels
                                                        ?.sort((a, b) => {
                                                            const labelA = typeof a === 'string' ? a : a?.name || ''
                                                            const labelB = typeof b === 'string' ? b : b?.name || ''
                                                            return labelA.localeCompare(labelB)
                                                        })
                                                        ?.map((it, id) => (
                                                            <div 
                                                              className={`tags-casino-card__item ${getTagColorByindex(id)}`}
                                                              key={`${item.bonus_id}-${typeof it === 'string' ? it : it.name}-${id}`}
                                                              >
                                                                <span className="tags-casino-card__item-label">{typeof it === 'string' ? it : it.name}</span>
                                                            </div>
                                                        ))}
                                                </div>
                                                <div className="casino-card__info info-casino-card">
                                                    <div className="info-casino-card__stake">
                                                        <Link href={`/casino/${item?.casino_slug}`} aria-label="Put your description here." className="info-casino-card__stake-link">
                                                            {item?.casino_name}
                                                        </Link>
                                                        <div className="info-casino-card__stake-rating">
                                                            <span className="info-casino-card__stake-rating-icon">
                                                              <Image src="/img/icons/star.svg" width={16} height={16} alt="star" />
                                                            </span>
                                                            <span className="info-casino-card__stake__rating-number">{item.casino_rank}</span>
                                                        </div>
                                                    </div>
                                                    <div className="info-casino-card__likes">
                                                        <span className="info-casino-card__likes-icon">
                                                          <Image src="/img/icons/like.svg" alt="like" width={16} height={16} />
                                                        </span>
                                                        <span className="info-casino-card__likes-number">{sanitizeNumberLike(item?.bonus_likes)}</span>
                                                    </div>
                                                </div>
                                                <Link href={`/casino/${item.casino_slug}/bonuses/${item.bonus_slug}`} className="casino-card__name">
                                                    {item.bonus_name}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {!displayedData?.length && !isLoading ? (
                                <NoResult />
                            ) : (
                                <PaginationPage
                                    countElem={data?.bonuses?.count}
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
                            )}
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

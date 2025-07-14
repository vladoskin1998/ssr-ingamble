'use client'
import { BreadCrumb } from '@/components/breadcrumb/index'
import { Categories } from '@/components/categories/Categories'
import { PaginationPage } from '@/components/pagination/PaginationPage'
// import { Wraper } from '../Wraper'
// import like from '../../assets/img/icons/like.svg'
import Image from 'next/image'
import './style.css'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {  useAdaptiveBehavior } from '../../context/AppContext'
import $api from '@/http'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { LogoLoader } from '@/components/loader/LogoLoader'
import { PAYOUTSPEED, SeeAllCasinosType, SeeAllCasinosCategoryResponse, DataHomeItemsBlockEnumCategory } from '../../types'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'
import { cloacingFetch, cloacingLink, NumberAssociaty, sanitizeNumberLike } from '../../helper'
import { NoResult } from '@/components/no-result'
import initializeAdaptiveBehavior from '@/helper/adaprive-bahavior'
import { useIsTablet } from '@/hooks/useResponsive'
const CheckMoreWhatSuitsYouBest = dynamic(() => import('@/components/categories/CheckMoreWhatSuitsYouBest'))
const SubscribeForm = dynamic(() => import('@/components/subscribe/SubscribeForm'))
const BottomInfo = dynamic(() => import('@/components/footer/BottomInfo'))


const pathBreadCrumb = [
    {
        name: 'Home',
        link: '/    ',
    },
    {
        name: 'All Casinos',
        link: '/all-casinos',
    },
]

const getAllCasinosFetchData = async (page: number, slug: string | null, pageSize: number) => {
    const response = await $api.get(`get-see-all-casinos-category${slug ? '/' + slug : ''}/?page=${page}&page_size=${pageSize}`)
    return response.data
}

export const rankCasinosSeeAll = (r: number) => {
    if (r >= 8) {
        return PAYOUTSPEED.High
    } else if (r >= 5) {
        return PAYOUTSPEED.Medium
    } else {
        return PAYOUTSPEED.Low
    }
}

export const WithdrawalSeeAllCasinos = (n: { daily: number | null; weekly: number | null; monthly: number | null }) => {
    if (n.monthly) {
        return 'Monthly'
    } else if (n.weekly) {
        return 'Weekly'
    } else if (n.daily) {
        return 'Daily'
    }
    return ''
}

// ЗМІНА: Видалено window.innerWidth на рівні модуля для SSR сумісності
// const countPageSize = window.innerWidth < 900 ? 8 : 15

export default function SeeAllCasinos() {
    // document.title = "All Casino"
    const [currentPage, setCurrentPage] = useState(1)
    const [allData, setAllData] = useState<SeeAllCasinosType[]>([])
    
    // ЗМІНА: Використовуємо useIsTablet для SSR сумісності
    const { isMobile } = useIsTablet()
    
    // ЗМІНА: Додаємо динамічний countPageSize на основі isMobile
    const countPageSize = isMobile ? 8 : 15

     const { casino_slug } = useParams()

    const [slug, setSlug] = useState<string>(Array.isArray(casino_slug) ? casino_slug[0] || '' : casino_slug || '')

    useEffect(() => {
        const slugValue = Array.isArray(casino_slug) ? casino_slug[0] || '' : casino_slug || ''
        setSlug(slugValue)
        window.scrollTo(0, 0)
    }, [casino_slug])

    const {  category } = useAdaptiveBehavior()

    const { data, isLoading } = useQuery<SeeAllCasinosCategoryResponse>({
        queryKey: ['get-see-all-loyalties', currentPage, slug, countPageSize],
        queryFn: () => getAllCasinosFetchData(currentPage, slug, countPageSize),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    })
    useEffect(() => {
        if (isMobile && !data?.casino?.results) {
            setAllData([])
            return
        }
        if (isMobile && currentPage === 1 && data?.casino?.results) {
            setAllData(data?.casino?.results)
            return
        }
        if (isMobile) {
            setAllData((s) => {
                const combinedData = [...s, ...(data?.casino?.results || [])]
                return combinedData
            })
            return
        }
    }, [data, slug, currentPage, isMobile])

    useEffect(() => {
        initializeAdaptiveBehavior()
    }, [isLoading])

        const titlePage = slug ? data?.category_name || category?.find((item) => item?.slug === slug)?.name : 'Casino List'
    const displayedData = isMobile ? allData : data?.casino?.results


    console.log(!displayedData?.length && isLoading)
    

    if (isLoading) return <LogoLoader />

    return (
        // <Wraper>
            <main className="gamble__casinos-filtered main-gamble casinos-filtered">
                <div className="main-gamble__body">
                    <Categories type_category={DataHomeItemsBlockEnumCategory.casino_category} />
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
                    <section className="casinos-filtered__main main-loyaltie-programs">
                        <div className="main-loyaltie-programs__container container">
                            <div className="main-loyaltie-programs__top top">
                                <div className="top__row">
                                    <div className="top__column">
                                        <div className="top__title-block">
                                            <h2 className="top__title">{titlePage}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="main-loyaltie-programs__items loyaltie-programs__items">
                                {displayedData?.map((item, index) => (
                                    <div key={`casino-${item.casino_slug}-${item.casino_name}-${index}`} className="loyaltie-programs__item item-loyaltie-programs">
                                        <div className="item-loyaltie-programs__row">
                                            <div className="item-loyaltie-programs__main">
                                                <Link href={`/casino/${item.casino_slug}`} aria-label="Put your description here." className="item-loyaltie-programs__image item-loyaltie-programs__image-custom">
                                                    <LazyCardImg img={item?.casino_image || ''} height="100%" width="100%" />
                                                </Link>
                                            </div>
                                            <div className="item-loyaltie-programs__content content-item-loyaltie-programs">
                                                <div className="content-item-loyaltie-programs__row">
                                                    <div className="content-item-loyaltie-programs__column content-item-loyaltie-programs__column_main">
                                                        <div className="content-item-loyaltie-programs__top top-content-item-loyaltie-programs">
                                                            <h2 className="top-content-item-loyaltie-programs__name">{item.casino_name}</h2>
                                                            <div className="info-casino-card__likes">
                                                                <span className="info-casino-card__likes-icon">
                                                                  <Image 
                                                                      src="/img/icons/like.svg" 
                                                                      alt="like" 
                                                                      width={12} 
                                                                      height={12}
                                                                  />
                                                                </span>
                                                                <span className="info-casino-card__likes-number">{sanitizeNumberLike(item?.likes)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="content-item-loyaltie-programs__info info-content-item-loyaltie-programs">
                                                            <div className="info-content-item-loyaltie-programs__row">
                                                                <div className="info-content-item-loyaltie-programs__column">
                                                                    <div className="info-content-item-loyaltie-programs__item item-info-content-item-loyaltie-programs item-info-content-item-loyaltie-programs_index-high">
                                                                        <div className="item-info-content-item-loyaltie-programs__label">Safety Index</div>
                                                                        <div className="item-info-content-item-loyaltie-programs__value">
                                                                            {item.casino_rank}
                                                                            <span className="item-info-content-item-loyaltie-programs__value-index">{rankCasinosSeeAll(Number(item.casino_rank))}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="info-content-item-loyaltie-programs__item item-info-content-item-loyaltie-programs">
                                                                        <div className="item-info-content-item-loyaltie-programs__label">Min Dep</div>
                                                                        <div className="item-info-content-item-loyaltie-programs__value">{`${item.min_dep?.[0]?.value} ${
                                                                            typeof window !== 'undefined' && window.location.origin.includes('ingamble.com') ? '$' : '$ USDT'
                                                                        }`}</div>
                                                                    </div>
                                                                    <div className="info-content-item-loyaltie-programs__item item-info-content-item-loyaltie-programs">
                                                                        <div className="item-info-content-item-loyaltie-programs__label">License</div>
                                                                        <div className="item-info-content-item-loyaltie-programs__value">
                                                                            {item?.licenses?.[0]?.name}
                                                                            {item?.licenses?.[0]?.image && (
                                                                                <span className="item-info-content-item-loyaltie-programs__value-flag">
                                                                                    <Image
                                                                                        src={item?.licenses?.[0]?.image || ''}
                                                                                        alt={item?.licenses?.[0]?.country_code || 'license flag'}
                                                                                        width={20}
                                                                                        height={20}
                                                                                        style={{ objectFit: 'contain' }}
                                                                                    />
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="info-content-item-loyaltie-programs__column">
                                                                    <div className="info-content-item-loyaltie-programs__item item-info-content-item-loyaltie-programs">
                                                                        <div className="item-info-content-item-loyaltie-programs__label">Withdrawal Limit:</div>
                                                                        <div className="item-info-content-item-loyaltie-programs__value">
                                                                            {`${NumberAssociaty(item?.withdrawal_limit?.monthly || item?.withdrawal_limit?.weekly || item?.withdrawal_limit?.daily || 'Unlimited')} ${WithdrawalSeeAllCasinos(
                                                                                item?.withdrawal_limit,
                                                                            )}`}
                                                                        </div>
                                                                    </div>
                                                                    <div className="info-content-item-loyaltie-programs__item item-info-content-item-loyaltie-programs">
                                                                        <div className="item-info-content-item-loyaltie-programs__label">Payout Speed</div>
                                                                        <div className={`item-info-content-item-loyaltie-programs__value item-info-content-item-loyaltie-programs__value_${item.payout_speed.toLocaleLowerCase()}`}>
                                                                            {item.payout_speed}
                                                                        </div>
                                                                    </div>
                                                                    <div className="info-content-item-loyaltie-programs__item item-info-content-item-loyaltie-programs">
                                                                        <div className="item-info-content-item-loyaltie-programs__label">VPN Allowed</div>
                                                                        <div className={`item-info-content-item-loyaltie-programs__value item-info-content-item-loyaltie-programs__value_${item.vpn_usage ? 'yes' : 'no'}`}>
                                                                            {item.vpn_usage ? 'Yes' : 'No'}
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
                                                                {item?.casino_slug && (
                                                                    <Link href={`/casino/${item.casino_slug}`} aria-label="Put your description here." className="bottom-content-item-loyaltie-programs__btn-more">
                                                                        Read More
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content-item-loyaltie-programs__column content-item-loyaltie-programs__column_features">
                                                        <div className="content-item-loyaltie-programs__features features-essential-programs-gamble">
                                                            {item?.loyalty_program?.loyalty_keypoint?.slice(0, 3).map((it, key) => (
                                                                <div key={`keypoint-${item.casino_slug}-${key}-${it.text_1}`} className="features-essential-programs-gamble__column">
                                                                    <div className="features-essential-programs-gamble__item">
                                                                        <div className="features-essential-programs-gamble__icon">
                                                                            <LazyCardImg img={it?.image || ''} size="medium" width="100%" />
                                                                        </div>
                                                                        <div className="features-essential-programs-gamble__info">
                                                                            <div className="features-essential-programs-gamble__name">{it.text_1}</div>
                                                                            <div className="features-essential-programs-gamble__text">{it.text_2}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {false ? (
                                <NoResult />
                            ) : (
                                <PaginationPage
                                    countElem={data?.casino?.count}
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
                </div>
            </main>
        // </Wraper>
    )
}

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
import { LogoLoader } from '@/components/loader/LogoLoader'

import { useEffect, useState } from 'react'
import { cloacingFetch, cloacingLink, filterEmptyValues, LOYALTIECATEGORYIES } from '@/helper'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { initialLoyaltiesFilters, useFilterContext } from '@/context/FilterContext'
import initializeAdaptiveBehavior from '@/helper/adaprive-bahavior'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const CheckMoreWhatSuitsYouBest = dynamic(() => import('@/components/categories/CheckMoreWhatSuitsYouBest'))
const SubscribeForm = dynamic(() => import('@/components/subscribe/SubscribeForm'))
const BottomInfo = dynamic(() => import('@/components/footer/BottomInfo'))

const countPageSize = window.innerWidth < 900 ? 8 : 15

const pathBreadCrumb = [
    {
        name: 'Home',
        link: '/    ',
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

const getFilteringLoyaltiesList = async (payload: LoyaltiesFilterBodyType, page: number) => {
    const body = filterEmptyValues(payload)
    const response = await $api.post(`filter/loyalty/?page=${page}&page_size=${countPageSize}`, body)
    return response.data
}

export default function SeeAllEssentialsLoyalty() {
    // document.title = "All Essentials Loyalty"

    const { loyaltiesFilters, setLoyaltiesFilters } = useFilterContext()
    const { loyaltie_slug } = useParams()

    const [currentPage, setCurrentPage] = useState(1)
    const [allData, setAllData] = useState<SeeAllEssentialLoyaltyCasino[]>([])
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900)

    const { data, isLoading } = useQuery({
      queryKey: ['filter/loyalty', loyaltiesFilters, currentPage],
      queryFn: () => getFilteringLoyaltiesList(loyaltiesFilters, currentPage),
      placeholderData: keepPreviousData, // заміна keepPreviousData: true
      staleTime: 1000 * 60 * 5,
    })

    useEffect(() => {
        if (loyaltie_slug) {
            const { key, value } = NAMETITLECATEGORYSLUG[loyaltie_slug]

            setLoyaltiesFilters({
                ...initialLoyaltiesFilters,
                [key]: value,
            })
        }

        window.scrollTo(0, 0)

        return () => {
            setLoyaltiesFilters(initialLoyaltiesFilters)
        }
    }, [loyaltie_slug])

    useEffect(() => {
        if (data?.results) {
            setAllData((s) => [...s, ...data?.results])
        }
    }, [data])

    useEffect(() => {
        if (isMobile && !data?.results) {
            setAllData([])
            return
        }
        if (isMobile && currentPage === 1 && data?.results) {
            setAllData(data?.results)
            return
        }
        if (isMobile) {
            setAllData((s) => {
                const combinedData = [...s, ...(data?.results || [])]
                return combinedData
            })
            return
        }
    }, [data])

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 900)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        initializeAdaptiveBehavior()
    }, [isLoading])

    const displayedData = isMobile ? allData : data?.results

    if (isLoading) return <LogoLoader />

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
                                {displayedData?.map((item: any) => (
                                    <div 
                                      className="loyaltie-programs__item item-loyaltie-programs"
                                      key={item.casino_slug}
                                    >
                                        <div className="item-loyaltie-programs__row">
                                            <div className="item-loyaltie-programs__main">
                                                <Link href={`/casino/${item.casino_slug}`} className="item-loyaltie-programs__image loyalty-img-custom">
                                                    <LazyCardImg img={item?.casino_image || ''} width="100%" />
                                                </Link>
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
                                                    {item.loyalty_program.loyalty_keypoint.map((it: any) => (
                                                        <div 
                                                          className="features-essential-programs-gamble__column"
                                                          key={it.text_1}
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
                                                                                key={level}
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
                                                        <Link href={`/casino/${item.loyalty_program.loyalty_slug}/loyalty`} aria-label="Put your description here." className="bottom-content-item-loyaltie-programs__btn-more">
                                                            Read More
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                </div>
            </main>
    )
}
'use client'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { Categories } from '../../components/categories/Categories'
import { FilterHeaderList, makeListFilterHeader } from '../../components/filter-components/FilterHeaderList'
import { initialBonusFilters, initialCasinoFilters, useFilterContext } from '../../context/FilterContext'
import $api from '../../http'
import { BonusFilterBodyType, CasinoFilterBodyType, FilterBonusPostResponse, SeeAllBonus } from '../../types'
// import { Wraper } from '../Wraper'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'
// import like from '/img/icons/like.svg'
import dynamic from 'next/dynamic'
import { memo, useEffect, useState } from 'react'
import { useAdaptiveBehavior } from '../../context/AppContext'
// import star from '/img/icons/star.svg'
import { cloacingFetch, cloacingLink, filterEmptyValues, getTagColorByindex, getTitleFilterCategories, sanitizeNumberLike } from '../../helper'
import { PaginationPage } from '../../components/pagination/PaginationPage'
import { debounce } from 'lodash'
import { LogoLoader } from '../../components/loader/LogoLoader'
// import searchImg from '/img/icons/search-filter.svg'
import { v4 as uuidv4 } from 'uuid'
// 1. Заміна роутінгу з react-router-dom на Next.js
import Link from 'next/link' // замість { Link } з 'react-router-dom'
// 2. Заміна <img> на <Image> з next/image для оптимізації зображень
import Image from 'next/image'
import { NoResult } from '@/components/no-result'
import { BreadCrumb } from '@/components/breadcrumb/index'
import initializeAdaptiveBehavior from '../../helper/adaprive-bahavior'
// ЗМІНА 9: Додано useParams для client component
// В Next.js App Router для client components використовується useParams hook
import { useParams } from 'next/navigation'
const BottomInfo = dynamic(() => import('../../components/footer/BottomInfo'))
const CheckMoreWhatSuitsYouBest = dynamic(() => import('../../components/categories/CheckMoreWhatSuitsYouBest'))
const SubscribeForm = dynamic(() => import('../../components/subscribe/SubscribeForm'))

// ЗМІНА 1: Видалено window.innerWidth на рівні модуля для SSR сумісності
// Старий код: const countPageSize = window.innerWidth < 900 ? 10 : 20
// Причина: window недоступне на сервері під час SSR

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debouncedFetchFilter = debounce((filters: BonusFilterBodyType, fetchFunction: () => Promise<any>) => fetchFunction(), 500)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debouncedFetchPagination = debounce((filters: BonusFilterBodyType, fetchFunction: () => Promise<any>, setLoading: (loading: boolean) => void, isMobile: boolean) => {
    if (!isMobile) {
        setLoading(true)
    }

    fetchFunction().finally(() => setLoading(false))
})

// ЗМІНА 2: Оновлена функція getFilteringBonusList для прийому pageSize як параметра
// Додано параметр pageSize замість використання глобальної змінної
const getFilteringBonusList = async (payload: BonusFilterBodyType, page: number, pageSize: number) => {
    const body = filterEmptyValues(payload)
    const response = await $api.post(`filter/bonus/?page=${page}&page_size=${pageSize}`, body)
    return response.data
}

// ЗМІНА 7: Виправлення для Next.js App Router client component
// Використовуємо useParams hook замість props для client components
export default function FilterBonus() {
    // // document.title = "Filter Bonus"
    
    // ЗМІНА 9: Отримання параметрів через useParams для client component
    const params = useParams()
    const bonus_slug = params?.bonus_slug as string | undefined

    const { isShowPlayButton } = useAdaptiveBehavior()

    const { bonusFilters, setBonusFilters } = useFilterContext()

    const [currentPage, setCurrentPage] = useState(1)
    const [allData, setAllData] = useState<SeeAllBonus[]>([])
    
    // ЗМІНА 3: Безпечна ініціалізація стану для SSR
    // Старий код: const [isMobile, setIsMobile] = useState(window.innerWidth < 900)
    // Причина: уникнення hydration mismatch між сервером і клієнтом
    const [isMobile, setIsMobile] = useState(false)
    const [countPageSize, setCountPageSize] = useState(20) // default для сервера
    
    // ЗМІНА 4: Додано useEffect для ініціалізації window-залежних значень
    // Виконується тільки на клієнті після монтування компонента
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mobile = window.innerWidth < 900
            setIsMobile(mobile)
            setCountPageSize(mobile ? 10 : 20)
        }
    }, [])

    const [isDebouncedLoading, setIsDebouncedLoading] = useState(true)

    // ЗМІНА 5: Оновлений useQuery з передачею countPageSize як параметра
    // Додано countPageSize в dependencies array для правильного re-fetch
    const { data, isLoading, refetch } = useQuery<FilterBonusPostResponse>({
      queryKey: ['filter/bonus', bonusFilters, currentPage, countPageSize],
      queryFn: () => getFilteringBonusList(bonusFilters, currentPage, countPageSize),
      placeholderData: keepPreviousData,  // ← змінено з keepPreviousData: true
      enabled: false,
  })

    // ЗМІНА 8: Оновлена логіка для отримання slug з useParams
    // Використовуємо bonus_slug безпосередньо з useParams замість Promise resolution
    const [slug, setSlug] = useState<string>(bonus_slug || '')

    useEffect(() => {
        // Оновлюємо slug коли параметри змінюються
        setSlug(bonus_slug || '')
    }, [bonus_slug])

    useEffect(() => {
        debouncedFetchPagination(bonusFilters, refetch, setIsDebouncedLoading, isMobile)
    }, [currentPage, refetch, setCurrentPage, bonusFilters, isMobile])

    useEffect(() => {
        setCurrentPage(1)
        debouncedFetchFilter(bonusFilters, refetch)
        if (!isMobile) {
            window.scrollTo({
                behavior: 'smooth',
                top: 0,
            })
        } else {
            setAllData([])
        }
    }, [bonusFilters, refetch, isMobile])

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
    }, [data, isMobile, currentPage])

    // ЗМІНА 6: Оновлений useEffect для resize handler
    // Додано перевірку existence window і правильну ініціалізацію
    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                const mobile = window.innerWidth < 900
                setIsMobile(mobile)
                setCountPageSize(mobile ? 10 : 20)
            }
        }
        
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])

    const displayedData = isMobile ? allData : data?.results

    const clearAll = () => {
        setBonusFilters(initialBonusFilters)
    }

    const handlerClearOne = (v: string) => {
        const findedValueField = initialCasinoFilters[v as keyof CasinoFilterBodyType]
        setBonusFilters((s) => ({
            ...s,
            [v as keyof CasinoFilterBodyType]: findedValueField,
        }))
    }

    useEffect(() => {
        initializeAdaptiveBehavior()
    }, [isLoading])

    const title = getTitleFilterCategories({ slug, item: makeListFilterHeader(bonusFilters) })
    if (isDebouncedLoading) return <LogoLoader />

    return (
        // <Wraper>
            <main className="gamble__casinos-filtered main-gamble casinos-filtered">
                <div className="main-gamble__body">
                    <Categories />
                    <BreadCrumb
                        path={[
                            {
                                name: 'Home',
                                link: '/',
                            },
                            {
                                name: 'Bonuses Filters',
                                link: '#',
                            },
                        ]}
                    />
                    <FilterHeaderList initList={bonusFilters} clearAll={clearAll} clearOne={(v) => handlerClearOne(v)} />

                    <section className="see-all__main main-see-all">
                        <div className="main-see-all__container container">
                            <div className="results-filter-scenarios__top top">
                                <div className="top__title-block">
                                <span className="top__title-icon">
                                  <Image 
                                      src="/img/icons/search-filter.svg" 
                                      alt="search" 
                                      width={18} 
                                      height={18} 
                                  />
                                </span>
                                    <h2 className="top__title">{`${title || 'Results'}`}</h2>
                                </div>
                            </div>
                            <ListDisplayData displayedData={displayedData} isShowPlayButton={isShowPlayButton} />

                            {!displayedData?.length && !isLoading ? (
                                <NoResult />
                            ) : (
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

const ListDisplayData = memo(({ displayedData, isShowPlayButton }: { displayedData: SeeAllBonus[] | undefined; isShowPlayButton: boolean }) => {
    return (
        <div className="main-see-all__row custom-main-see-all__row">
            {displayedData?.map((item) => (
                <div 
                  key={item.bonus_slug || item.casino_slug || uuidv4()}
                  className="main-see-all__column">
                    <div className="slide-slider__item casino-card">
                        <div className="casino-card__top">
                            <div className="casino-card__image-block" style={{ padding: '0 8px 50.432% 8px' }}>
                                <Link rel="nofollow noopener" href={`/casino/${item.casino_slug}/bonuses/${item.bonus_slug}`} aria-label="Put your description here." className="casino-card__image see-all-custom__image-custom">
                                    <LazyCardImg img={item?.bonus_image} height="100%" width="100%" />
                                </Link>
                                {isShowPlayButton && (
                                    <a
                                        rel="nofollow noopener"
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
                                {item?.labels
                                    ?.sort((a, b) => {
                                        const labelA = typeof a === 'string' ? a : a?.name || ''
                                        const labelB = typeof b === 'string' ? b : b?.name || ''
                                        return labelA.localeCompare(labelB)
                                    })
                                    .map((it, id) => (
                                        <div key={id} className={`tags-casino-card__item ${getTagColorByindex(id)}`}>
                                            <span className="tags-casino-card__item-label">{typeof it === 'string' ? it : it?.name}</span>
                                        </div>
                                    ))}
                            </div>
                            <div className="casino-card__info info-casino-card">
                                <div className="info-casino-card__stake">
                                    <Link rel="nofollow noopener" href={`/casino/${item.casino_slug}`} aria-label="Put your description here." className="info-casino-card__stake-link">
                                        {item?.casino_name}
                                    </Link>
                                    <div className="info-casino-card__stake-rating">
                                    <span className="info-casino-card__stake-rating-icon">
                                      <Image 
                                          src="/img/icons/star.svg" 
                                          alt="star" 
                                          width={14} 
                                          height={14}
                                      />
                                    </span>
                                        <span className="info-casino-card__stake__rating-number">{item?.casino_rank}</span>
                                    </div>
                                </div>
                                <div className="info-casino-card__likes">
                                <span className="info-casino-card__likes-icon">
                                  <Image 
                                      src="/img/icons/like.svg" 
                                      alt="like" 
                                      width={12} 
                                      height={12}
                                      className="svg-icon"
                                  />
                                </span>
                                    <span className="info-casino-card__likes-number">{sanitizeNumberLike(item?.bonus_likes)}</span>
                                </div>
                            </div>
                            <Link rel="nofollow noopener" href={`/casino/${item.casino_slug}/bonuses/${item.bonus_slug}`} aria-label="Put your description here." className="casino-card__name">
                                {item?.bonus_name}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
})

ListDisplayData.displayName = 'ListDisplayData'
'use client'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { Categories } from '@/components/categories/Categories'
import { FilterHeaderList, makeListFilterHeader } from '@/components/filter-components/FilterHeaderList'
import { initialCasinoFilters, useFilterContext } from '@/context/FilterContext'
import { useLoading } from '@/context/LoadingContext'
import $api from '../../../http'
import { CasinoFilterBodyType, FilterCasinoPostResponse, SeeAllCasinosType } from '../../../types'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'
import { memo, useEffect, useState } from 'react'
import { useAdaptiveBehavior } from '@/context/AppContext'
import { useIsTablet } from '@/hooks/useResponsive'
import { rankCasinosSeeAll, WithdrawalSeeAllCasinos } from '@/pages-component/all-casinos-page'
import { cloacingFetch, cloacingLink, filterEmptyValues, getTitleFilterCategories, NumberAssociaty, sanitizeNumberLike, sliceString } from '../../../helper'
import { PaginationPage } from '@/components/pagination/PaginationPage'
import { debounce } from 'lodash'
// import searchImg from '../../assets/img/icons/search-filter.svg'
import '@/pages-component/all-casinos-page/style.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { NoResult } from '@/components/no-result'
import { BreadCrumb } from '@/components/breadcrumb/index'
import initializeAdaptiveBehavior from '../../../helper/adaprive-bahavior'

const BottomInfo = dynamic(() => import('../../../components/footer/BottomInfo'), {
    loading: () => null,
})
const CheckMoreWhatSuitsYouBest = dynamic(() => import('../../../components/categories/CheckMoreWhatSuitsYouBest'), {
    loading: () => null,
})
const SubscribeForm = dynamic(() => import('../../../components/subscribe/SubscribeForm'), {
    loading: () => null,
})
const Footer = dynamic(() => import('../../../components/footer'), {
    loading: () => null,
})

// ЗМІНА: Видалено window.innerWidth на рівні модуля для SSR сумісності
// const countPageSize = window.innerWidth < 900 ? 8 : 15

interface License {
    id?: number
    name: string
    image: string | null
    country_code?: string | null
}

interface LicenseElemProps {
    filtersDataLicenses?: License[]
    casinoFiltersLicenses?: number[]
    itemLicenses?: License[]
}

const LicenseElem: React.FC<LicenseElemProps> = ({ filtersDataLicenses, casinoFiltersLicenses, itemLicenses }) => {
    const [selectedLicense, setSelectedLicense] = useState<License | undefined>(undefined)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const newSelectedLicense = filtersDataLicenses?.find((license) => license?.id === casinoFiltersLicenses?.[0]) || itemLicenses?.[0]
            setSelectedLicense(newSelectedLicense)
        }, 700)

        return () => clearTimeout(timeoutId)
    }, [filtersDataLicenses, casinoFiltersLicenses, itemLicenses])

    return (
        <div className="item-info-content-item-loyaltie-programs__value">
            <>
                {sliceString(selectedLicense?.name, 15)}
                {selectedLicense?.image && (
                    <span className="item-info-content-item-loyaltie-programs__value-flag">
                        <Image src={selectedLicense.image || ''} alt={selectedLicense.name || ''} width={20} height={20} />
                    </span>
                )}
            </>
        </div>
    )
}

const debouncedFetchFilter = debounce((filters, fetchFunction) => fetchFunction(filters), 500)

const debouncedFetchPagination = debounce((filters, fetchFunction, setLoading) => {
    setLoading(true)

    fetchFunction(filters).finally(() => setLoading(false))
})

const getFilteringCasinoList = async (payload: CasinoFilterBodyType, page: number, pageSize: number = 15) => {
    const body = filterEmptyValues(payload)
    const response = await $api.post(`filter/casinos/?page=${page}&page_size=${pageSize}`, body)
    return response.data
}


export default function FilterCasino() {
   

    const { isSidebarActive } = useAdaptiveBehavior()
    const { data: filtersData, casinoFilters, setCasinoFilters } = useFilterContext()
    const { setContentLoaded } = useLoading()

    const [currentPage, setCurrentPage] = useState(1)
    const [allData, setAllData] = useState<SeeAllCasinosType[]>([])
    
    // ЗМІНА: Використовуємо безпечний hook замість прямого window доступу
    const { isMobile } = useIsTablet(false)
    const [countPageSize, setCountPageSize] = useState(15) // default для сервера
    
    // ЗМІНА: Ініціалізуємо countPageSize на основі isMobile
    useEffect(() => {
        setCountPageSize(isMobile ? 8 : 15)
    }, [isMobile])

    const { data, isLoading, refetch } = useQuery<FilterCasinoPostResponse>({
      queryKey: ['filter/casinos', casinoFilters, currentPage, countPageSize], 
      queryFn: () => getFilteringCasinoList(casinoFilters, currentPage, countPageSize),
      placeholderData: keepPreviousData,  // ← змінено з keepPreviousData: true
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    })

    const { casino_slug } = useParams()
      
   
    // const [slug, setSlug] = useState<string>('')

    // useEffect(() => {
    //     setSlug(casino_slug )
    // }, [casino_slug])

    useEffect(() => {
        debouncedFetchPagination(casinoFilters, refetch, () => {})
    }, [currentPage, refetch, casinoFilters, isMobile])

    useEffect(() => {
        setCurrentPage(1)
        debouncedFetchFilter(casinoFilters, refetch)
        
        // Очищаємо дані при зміні фільтрів
        setAllData([])
        
        if (!isMobile && typeof window !== 'undefined') {
            window.scrollTo({
                behavior: 'smooth',
                top: 0,
            })
        }
    }, [casinoFilters, refetch, isMobile])

    useEffect(() => {
        if (!data?.results) return

        setAllData((prevData) => {
            if (isMobile) {
                // В мобільному режимі додаємо нові результати до існуючих
                // Перевіряємо, чи вже існують ці дані, щоб уникнути дублікатів
                const newResults = data.results.filter(newItem => 
                    !prevData.some(existingItem => existingItem.casino_slug === newItem.casino_slug)
                )
                return [...prevData, ...newResults]
            } else {
                // В desktop режимі повністю заміняємо дані
                return data.results
            }
        })

        // Повідомляємо що контент завантажено
        setContentLoaded()
    }, [data, isMobile, setContentLoaded])

    useEffect(() => {
        initializeAdaptiveBehavior()
    }, [data, isSidebarActive])

    // ЗМІНА: Видалено resize handler, оскільки використовуємо useIsTablet hook

    const displayedData = isMobile ? allData : data?.results

    const clearAll = () => {
        setCasinoFilters(initialCasinoFilters)
    }

    const handlerClearOne = (v: string) => {
        if (v.includes('withdrawal_limits')) {
            const field = v.replace('withdrawal_limits.', '')
            setCasinoFilters((s) => ({
                ...s,
                withdrawal_limits: {
                    ...s.withdrawal_limits,
                    [field]: field === 'unlimited' ? undefined : null,
                },
            }))
        }

        const findedValueField = initialCasinoFilters[v as keyof CasinoFilterBodyType]
        setCasinoFilters((s) => ({
            ...s,
            [v as keyof CasinoFilterBodyType]: findedValueField,
        }))
    }

    const title = getTitleFilterCategories({ 
        slug: Array.isArray(casino_slug) ? casino_slug[0] : casino_slug, 
        item: makeListFilterHeader(casinoFilters) 
    })

    return (
        // <Wraper>
        <>
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
                                name: 'Casinos Filters',
                                link: '#',
                            },
                        ]}
                    />
                    <FilterHeaderList initList={casinoFilters} clearAll={clearAll} clearOne={(v) => handlerClearOne(v)} />
                    <section className="casinos-filtered__main main-loyaltie-programs">
                        <div className="main-loyaltie-programs__container container">
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
                                    <h2 className="top__title">{`${title || 'Results'} `}</h2>
                                </div>
                            </div>

                            <ListDisplayData displayedData={displayedData} filtersDataLicenses={filtersData?.casino?.licenses} casinoFiltersLicenses={casinoFilters?.licenses} />

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
                    <Footer />
                </div>
            </main>
        </>
    )
}

const ListDisplayData = memo(
    ({
        displayedData,
        filtersDataLicenses,
        casinoFiltersLicenses,
    }: {
        filtersDataLicenses: License[] | undefined
        casinoFiltersLicenses: number[] | undefined

        displayedData: SeeAllCasinosType[] | undefined
    }) => {
        return (
            <div className="main-loyaltie-programs__items loyaltie-programs__items">
                {displayedData?.map((item, index) => (
                    <div 
                      className="loyaltie-programs__item item-loyaltie-programs"
                      key={`filter-casino-${item.casino_slug || item.casino_name}-${index}`}>
                        <div className="item-loyaltie-programs__row">
                            <div className="item-loyaltie-programs__main">
                                <Link rel="nofollow noopener" aria-label="Put your description here." className="item-loyaltie-programs__image item-loyaltie-programs__image-custom " href={`/casino/${item.casino_slug}`}>
                                    <LazyCardImg img={item?.casino_image || ''} height="100%" width="100%" />
                                </Link>
                            </div>
                            <div className="item-loyaltie-programs__content content-item-loyaltie-programs">
                                <div className="content-item-loyaltie-programs__row">
                                    <div className="content-item-loyaltie-programs__column content-item-loyaltie-programs__column_main">
                                        <div className="content-item-loyaltie-programs__top top-content-item-loyaltie-programs">
                                            <h2 className="top-content-item-loyaltie-programs__name">{item?.casino_name}</h2>
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
                                                            {item?.casino_rank}
                                                            <span className="item-info-content-item-loyaltie-programs__value-index">{rankCasinosSeeAll(Number(item?.casino_rank))}</span>
                                                        </div>
                                                    </div>
                                                    <div className="info-content-item-loyaltie-programs__item item-info-content-item-loyaltie-programs">
                                                        <div className="item-info-content-item-loyaltie-programs__label">Min Dep</div>
                                                        <div className="item-info-content-item-loyaltie-programs__value">
                                                            {item.min_dep?.[0]?.value ? `${item.min_dep?.[0]?.value} ${typeof window !== 'undefined' && window.location.origin.includes('ingamble.com') ? '$' : '$ USDT'}` : 'Unlimited'}
                                                        </div>
                                                    </div>
                                                    <div className="info-content-item-loyaltie-programs__item item-info-content-item-loyaltie-programs">
                                                        <div className="item-info-content-item-loyaltie-programs__label">License</div>
                                                        <LicenseElem filtersDataLicenses={filtersDataLicenses} casinoFiltersLicenses={casinoFiltersLicenses} itemLicenses={item.licenses} />
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
                                                        <div className={`item-info-content-item-loyaltie-programs__value item-info-content-item-loyaltie-programs__value_${item.payout_speed.toLocaleLowerCase()}`}>{item?.payout_speed}</div>
                                                    </div>
                                                    <div className="info-content-item-loyaltie-programs__item item-info-content-item-loyaltie-programs">
                                                        <div className="item-info-content-item-loyaltie-programs__label">VPN Allowed</div>
                                                        <div className={`item-info-content-item-loyaltie-programs__value item-info-content-item-loyaltie-programs__value_${item?.vpn_usage ? 'yes' : 'no'}`}>
                                                            {item?.vpn_usage ? 'Yes' : 'No'}
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
                                                    aria-label="Put your description here."
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
                                            {item?.loyalty_program?.loyalty_keypoint?.slice(0, 3).map((it, idx) => (
                                                <div className="features-essential-programs-gamble__column" key={`loyalty-keypoint-${item.casino_slug}-${idx}-${it?.text_1 || idx}`}>
                                                    <div className="features-essential-programs-gamble__item">
                                                        <div className="features-essential-programs-gamble__icon">
                                                            <LazyCardImg img={it?.image || ''} size="medium" width="100%" />
                                                        </div>
                                                        <div className="features-essential-programs-gamble__info">
                                                            <div className="features-essential-programs-gamble__name">{it?.text_1}</div>
                                                            <div className="features-essential-programs-gamble__text">{it?.text_2}</div>
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
        )
    },
)

ListDisplayData.displayName = 'ListDisplayData'
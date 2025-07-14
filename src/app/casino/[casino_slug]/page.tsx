'use client'
// import { Wraper } from '../Wraper'
// import likeIcon from '../../assets/img/icons/like.svg'
import { Categories } from '@/components/categories/Categories'
import { BreadCrumb } from '@/components/breadcrumb/index'
import { CasinoBonuses } from '@/components/simple-casino/CasinoBonuses'
// import { SpecialPromo } from "./SpecialPromo"
import { TabMain } from '@/components/simple-casino/TabMain'
import { HighRankedCasinos } from '@/components/simple-casino/HighRankedCasinos'
import { Harry } from '@/components/simple-casino/Harry'
import { PopupReadMore } from '@/components/simple-casino/PopupReadMore'
import { lazy, useEffect, useState } from 'react'
import $api from '@/http'
import Link from 'next/link' 
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { LogoLoader } from '@/components/loader/LogoLoader'
import { GeoLocationAllowdType } from '@/types'

import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'
import { useFilterContext } from '@/context/FilterContext'
import { cloacingFetch, cloacingLink, sanitizeNumberLike } from '@/helper'

import initializeAdaptiveBehavior from '@/helper/adaprive-bahavior'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
const Footer = lazy(() => import('@/components/footer'))
const CheckMoreWhatSuitsYouBest = lazy(() => import('@/components/categories/CheckMoreWhatSuitsYouBest'))
const SubscribeForm = lazy(() => import('@/components/subscribe/SubscribeForm'))


const SafetyIndexRatingLevel = (n: number) => {
    if (n < 3) return 'low'
    else if (n >= 3 && n < 7) return 'medium'
    else return 'high'
}

const getCurrentCasinosFetchData = async (slug: string) => {
    const response = await $api.get(`get-data-casino/${slug}/`)

    const headers = response.headers

    return { dataCurrentCasinos: response.data, headers }
}

export default function SimpleCasinos() {
    // document.title = "Review"


    const [openModal, setOpenModal] = useState(false)
    const { casino_slug } = useParams()

    // Convert params to string since Next.js params can be string | string[]
    const slugParam = Array.isArray(casino_slug) ? casino_slug[0] : casino_slug
    const [slug, setSlug] = useState<string>(slugParam || '')

    const { data, isLoading } = useQuery({
        queryKey: ['get-data-casino', slug],
        queryFn: () => getCurrentCasinosFetchData(slug),
        staleTime: Infinity,
        enabled: !!slug,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    useEffect(() => {
        const currentSlug = Array.isArray(casino_slug) ? casino_slug[0] : casino_slug
        if (currentSlug && currentSlug !== slug) {
            setSlug(currentSlug)
            window.scrollTo(0, 0)
        }
    }, [casino_slug, slug])

    const { data: Country, setCasinoFilters } = useFilterContext()

    const [geoLocation, setGeoLocation] = useState<GeoLocationAllowdType>({
        countryCode: '',
        countryName: '',
        isAllowed: true,
        isLoadedGeo: false,
        countryImg: undefined,
        idCountry: null,
    })
     useEffect(() => {
         initializeAdaptiveBehavior()
     }, [geoLocation])


    useEffect(() => {
        if (data?.headers) {
            // Axios нормалізує заголовки до lowercase, тому треба використовувати правильні імена
            const countryCode = data?.headers?.['cf-ipcountry-code']
            const countryName = data?.headers?.['cf-ipcountry']

            const countryImg = Country?.general?.countries?.find((it) => {
                return it.code === countryCode || it.name.toLocaleLowerCase() === countryName?.toLocaleLowerCase()
            })?.flag_image

            const idCountry = data.dataCurrentCasinos?.blocked_countries?.find((item: any) => item?.code?.toLocaleLowerCase() === countryCode?.toLocaleLowerCase())?.id

            setGeoLocation({
                countryCode: countryCode || '',
                countryName: countryName || '',
                isAllowed: !idCountry,
                isLoadedGeo: true,
                countryImg,
                idCountry,
            })
        }
    }, [data, Country])

    const handlerOpen = (s: boolean) => {
        setOpenModal(s)
    }

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [openModal])

 
    if (isLoading || !geoLocation.isLoadedGeo) return <LogoLoader />
 
    return (
        <>
            <PopupReadMore openModal={openModal} handlerOpen={handlerOpen} data={data?.dataCurrentCasinos} />

            {/* <Wraper> */}
                <main className="gamble__review main-gamble review">
                    <div className="main-gamble__body">
                        <Categories />
                        <BreadCrumb
                            path={[
                                {
                                    name: 'Home',
                                    link: '/    ',
                                },
                                {
                                    name: 'Casino',
                                    link: '/all-casinos',
                                },
                                {
                                    name: data?.dataCurrentCasinos?.name || 'Casino Name',
                                    link: `/casino/${data?.dataCurrentCasinos?.casino_slug}`,
                                },
                            ]}
                        />
                        <section className={`review__casino-info casino-info   ${!geoLocation?.isAllowed && 'casino-info_not-available'} `}>
                            <div className="casino-info__container container">
                                <div className="casino-info__body">
                                    <div className="casino-info__row">
                                        <div className="casino-info__main main-casino-info ">
                                            <div className="">
                                                <div className="main-casino-info__image ibg--custom">
                                                    <LazyCardImg img={data?.dataCurrentCasinos?.image || ''} height="100%" width="100%" imgLoading={'eager'} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="casino-info__content content-casino-info">
                                            <div className="content-casino-info__main content-casino-info__main-adaptiv">
                                                <div className="info-casino-card__likes name-main-casino-info__likes" data-da="content-casino-info__top, 1, 992.98">
                                                    <span className="info-casino-card__likes-icon">
                                                      <Image src="/img/icons/like.svg" alt="like" width={12} height={12} sizes="(max-width: 480.98px) 9px, 12px" />
                                                    </span>
                                                    <span className="info-casino-card__likes-number">{sanitizeNumberLike(data?.dataCurrentCasinos?.likes)}</span>
                                                </div>
                                                <div className="content-casino-info__top">
                                                    <h2 className="content-casino-info__title">{data?.dataCurrentCasinos?.name + ' Review' || 0}</h2>
                                                </div>
                                                <div className="content-casino-info__country country-content-casino-info">
                                                    <div className="country-content-casino-info__info">
                                                        {geoLocation?.countryImg && (
                                                            <div className="country-content-casino-info__icon">
                                                                <Image
                                                                  src={geoLocation?.countryImg || ''}
                                                                  alt={geoLocation?.countryName || 'country'}
                                                                  width={20}
                                                                  height={20}
                                                                  sizes="(max-width: 650.98px) 16px, 16px"
                                                                  style={{ objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                        )}
                                                            <div className={`country-content-casino-info__text `}>
                                                            {geoLocation?.countryName && geoLocation.countryName !== 'Unknown' 
                                                                ? `${geoLocation?.isAllowed ? 'Accepts players from' : 'Doesn\'t accept players from'} ${geoLocation.countryName}`
                                                                : `${geoLocation?.isAllowed ? 'Accepts players' : 'Limited access'}`
                                                            }
                                                        </div>
                                                    </div>
                                                    <a
                                                        // href={data?.dataCurrentCasinos?.link_tc || ''}
                                                        aria-label="Put your description here."
                                                        target="_blank"
                                                        className="main-get-bonus__btn main-get-bonus__btn_apply"
                                                    >
                                                        T&C Apply
                                                    </a>
                                                </div>
                                                {geoLocation?.isAllowed ? (
                                                    <a
                                                        href={cloacingLink(data?.dataCurrentCasinos.name)}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            e.preventDefault()
                                                            cloacingFetch(data?.dataCurrentCasinos?.casino_affiliate_link)
                                                            window.open(data?.dataCurrentCasinos?.casino_affiliate_link || data?.dataCurrentCasinos?.url, '_blank', 'noopener,noreferrer')
                                                        }}
                                                        className="main-get-bonus__btn main-get-bonus__btn_bonus"
                                                    >
                                                        Visit Casino
                                                    </a>
                                                ) : (
                                                    <Link
                                                        href={'/filter-casinos'}
                                                        onClick={() => {
                                                            setCasinoFilters((s) => ({ ...s, selected_countries: [geoLocation?.idCountry as number] }))
                                                        }}
                                                        aria-label="Put your description here."
                                                        className="main-get-bonus__btn main-get-bonus__btn_bonus"
                                                    >
                                                        <span>
                                                            <Image loading="lazy" src="/img/icons/gift.svg" width={20} height={20} alt="gift" />
                                                        </span>
                                                        Browse Recommended Casinos
                                                    </Link>
                                                )}
                                            </div>
                                            <div className="content-casino-info__features features-content-casino-info">
                                                <div className="features-content-casino-info__row">
                                                    <div className="features-content-casino-info__column">
                                                        <div
                                                            className={`features-content-casino-info__item item-features-content-casino-info item-features-content-casino-info_${SafetyIndexRatingLevel(
                                                                Number(data?.dataCurrentCasinos?.casino_rank) || 10,
                                                            )}`}
                                                        >
                                                            <div className="item-features-content-casino-info__top">
                                                                <div className="item-features-content-casino-info__label">Safety Index</div>
                                                            </div>
                                                            <div className="item-features-content-casino-info__body">
                                                                <div
                                                                    className={`item-features-content-casino-info__number 
                                                                   `}
                                                                >
                                                                    {data?.dataCurrentCasinos?.casino_rank}{' '}
                                                                    <span
                                                                        className={`item-features-content-casino-info__number-level`}
                                                                        style={{
                                                                            textTransform: 'capitalize',
                                                                        }}
                                                                    >
                                                                        {SafetyIndexRatingLevel(Number(data?.dataCurrentCasinos?.casino_rank) || 10)}
                                                                    </span>
                                                                </div>
                                                                <div className="item-features-content-casino-info__rating">
                                                                    {Array(data?.dataCurrentCasinos?.stars || 4)
                                                                        .fill(0)
                                                                        .map((st, sdi) => (
                                                                            <div key={`star-${data?.dataCurrentCasinos?.casino_slug}-${sdi}`} className="item-features-content-casino-info__star">
                                                                                <Image src="/img/icons/star.svg" width={12} height={12} alt="star" />
                                                                            </div>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="features-content-casino-info__column">
                                                        <div className="features-content-casino-info__item item-features-content-casino-info">
                                                            <div className="item-features-content-casino-info__top">
                                                                <div className="item-features-content-casino-info__label">Withdrawal Limit</div>
                                                            </div>
                                                            <div className="item-features-content-casino-info__body">
                                                                <div className="item-features-content-casino-info__number">{data?.dataCurrentCasinos?.withdrawal_limit?.monthly || 'Unlimited'}</div>
                                                                <div className="item-features-content-casino-info__value">Monthly</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="features-content-casino-info__column">
                                                        <div className="features-content-casino-info__item item-features-content-casino-info">
                                                            <div className="item-features-content-casino-info__top">
                                                                <div className="item-features-content-casino-info__label">Min Dep</div>
                                                            </div>
                                                            <div className="item-features-content-casino-info__body">
                                                                <div className="item-features-content-casino-info__number">
                                                                    {data?.dataCurrentCasinos?.min_dep[0].min_value ? `${data?.dataCurrentCasinos?.min_dep[0].min_value}$` : 'Unlimited'}
                                                                </div>
                                                                <div className="item-features-content-casino-info__value">To Activate</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="features-content-casino-info__column">
                                                        <div className="features-content-casino-info__item item-features-content-casino-info">
                                                            <div className="item-features-content-casino-info__top">
                                                                <div className="item-features-content-casino-info__label">Payout Speed</div>
                                                            </div>

                                                            <div className="item-features-content-casino-info__body ">
                                                                <div className="item-features-content-casino-info__number">{data?.dataCurrentCasinos?.payout_speed}</div>
                                                                <div className="item-features-content-casino-info__value">Quick and Reliable</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <CasinoBonuses data={data?.dataCurrentCasinos} />
                        {data?.dataCurrentCasinos?.loyalty_program?.loyalty_keypoint?.length && (
                            <section className="review__loyalty loyalty-review">
                                <div className="loyalty-review__container container">
                                    <div className="loyalty-review__top top">
                                        <div className="top__row">
                                            <div className="top__column">
                                                <div className="top__title-block">
                                                    <h2 className="top__title">Loyalty Keypoints</h2>
                                                </div>
                                            </div>
                                            <div className="top__column">
                                                <Link href={`/casino/${data?.dataCurrentCasinos?.loyalty_slug}/loyalty`} aria-label="Put your description here." className="top__btn " style={{ display: 'flex' }}>
                                                    <span>View More</span>
                                                    <span className="top__btn-arrow">
                                                        <svg>
                                                            <use xlinkHref="#arrow"></use>
                                                        </svg>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="loyalty-review__body">
                                        {data?.dataCurrentCasinos?.loyalty_program?.loyalty_keypoint?.slice(0, 6).map((lk: { text_1: string; text_2: string; image: string }, lkIndex: number) => (
                                            <div 
                                              key={`loyalty-keypoint-${data?.dataCurrentCasinos?.casino_slug}-${lkIndex}-${lk.text_1}`}
                                              className="loyalty-review__column"
                                            >
                                                <div className="loyalty-review__item item-loyalty-review">
                                                    <div className="item-loyalty-review__image">
                                                        <LazyCardImg img={lk?.image || ''} height="100%" width="100%" imgLoading="eager" />
                                                    </div>
                                                    <div className="item-loyalty-review__content">
                                                        <div className="item-loyalty-review__label">{lk.text_1}</div>
                                                        <div className="item-loyalty-review__value">{lk.text_2}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                        {/* <SpecialPromo /> */}
                        <section className="review__iwild-review-mob iwild-review-mob" id="review-iwild-casino-review">
                            <div className="iwild-review-mob__container container"></div>
                        </section>
                        <TabMain Country={Country?.general?.countries} handlerOpen={handlerOpen} data={data?.dataCurrentCasinos} />
                        <Harry handlerOpen={handlerOpen} data={data?.dataCurrentCasinos} />
                        {/* <SpecialPromo /> */}
                        {/* <section className="review__iwild-casino-safety iwild-casino-safety">
                            <div className="iwild-casino-safety__container container">
                                <div className="iwild-casino-safety__body">
                                    <div className="iwild-casino-safety__row">
                                        <div className="iwild-casino-safety__column iwild-casino-safety__column_main">
                                            <div className="iwild-casino-safety__item item-iwild-casino-safety">
                                                <h3 className="item-iwild-casino-safety__title">
                                                    Safety Index of{" "}
                                                    <span>
                                                        {
                                                            data
                                                                ?.dataCurrentCasinos
                                                                ?.name
                                                        }
                                                    </span>{" "}
                                                    explained
                                                </h3>
                                                <div className="item-iwild-casino-safety__text">
                                                    <p>
                                                        Take a look at the
                                                        explanation of factors
                                                        that we consider when
                                                        calculating the Safety
                                                        Index rating of  {
                                                            data
                                                                ?.dataCurrentCasinos
                                                                ?.name
                                                        }. The Safety Index
                                                        is the main metric we
                                                        use to describe the
                                                        trustworthiness,
                                                        fairness, and quality of
                                                        all online casinos in
                                                        our database.
                                                    </p>
                                                </div>
                                                <div className="item-iwild-casino-safety__index index-item-iwild-casino-safety index-item-iwild-casino-safety_high">
                                                    <div className="index-item-iwild-casino-safety__bg"></div>
                                                    <div className="index-item-iwild-casino-safety__icon"></div>
                                                    <div className="index-item-iwild-casino-safety__label">
                                                        Safety Index:
                                                    </div>
                                                    <div
                                                        className="index-item-iwild-casino-safety__value"
                                                        style={{
                                                            textTransform:
                                                                "capitalize",
                                                        }}
                                                    >
                                                        {SafetyIndexRatingLevel(
                                                            Number(
                                                                data
                                                                    ?.dataCurrentCasinos
                                                                    ?.casino_rank
                                                            ) || 10
                                                        )}
                                                    </div>
                                                </div>
                                             
                                            </div>
                                        </div>
                                        <div className="iwild-casino-safety__column iwild-casino-safety__column_content">
                                            <div className="iwild-casino-safety__content content-iwild-casino-safety">
                                                <div className="content-iwild-casino-safety__row">
                                                    <div className="content-iwild-casino-safety__column">
                                                        <div className="content-iwild-casino-safety__item item-content-iwild-casino-safety">
                                                            <div className="item-content-iwild-casino-safety__text">
                                                                <span>
                                                                    Medium-sized
                                                                    casino
                                                                </span>
                                                                , based on our
                                                                research and
                                                                estimates
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content-iwild-casino-safety__column">
                                                        <div className="content-iwild-casino-safety__item item-content-iwild-casino-safety">
                                                            <div className="item-content-iwild-casino-safety__text">
                                                                <span>
                                                                    Low value of
                                                                    withheld
                                                                    winnings
                                                                </span>{" "}
                                                                in player
                                                                complaints in
                                                                relation to the
                                                                casino's size
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content-iwild-casino-safety__column">
                                                        <div className="content-iwild-casino-safety__item item-content-iwild-casino-safety">
                                                            <div className="item-content-iwild-casino-safety__text">
                                                                We consider the
                                                                casino's T&Cs to
                                                                be{" "}
                                                                <span>
                                                                    fair
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content-iwild-casino-safety__column">
                                                        <div className="content-iwild-casino-safety__item item-content-iwild-casino-safety">
                                                            <div className="item-content-iwild-casino-safety__text">
                                                                We also
                                                                considered other
                                                                factors, which
                                                                had a
                                                                <span>
                                                                {" "}neutral
                                                                    impact
                                                                </span>{" "}
                                                                on the casino's
                                                                Safety Index
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content-iwild-casino-safety__column">
                                                        <div className="content-iwild-casino-safety__item item-content-iwild-casino-safety">
                                                            <div className="item-content-iwild-casino-safety__text">
                                                                Not found on any
                                                                relevant casino
                                                                blacklist
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content-iwild-casino-safety__column">
                                                        <div className="content-iwild-casino-safety__item item-content-iwild-casino-safety">
                                                            <div className="item-content-iwild-casino-safety__text">
                                                                The Safety Index
                                                                of this casino
                                                                was calculated
                                                                based on our
                                                                research and
                                                                data collected
                                                                by our casino
                                                                review team.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section> */}

                        <HighRankedCasinos />
                        <CheckMoreWhatSuitsYouBest />
                        <SubscribeForm />
                        <Footer />
                    </div>
                </main>
            {/* </Wraper> */}
        </>
    )
}

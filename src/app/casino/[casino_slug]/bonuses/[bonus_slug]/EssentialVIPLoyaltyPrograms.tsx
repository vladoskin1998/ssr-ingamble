'use client'
import { useQuery } from '@tanstack/react-query'

import { Swiper, SwiperSlide } from 'swiper/react'



import Link from 'next/link'
import { LoadingLink } from '@/components/LoadingLink'
import Image from 'next/image'
import { LoyaltyInRankRangeResponse } from '@/types'
import $api from '@/http'
import { cloacingFetch, cloacingLink, sanitizeNumberLike } from '@/helper'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'


const getFilteringLoyaltiesList = async () => {
    if (process.env.USE_NEXT_API === 'true') {
        const response = await fetch('/api/loyalty-programs-rank-range')
        return response.json()
    }
    
    const response = await $api.get(`loyalty-programs-in-rank-range/`)
    return response.data
}

export const EssentialVIPLoyaltyPrograms = () => {
    const { data: LoyaltieDataHigh } = useQuery({
        queryKey: ['loyalty-programs-in-rank-range/'],
        queryFn: () => getFilteringLoyaltiesList(),
        staleTime: Infinity,
    })

    return (
        <>
            <section className="simple-bonus__essential-programs essential-programs-gamble essential-programs-gamble_images">
                <div className="essential-programs-gamble__container container">
                    <div className="essential-programs-gamble__top top">
                        <div className="top__row">
                            <div className="top__column">
                                <div className="top__title-block">
                                    <h2 className="top__title">Essential VIP Loyalty Programs</h2>
                                </div>
                            </div>
                            <div className="top__column">
                                <LoadingLink
                                    rel="nofollow noopener"
                                    href="/all-loyalties"
                                    aria-label="Put your description here."
                                    className="top__btn"
                                >
                                    <span>See All</span>
                                    <span className="top__btn-arrow">
                                        <svg>
                                            <use xlinkHref="#arrow"></use>
                                        </svg>
                                    </span>
                                </LoadingLink>
                            </div>
                        </div>
                    </div>

                    <div className="essential-programs-gamble__slider slider">
                        <div className="essential-programs-gamble__swiper slider__swiper swiper">
                            <Swiper
                                slidesPerView="auto"
                                allowTouchMove={true}
                                breakpoints={{
                                    320: {
                                        spaceBetween: 16,
                                    },
                                    1024.98: {
                                        spaceBetween: 20,
                                    },
                                    1920: {
                                        spaceBetween: 20,
                                    },
                                }}
                                className="slider__wrapper swiper-wrapper"
                            >
                                {LoyaltieDataHigh?.map((item: LoyaltyInRankRangeResponse, index: number) => (
                                    <SwiperSlide key={`loyalty-${item?.loyalty_slug || item?.casino_slug}-${index}`}>
                                        <div
                                            className="slide-slider__item essential-programs-gamble__item item-essential-programs-gamble"
                                        >
                                            <div className="item-essential-programs-gamble__top">
                                                {item?.casino_slug ? (
                                                    <Link
                                                        href={`/casino/${item.casino_slug}`}
                                                        aria-label="Put your description here."
                                                        className="item-essential-programs-gamble__logo"
                                                        prefetch={false} // отключаем предзагрузку для мобильных
                                                    >
                                                        <LazyCardImg img={item.card_logo || ''} />
                                                    </Link>
                                                ) : (
                                                    <div className="item-essential-programs-gamble__logo">
                                                        <Image src={item.card_logo || '/img/no-results.svg'} alt={'card_logo'} width={444} height={444} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="item-essential-programs-gamble__body">
                                                <div className="item-essential-programs-gamble__provider">
                                                    <span className="item-essential-programs-gamble__provider-name">
                                                        {item.casino_name}
                                                    </span>
                                                    <span className="item-essential-programs-gamble__provider-rating">
                                                        <span className="item-essential-programs-gamble__provider-rating-star">
                                                            <Image src={'/img/icons/star.svg'} alt="star" width={20} height={20} />
                                                        </span>
                                                        <span className="item-essential-programs-gamble__provider-rating-number">
                                                            {item.casino_rank}
                                                        </span>
                                                    </span>
                                                    <div className="info-casino-card__likes">
                                                        <span className="info-casino-card__likes-icon">
                                                            <Image src={'/img/icons/like.svg'} alt="like" width={20} height={20} />
                                                        </span>
                                                        <span className="info-casino-card__likes-number">
                                                            {sanitizeNumberLike(item?.loyalty_likes)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="item-essential-programs-gamble__stats stats-item-essential-programs-gamble">
                                                    <div className="stats-item-essential-programs-gamble__column">
                                                        <div className="stats-item-essential-programs-gamble__item item-stats-essential-programs-gamble">
                                                            <div className="item-stats-essential-programs-gamble__label">Loyalty Rank</div>
                                                            <div className="item-stats-essential-programs-gamble__value value-item-stats-essential-programs-gamble">
                                                                <div className="value-item-stats-essential-programs-gamble__number">
                                                                    {item.loyalty_rank}
                                                                </div>
                                                                <div className="value-item-stats-essential-programs-gamble__content">
                                                                    <div className="value-item-stats-essential-programs-gamble__stars value-item-stats-essential-programs-gamble__stars_5">
                                                                        {item.stars.map((it, idstar) => (
                                                                            <div
                                                                                key={`star-${item?.loyalty_slug}-${idstar}-${it}`}
                                                                                className="value-item-stats-essential-programs-gamble__star"
                                                                            >
                                                                                <Image
                                                                                    width={20}
                                                                                    height={20}
                                                                                    src={'/img/icons/star.svg'}
                                                                                    alt={'star' + it}
                                                                                />
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="stats-item-essential-programs-gamble__column">
                                                        <div className="stats-item-essential-programs-gamble__item item-stats-essential-programs-gamble">
                                                            <div className="item-stats-essential-programs-gamble__label">Levels</div>
                                                            <div className="item-stats-essential-programs-gamble__value value-item-stats-essential-programs-gamble">
                                                                <div className="value-item-stats-essential-programs-gamble__number">
                                                                    {item.loyalty_count_levels}
                                                                </div>
                                                                <div className="value-item-stats-essential-programs-gamble__content">
                                                                    {item.loyalty_level_description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-essential-programs-gamble__features features-essential-programs-gamble">
                                                    {item.keypoints.map((itp, idk) => (
                                                        <div className="features-essential-programs-gamble__item" key={`keypoint-${item?.loyalty_slug}-${idk}-${itp?.text_1}`}>
                                                            <div className="features-essential-programs-gamble__icon">
                                                              <LazyCardImg img={itp.image || ''} size="medium" />
                                                            </div>
                                                            <div className="features-essential-programs-gamble__info">
                                                                <div className="features-essential-programs-gamble__name">{itp.text_1}</div>
                                                                <div className="features-essential-programs-gamble__text">{itp.text_2}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="item-essential-programs-gamble__bottom">
                                                <div className="item-essential-programs-gamble__bottom-column">
                                                    <a
                                                        href={cloacingLink(item?.casino_name)}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            e.preventDefault()
                                                            cloacingFetch(item?.casino_affiliate_link)
                                                            window.open(
                                                                item?.casino_affiliate_link || item?.url_casino,
                                                                '_blank',
                                                                'noopener,noreferrer',
                                                            )
                                                        }}
                                                        className="item-essential-programs-gamble__btn item-essential-programs-gamble__btn_yellow"
                                                    >
                                                        Visit Casino
                                                    </a>
                                                </div>
                                                <div className="item-essential-programs-gamble__bottom-column">
                                                    <Link
                                                        href={`/casino/${item?.loyalty_slug}/loyalty`}
                                                        aria-label="Put your description here."
                                                        className="item-essential-programs-gamble__btn"
                                                        prefetch={false} // отключаем предзагрузку для мобильных
                                                    >
                                                        Read More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

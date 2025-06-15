'use client'

import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { useRef, useEffect } from 'react'

import { DataHomeItemsBlock, HomeDataBlock, HomeDataCard } from '../../types'
import { SeeAllButton } from './SeeAllButton'

import { getTagColorByindex } from '../../helper'
import Link from 'next/link'

import { Autoplay } from 'swiper/modules'
import Image from 'next/image'

export default function BlockType3Mobile({
    data,
    isAutoPlay = false,
}: {
    data: HomeDataBlock<DataHomeItemsBlock>

    isAutoPlay?: boolean
}) {
    const sliderRef = useRef<SwiperRef | null>(null)
    const paginationRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (sliderRef.current && paginationRef.current) {
            const swiper = sliderRef.current.swiper
            if (swiper && paginationRef.current) {
                if (swiper?.params?.pagination) {
                    if (typeof swiper.params.pagination === 'object') {
                        swiper.params.pagination.el = paginationRef.current
                    }
                }
                swiper.pagination.init()
                swiper.pagination.render()
                swiper.pagination.update()
            }
        }
    }, [])

    return (
        <section
            aria-label="BlockTypeNumber.BlockType3"
            className="main-gamble__vpn-friendly-casinos-2 vpn-friendly-casinos-2-gamble main-gamble__fastest-payout-casinos fastest-payout-casinos-gamble"
        >
            <div className="vpn-friendly-casinos-2-gamble__container container">
                <div className="vpn-friendly-casinos-2-gamble__top top">
                    <div className="top__row">
                        <div className="top__column">
                            <div className="top__title-block">
                                {data.items_block.title_image && (
                                    <span className="top__title-icon ibg--custom ibg--custom-width-auto">
                                        <img src={data.items_block.title_image} alt="security" />
                                    </span>
                                )}
                                <h2 className="top__title">{data?.items_block.block_title}</h2>
                            </div>
                            {data?.items_block.subtitle && <div className="top__subtitle">{data?.items_block.subtitle}</div>}
                        </div>
                        <div className="top__column">
                            <SeeAllButton type_category={data.items_block.type_category} slug={data?.items_block?.category?.slug} />
                        </div>
                    </div>
                </div>
                <div className="vpn-friendly-casinos-2-gamble__slider slider">
                    <div className="slider__body">
                        <div className="vpn-friendly-casinos-2-gamble__swiper slider__swiper swiper">
                            <Swiper
                                speed={1000}
                                ref={sliderRef}
                                className="slider__wrapper swiper-wrapper"
                                slidesPerView="auto"
                                modules={[Pagination, Autoplay]}
                                autoplay={
                                    isAutoPlay && {
                                        delay: 4000,
                                        disableOnInteraction: false,
                                    }
                                }
                                pagination={{
                                    el: paginationRef.current,
                                    clickable: true,
                                }}
                                breakpoints={{
                                    320: {
                                        spaceBetween: 16,
                                    },
                                    1650.98: {
                                        spaceBetween: 20,
                                    },
                                    1920: {
                                        spaceBetween: 20,
                                    },
                                }}
                            >
                                {data.items_block.data_cards
                                    ?.filter((item) => !item.big_card)
                                    ?.reduce((acc: [HomeDataCard, HomeDataCard?][], item, index) => {
                                        if (index % 2 === 0) {
                                            acc.push([item])
                                        } else {
                                            acc[acc.length - 1].push(item)
                                        }
                                        return acc
                                    }, [])
                                    ?.map((item, index) => {
                                        return (
                                            <SwiperSlide
                                                key={index}
                                                className="slider__slide slide-slider slide-slider-column slide-slider-column_standart swiper-slide"
                                            >
                                                <div className="slide-slider__item slide-slider__item-column slide-slider__item-column">
                                                    <div className="different-casino-standart">
                                                        <div className="different-casino-standart__body">
                                                            <Link
                                                                href={`/casino/${item?.[0]?.casino_info?.casino_slug}`}
                                                                className="different-casino-standart__image-block"
                                                            >
                                                                <span className="different-casino-standart__image ibg--custom">
                                                                    <Image
                                                                        width={444}
                                                                        height={444}
                                                                        alt="Casino Image"
                                                                        src={item?.[0]?.casino_info?.casino_image || ''}
                                                                    />
                                                                </span>
                                                            </Link>
                                                            <div className="different-casino-standart__content">
                                                                <div className="different-casino-standart__content-row">
                                                                    <Link
                                                                        href={`/casino/${item?.[0]?.casino_info?.casino_slug}/bonuses/${item?.[0]?.bonus_info?.bonus_slug}`}
                                                                        aria-label="Put your description here."
                                                                        className="different-casino-standart__name"
                                                                    >
                                                                        {item?.[0]?.bonus_info?.bonus_name}
                                                                    </Link>

                                                                    {item?.[0].bonus_info?.labels?.length && (
                                                                        <div className="different-casino-standart__tags tags-casino-card">
                                                                            {item?.[0]?.bonus_info?.labels
                                                                                ?.sort((a: string, b: string) => a.localeCompare(b))
                                                                                ?.map((item, cindex) => (
                                                                                    <div
                                                                                        key={cindex}
                                                                                        className={`tags-casino-card__item ${getTagColorByindex(
                                                                                            cindex,
                                                                                        )}`}
                                                                                    >
                                                                                        <span className="tags-casino-card__item-label">
                                                                                            {item}
                                                                                        </span>
                                                                                    </div>
                                                                                ))}
                                                                        </div>
                                                                    )}
                                                                    <div className="info-casino-card__stake">
                                                                        <Link
                                                                            href={`/casino/${item?.[0]?.casino_info?.casino_slug}`}
                                                                            aria-label="Put your description here."
                                                                            className="info-casino-card__stake-link"
                                                                        >
                                                                            {item?.[0]?.casino_info?.casino_name}
                                                                        </Link>
                                                                        <div className="info-casino-card__stake-rating">
                                                                            <span
                                                                                style={{ position: 'relative' }}
                                                                                className="info-casino-card__stake-rating-icon"
                                                                            >
                                                                                <Image fill src="/img/icons/star.svg" alt="star" />
                                                                            </span>
                                                                            <span className="info-casino-card__stake__rating-number">
                                                                                {item?.[0]?.casino_info?.casino_rank}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="slide-slider__item slide-slider__item-column slide-slider__item-column">
                                                    {item?.[1] && (
                                                        <div className="different-casino-standart">
                                                            <div className="different-casino-standart__body">
                                                                <Link
                                                                    href={`/casino/${item?.[1]?.casino_info?.casino_slug}`}
                                                                    className="different-casino-standart__image-block"
                                                                >
                                                                    <span className="different-casino-standart__image ibg--custom">
                                                                        <Image
                                                                            width={444}
                                                                            height={444}
                                                                            alt="Casino Image"
                                                                            src={item?.[1]?.casino_info?.casino_image || ''}
                                                                        />
                                                                    </span>
                                                                </Link>
                                                                <div className="different-casino-standart__content">
                                                                    <div className="different-casino-standart__content-row">
                                                                        <Link
                                                                            href={`/casino/${item?.[1]?.casino_info?.casino_slug}/bonuses/${item?.[1]?.bonus_info?.bonus_slug}`}
                                                                            aria-label="Put your description here."
                                                                            className="different-casino-standart__name"
                                                                        >
                                                                            {item?.[1]?.bonus_info?.bonus_name}
                                                                        </Link>

                                                                        {item?.[1].bonus_info?.labels?.length && (
                                                                            <div className="different-casino-standart__tags tags-casino-card">
                                                                                {item?.[1]?.bonus_info?.labels
                                                                                    ?.sort((a: string, b: string) => a.localeCompare(b))
                                                                                    ?.map((item, cindex) => (
                                                                                        <div
                                                                                            key={cindex}
                                                                                            className={`tags-casino-card__item ${getTagColorByindex(
                                                                                                cindex,
                                                                                            )}`}
                                                                                        >
                                                                                            <span className="tags-casino-card__item-label">
                                                                                                {item}
                                                                                            </span>
                                                                                        </div>
                                                                                    ))}
                                                                            </div>
                                                                        )}
                                                                        <div className="info-casino-card__stake">
                                                                            <Link
                                                                                href={`/casino/${item?.[1]?.casino_info?.casino_slug}`}
                                                                                aria-label="Put your description here."
                                                                                className="info-casino-card__stake-link"
                                                                            >
                                                                                {item?.[1]?.casino_info?.casino_name}
                                                                            </Link>
                                                                            <div className="info-casino-card__stake-rating">
                                                                                <span
                                                                                    style={{ position: 'relative' }}
                                                                                    className="info-casino-card__stake-rating-icon"
                                                                                >
                                                                                    <Image fill src="/img/icons/star.svg" alt="star" />
                                                                                </span>
                                                                                <span className="info-casino-card__stake__rating-number">
                                                                                    {item?.[1]?.casino_info?.casino_rank}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}
                            </Swiper>
                        </div>
                    </div>
                    <div className="slider__bottom bottom-slider">
                        <div
                            ref={paginationRef}
                            className="bottom-slider__pagination vpn-friendly-casinos-2-gamble__pagination swiper-pagination"
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

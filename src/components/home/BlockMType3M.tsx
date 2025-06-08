'use client'

import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { useRef, useEffect } from 'react'

import { DataHomeItemsBlock, HomeDataBlock } from '../../types'
import { SeeAllButton } from './SeeAllButton'

import { getTagColorByindex } from '../../helper'
import Link from 'next/link'

import { Autoplay } from 'swiper/modules'
import Image from 'next/image'

export default function BlockMType3M({
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
                //@ts-ignore
                swiper.params.pagination.el = paginationRef.current
                swiper.pagination.init()
                swiper.pagination.render()
                swiper.pagination.update()
            }
        }
    }, [])

    return (
        <>
            <section
                aria-label="BlockTypeNumber.BlockType3M"
                className="main-gamble__vpn-friendly-casinos-2 vpn-friendly-casinos-2-gamble main-gamble__fastest-payout-casinos fastest-payout-casinos-gamble"
            >
                <div className="vpn-friendly-casinos-2-gamble__container container">
                    <div className="vpn-friendly-casinos-2-gamble__top top">
                        <div className="top__row">
                            <div className="top__column">
                                <div className="top__title-block">
                                    {data.items_block.title_image && (
                                        <span className="top__title-icon">
                                            <img src={data.items_block.title_image} alt="security" loading="lazy" />
                                        </span>
                                    )}
                                    <h2 className="top__title">{data.items_block.block_title}</h2>
                                </div>
                                {data.items_block.subtitle && <div className="top__subtitle">{data.items_block.subtitle}</div>}
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
                                    {
                                        //@ts-ignore
                                        data.items_block.data_cards
                                            .sort((a, b) => a.order - b.order)
                                            //@ts-ignore
                                            .map((item, index) => (
                                                <SwiperSlide
                                                    key={index}
                                                    className="slider__slide slide-slider slide-slider-column slide-slider-column_standart swiper-slide"
                                                >
                                                    <div className="slide-slider__item slide-slider__item-column slide-slider__item-column">
                                                        <div className="different-casino-standart">
                                                            <div className="different-casino-standart__body">
                                                                <Link
                                                                    rel="nofollow noopener"
                                                                    href={`/casino/${item?.casino_info?.casino_slug}`}
                                                                    className="different-casino-standart__image-block"
                                                                >
                                                                    <span className="different-casino-standart__image ibg--custom">
                                                                        <Image width={444} height={444}
                                                                            alt="Casino Image"
                                                                            src={item?.casino_info?.casino_image || ''}
                                                                        />
                                                                    </span>
                                                                </Link>
                                                                <div className="different-casino-standart__content">
                                                                    <div className="different-casino-standart__content-row">
                                                                        <Link
                                                                            rel="nofollow noopener"
                                                                            href={`/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`}
                                                                            aria-label="Put your description here."
                                                                            className="different-casino-standart__name"
                                                                        >
                                                                            {item?.bonus_info?.bonus_name}
                                                                        </Link>
                                                                        {item?.bonus_info?.labels?.length && (
                                                                            <div className="different-casino-standart__tags tags-casino-card">
                                                                                {item?.bonus_info?.labels
                                                                                    ?.sort((a: string, b: string) => a.localeCompare(b))
                                                                                    ?.map((item, index) => (
                                                                                        <div
                                                                                            key={index}
                                                                                            className={`tags-casino-card__item ${getTagColorByindex(
                                                                                                index,
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
                                                                                rel="nofollow noopener"
                                                                                href={`/casino/${item?.casino_info?.casino_slug}`}
                                                                                aria-label="Put your description here."
                                                                                className="info-casino-card__stake-link"
                                                                            >
                                                                                {item?.casino_info?.casino_name}
                                                                            </Link>
                                                                            <div className="info-casino-card__stake-rating">
                                                                                <span className="info-casino-card__stake-rating-icon">
                                                                                    <img src="/img/icons/star.svg" alt="star" />
                                                                                    
                                                                                </span>
                                                                                <span className="info-casino-card__stake__rating-number">
                                                                                    {item?.casino_info?.casino_rank}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                    }
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
        </>
    )
}

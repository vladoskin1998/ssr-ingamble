'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useRef, useState } from 'react'
import { DataHomeItemsBlock, HomeDataBlock, HomeDataCard } from '@/types'

import { cloacingFetch, cloacingLink, getTagColorByindex } from '@/helper'
import Link from 'next/link'
import { useAdaptiveBehavior } from '@/context/AppContext'
import { SeeAllButton } from './SeeAllButton'

import { Autoplay } from 'swiper/modules'
import Image from 'next/image'

export default function BlockType3({
    data,
    isAutoPlay = false,
}: {
    data: HomeDataBlock<DataHomeItemsBlock>

    isAutoPlay?: boolean
}) {
    const sliderRef = useRef<SwiperRef | null>(null)

    const paginationRef = useRef<HTMLDivElement | null>(null)
    const [screenState, setScreenState] = useState<number | 'auto'>('auto')

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 1020) {
                setScreenState('auto')
            } else if (width < 1220) {
                setScreenState(1)
            } else if (width < 1600) {
                setScreenState(2)
            } else if (width > 2100) {
                setScreenState(3)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if (sliderRef?.current && paginationRef?.current) {
            const swiper = sliderRef?.current?.swiper
            if (swiper && paginationRef?.current) {
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
    const { isShowPlayButton } = useAdaptiveBehavior()

    return (
        <>
            <section
                aria-label="BlockTypeNumber.BlockType3"
                className="main-gamble__top-gainers-casinos top-gainers-casinos-gamble main-gamble__baner-block"
            >
                <div className="top-gainers-casinos-gamble__container container">
                    <div className="top-gainers-casinos-gamble__top top">
                        <div className="top__row">
                            <div className="top__column">
                                <div className="top__title-block">
                                    {data.items_block.title_image && (
                                        <span className="top__title-icon ibg--custom ibg--custom-width-auto">
                                            <img src={data.items_block.title_image} alt="security" />
                                        </span>
                                    )}
                                    <h2 className="top__title">{data?.items_block?.block_title}</h2>
                                </div>
                                {data?.items_block?.subtitle && <div className="top__subtitle">{data?.items_block?.subtitle}</div>}
                            </div>
                            <div className="top__column">
                                <SeeAllButton type_category={data.items_block.type_category} slug={data?.items_block?.category?.slug} />
                            </div>
                        </div>
                    </div>
                    <div className="top-gainers-casinos-gamble__row main-gamble__row-block row-block row-block__right">
                        <div className="top-gainers-casinos-gamble__slider row-block__slider slider">
                            <div className="slider__body" style={{ overflow: 'hidden' }}>
                                <div className="top-gainers-casinos-gamble__swiper slider__swiper swiper">
                                    <Swiper
                                        speed={1000}
                                        slidesPerView={screenState}
                                        className="slider__wrapper swiper-wrapper"
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
                                        {data?.items_block?.data_cards
                                            .filter((item) => !item?.big_card)
                                            .reduce((acc: [HomeDataCard, HomeDataCard?][], item, index) => {
                                                if (index % 2 === 0) {
                                                    acc.push([item])
                                                } else {
                                                    acc[acc?.length - 1].push(item)
                                                }
                                                return acc
                                            }, [])
                                            .map((item, index) => (
                                                //////main slide
                                                <SwiperSlide
                                                    className="slider__slide slide-slider slide-slider-column slide-slider-column_standart swiper-slide"
                                                    style={{
                                                        minHeight: '260px',
                                                        height: '100%',
                                                    }}
                                                    key={index}
                                                >
                                                    <>
                                                        <div className="slide-slider__item slide-slider__item-column slide-slider__item-column">
                                                            <div className="different-casino-standart">
                                                                <div className="different-casino-standart__body">
                                                                    <div className="different-casino-standart__image-block">
                                                                        <Link
                                                                            href={`/casino/${item?.[0]?.casino_info?.casino_slug}`}
                                                                            className="different-casino-standart__image ibg--custom"
                                                                        >
                                                                            <Image
                                                                                width={444}
                                                                                height={444}
                                                                                alt="Casino Image"
                                                                                src={item?.[0]?.casino_info?.casino_image || ''}
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="different-casino-standart__content">
                                                                        <div className="different-casino-standart__content-row">
                                                                            <Link
                                                                                rel="nofollow noopener"
                                                                                href={`/casino/${item?.[0]?.casino_info?.casino_slug}/bonuses/${item?.[0]?.bonus_info?.bonus_slug}`}
                                                                                aria-label="Put your description here."
                                                                                className="different-casino-standart__name"
                                                                            >
                                                                                {item?.[0]?.bonus_info?.bonus_name}
                                                                            </Link>
                                                                            {item?.[0]?.bonus_info?.labels?.length && (
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
                                                                                    rel="nofollow noopener"
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
                                                        {item?.[1] && (
                                                            <div className="slide-slider__item slide-slider__item-column slide-slider__item-column">
                                                                <div className="different-casino-standart">
                                                                    <div className="different-casino-standart__body">
                                                                        <div className="different-casino-standart__image-block">
                                                                            <Link
                                                                                className="different-casino-standart__image ibg--custom"
                                                                                href={`/casino/${item?.[1]?.casino_info?.casino_slug}`}
                                                                            >
                                                                                <Image
                                                                                    width={444}
                                                                                    height={444}
                                                                                    alt="Casino Image"
                                                                                    src={item?.[1]?.casino_info?.casino_image || ''}
                                                                                />
                                                                            </Link>
                                                                        </div>
                                                                        <div className="different-casino-standart__content">
                                                                            <div className="different-casino-standart__content-row">
                                                                                <Link
                                                                                    rel="nofollow noopener"
                                                                                    href={`/casino/${item?.[1]?.casino_info?.casino_slug}/bonuses/${item?.[1]?.bonus_info?.bonus_slug}`}
                                                                                    aria-label="Put your description here."
                                                                                    className="different-casino-standart__name"
                                                                                >
                                                                                    {item?.[1]?.bonus_info?.bonus_name}
                                                                                </Link>
                                                                                {item?.[1].bonus_info?.labels?.length && (
                                                                                    <div className="different-casino-standart__tags tags-casino-card">
                                                                                        {item?.[1]?.bonus_info?.labels
                                                                                            ?.sort((a: string, b: string) =>
                                                                                                a.localeCompare(b),
                                                                                            )
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
                                                                                                    {/* <span className="tags-casino-card__item-value">
                                                                                                 4.0x
                                                                                             </span> */}
                                                                                                </div>
                                                                                            ))}
                                                                                    </div>
                                                                                )}
                                                                                <div className="info-casino-card__stake">
                                                                                    <Link
                                                                                        rel="nofollow noopener"
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
                                                                                            <Image
                                                                                                fill
                                                                                                src="/img/icons/star.svg"
                                                                                                alt="star"
                                                                                            />
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
                                                            </div>
                                                        )}
                                                    </>
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className="row-block__baner row-block__baner_right baner-row-block">
                            <div className="baner-row-block__slider">
                                <div className="baner-row-block__slider-body">
                                    <div className="baner-row-block__swiper top-gainers-casinos-baner__swiper swiper">
                                        <div className="baner-row-block__wrapper swiper-wrapper">
                                            <Swiper
                                                speed={1000}
                                                slidesPerView={1}
                                                ref={sliderRef}
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
                                                    .filter((item) => item.big_card)
                                                    .map((item, index) => (
                                                        <SwiperSlide key={index} className="baner-row-block__slide slide-baner-row-block ">
                                                            <div style={{ height: '100%' }}>
                                                                <div className="slide-baner-row-block__item item-baner-row-block">
                                                                    <Link
                                                                        href={`/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`}
                                                                        className="item-baner-row-block__image ibg--custom"
                                                                    >
                                                                        <Image
                                                                            width={444}
                                                                            height={444}
                                                                            alt="Casino Image"
                                                                            src={item?.bonus_info?.bonus_image || ''}
                                                                        />
                                                                    </Link>
                                                                    <div className="item-baner-row-block__row">
                                                                        <div className="item-baner-row-block__column">
                                                                            <div className="item-baner-row-block__small-card casino-small-card">
                                                                                <Link
                                                                                    className="casino-small-card__image-block"
                                                                                    href={`/casino/${item?.casino_info?.casino_slug}`}
                                                                                >
                                                                                    <div className="casino-small-card__image ibg--custom">
                                                                                        <Image
                                                                                            width={444}
                                                                                            height={444}
                                                                                            alt="Casino Image"
                                                                                            src={item?.casino_info?.casino_image || ''}
                                                                                        />
                                                                                    </div>
                                                                                </Link>
                                                                                <div className="casino-small-card__body">
                                                                                    <Link
                                                                                        className="casino-small-card__name"
                                                                                        href={`/casino/${item?.casino_info?.casino_slug}`}
                                                                                    >
                                                                                        {item?.casino_info?.casino_name}
                                                                                    </Link>
                                                                                    <div className="casino-small-card__rating">
                                                                                        <span
                                                                                            style={{ position: 'relative' }}
                                                                                             className="casino-small-card__rating-icon"
                                                                                        >
                                                                                            <Image
                                                                                                fill
                                                                                                src="/img/icons/star.svg"
                                                                                                alt="star"
                                                                                            />
                                                                                        </span>
                                                                                        <span className="casino-small-card__rating-number">
                                                                                            {item?.casino_info?.casino_rank}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <Link
                                                                                href={`/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`}
                                                                                className="item-baner-row-block__title top__title-40"
                                                                            >
                                                                                {item?.bonus_info?.bonus_name}
                                                                            </Link>
                                                                        </div>
                                                                        <div className="item-baner-row-block__column">
                                                                            {isShowPlayButton && (
                                                                                <a
                                                                                    rel="nofollow noopener"
                                                                                    href={cloacingLink(item?.casino_info?.casino_name)}
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation()
                                                                                        e.preventDefault()
                                                                                        cloacingFetch(
                                                                                            item?.casino_info?.casino_affiliate_link,
                                                                                        )
                                                                                        window.open(
                                                                                            item?.casino_info?.casino_affiliate_link ||
                                                                                                item?.casino_info?.url_casino,
                                                                                            '_blank',
                                                                                            'noopener,noreferrer',
                                                                                        )
                                                                                    }}
                                                                                    className="item-baner-row-block__btn casino-card__bnt"
                                                                                >
                                                                                    Play
                                                                                </a>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>
                                <div className="baner-row-block__slider-bottom">
                                    <div
                                        ref={paginationRef}
                                        className="baner-row-block__pagination bottom-slider__pagination top-gainers-casinos-baner__pagination swiper-pagination"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

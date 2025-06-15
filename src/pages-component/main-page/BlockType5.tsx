'use client'

import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { useRef, useEffect, useState } from 'react'

import { DataHomeItemsBlock, HomeDataBlock } from '../../types'

import { SeeAllButton } from './SeeAllButton'
import { cloacingFetch, cloacingLink } from '../../helper'
import Link from 'next/link'
import { useAdaptiveBehavior } from '../../context/AppContext'

import { Autoplay } from 'swiper/modules'
import Image from 'next/image'

export default function BlockType5({
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

    const [isBeginning, setIsBeginning] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(false)

    const handleSlideChange = () => {
        if (sliderRef.current) {
            setIsBeginning(sliderRef.current.swiper.isBeginning)
            setIsEnd(sliderRef.current.swiper.isEnd)
        }
    }

    const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.swiper.slideNext()
            handleSlideChange()
        }
    }

    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.swiper.slidePrev()
            handleSlideChange()
        }
    }
    const { isShowPlayButton } = useAdaptiveBehavior()

    return (
        <section
            aria-label="BlockTypeNumber.BlockType5"
            className="main-gamble__best-live-dealer-casinos best-live-dealer-casinos-gamble  main-gamble__different-casino-bg main-gamble__baner-block"
        >
            <div className="best-live-dealer-casinos-gamble__container container">
                <div className="best-live-dealer-casinos-gamble__top top">
                    <div className="top__row">
                        <div className="top__column">
                            <div className="top__title-block">
                                {data.items_block.title_image && (
                                    <span className="top__title-icon ibg--custom ibg--custom-width-auto">
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
                <div className="best-live-dealer-casinos-gamble__row">
                    <div className="best-live-dealer-casinos-gamble__bg ibg--custom">
                        <Image width={444} height={444} src="/img/bg/07.webp" alt="bg" loading="lazy" />
                    </div>
                    <div className="best-live-dealer-casinos-gamble__slider slider-best-live-dealer-casinos-gamble">
                        <div className="slider-best-live-dealer-casinos-gamble__top">
                            <div className="slider-best-live-dealer-casinos-gamble__title">
                                <span>
                                    <img src="/img/icons/roulette.svg" alt="roulette" loading="lazy" />
                                </span>
                                Blackjack, Roulette, Table Games
                            </div>
                            <div className="slider-best-live-dealer-casinos-gamble__navigation navigation-btns">
                                <button
                                    onClick={prevSlide}
                                    className={`navigation-btn navigation-btn_prev slider-best-live-dealer-casinos-gamble__btn_prev ${
                                        isBeginning ? 'swiper-button-disabled' : ''
                                    }`}
                                >
                                    <svg>
                                        <use xlinkHref="#arrow"></use>
                                    </svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className={`navigation-btn navigation-btn_next slider-best-live-dealer-casinos-gamble__btn_next ${
                                        isEnd ? 'swiper-button-disabled' : ''
                                    }`}
                                >
                                    <svg>
                                        <use xlinkHref="#arrow"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="slider-best-live-dealer-casinos-gamble__content">
                            <div className="slider__body">
                                <div className="slider-best-live-dealer-casinos-gamble__swiper slider__swiper swiper">
                                    <Swiper
                                        speed={1000}
                                        onSlideChange={handleSlideChange}
                                        className="slider__wrapper swiper-wrapper"
                                        slidesPerView="auto"
                                        modules={[Pagination, Autoplay]}
                                        autoplay={
                                            isAutoPlay && {
                                                delay: 4000,
                                                disableOnInteraction: false,
                                            }
                                        }
                                        ref={sliderRef}
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
                                            ?.sort((a, b) => a.order - b.order)
                                            ?.map((item, index) => (
                                                <SwiperSlide key={index} className="slider__slide slide-slider swiper-slide">
                                                    <div
                                                        aria-label="Put your description here."
                                                        className="slide-slider__item casino-big-card"
                                                    >
                                                        <Link
                                                            className="casino-big-card__image ibg--custom"
                                                            href={`/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`}
                                                        >
                                                            <Image
                                                                width={444}
                                                                height={444}
                                                                alt="Casino Image"
                                                                src={item?.bonus_info?.bonus_image || ''}
                                                            />
                                                        </Link>
                                                        <div className="casino-big-card__top">
                                                            <div className="casino-big-card__top-small-card casino-small-card">
                                                                <Link
                                                                    href={`/casino/${item?.casino_info?.casino_slug}`}
                                                                    className="casino-small-card__image-block"
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
                                                                        href={`/casino/${item?.casino_info?.casino_slug}`}
                                                                        aria-label="Put your description here."
                                                                        className="casino-small-card__name"
                                                                    >
                                                                        {item?.casino_info?.casino_name}
                                                                    </Link>
                                                                    <div className="casino-small-card__info">
                                                                        {item?.casino_info?.additional_casino_params?.map((it, id) => (
                                                                            <span key={id} className="casino-small-card__info-link">
                                                                                {it}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                    <div className="casino-small-card__rating">
                                                                        <span
                                                                            style={{ position: 'relative' }}
                                                                            className="casino-small-card__rating-icon"
                                                                        >
                                                                            <Image fill src="/img/icons/star.svg" alt="star" />
                                                                        </span>
                                                                        <span className="casino-small-card__rating-number">
                                                                            {item?.casino_info?.casino_rank}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="casino-big-card__bottom">
                                                            <Link
                                                                href={`/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`}
                                                                aria-label="Put your description here."
                                                                className="casino-big-card__title"
                                                            >
                                                                <span className="casino-big-card__title-label">
                                                                    {item?.bonus_info?.bonus_name}
                                                                </span>
                                                            </Link>
                                                            {isShowPlayButton && (
                                                                <a
                                                                    href={cloacingLink(item?.casino_info?.casino_name)}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        e.preventDefault()
                                                                        cloacingFetch(item?.casino_info?.casino_affiliate_link)
                                                                        window.open(
                                                                            item?.casino_info?.casino_affiliate_link ||
                                                                                item?.casino_info?.url_casino,
                                                                            '_blank',
                                                                            'noopener,noreferrer',
                                                                        )
                                                                    }}
                                                                    className="casino-big-card__btn "
                                                                >
                                                                    Play
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                </div>
                            </div>
                            <div className="slider__bottom bottom-slider">
                                <div
                                    ref={paginationRef}
                                    className="bottom-slider__pagination slider-best-live-dealer-casinos-gamble__pagination swiper-pagination"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="best-live-dealer-casinos-gamble__body">
                        <div className="best-live-dealer-casinos-gamble__waves">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="best-live-dealer-casinos-gamble__girl">
                            <Image fill src="/img/girls/03.webp" alt="girl" loading="lazy" />
                        </div>
                        <div className="best-live-dealer-casinos-gamble__content">
                            <div className="best-live-dealer-casinos-gamble__title">
                                Bonus from <br />
                                <span>Live Dealers</span>
                            </div>
                            <Link href={'/all-bonuses/best-live-bonuses'} className="best-live-dealer-casinos-gamble__btn ">
                                <span>
                                    <img src="/img/icons/gift.svg" alt="gift" loading="lazy" />
                                </span>
                                Get Bonus
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

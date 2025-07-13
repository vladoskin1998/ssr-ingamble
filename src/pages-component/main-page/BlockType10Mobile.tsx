'use client'

import { DataHomeItemsBlock, HomeDataBlock } from '@/types'
import '../../../styles/style-type-10-11.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import Link from 'next/link'
import { SeeAllRoutes } from '@/context/FilterContext'
import { CURRENTYEAR } from '@/helper'

import { Autoplay } from 'swiper/modules'

import Image from 'next/image'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'

export default function BlockType10Mobile({
    data,
    isAutoPlay = false,
}: {
    data: HomeDataBlock<DataHomeItemsBlock>

    isAutoPlay?: boolean
}) {
    return (
        <div className="main-gamble__best-casinos-2024 best-casinos-2024-gamble">
            <div className="best-casinos-2024-gamble__container container">
                <div className="best-casinos-2024-gamble__top top">
                    <div className="top__row">
                        <div className="top__column">
                            <div className="top__title-block">
                                {data.items_block.title_image && (
                                    <span className="top__title-icon ibg--custom ibg--custom-width-auto">
                                        <Image src={data.items_block.title_image} alt="security" width={400} height={250} />
                                    </span>
                                )}
                                <h2 className="top__title">{data.items_block.block_title}</h2>
                            </div>
                            {data.items_block.subtitle && <div className="top__subtitle">{data.items_block.subtitle}</div>}
                        </div>
                    </div>
                </div>
                <div className="best-casinos-2024-gamble__body">
                    <div className="best-casinos-2024-gamble__bg ibg--custom">
                        <Image width={444} height={444} src="/img/bg/01.webp" alt="bg" loading="lazy" />
                    </div>
                    <div className="best-casinos-2024-gamble__waves">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="best-casinos-2024-gamble__girl">
                        <Image 
                            width={357} 
                            height={440} 
                            src="/img/girls/02.webp" 
                            alt="girl" 
                            loading="lazy"
                            sizes="(max-width: 480px) 170px, (max-width: 1000px) 196px, (max-width: 1355px) 274px, (max-width: 1650px) 300px, 357px"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center bottom'
                            }}
                        />
                    </div>
                    <div className="best-casinos-2024-gamble__slider slider-best-casinos-2024-gamble">
                        <div className="slider-best-casinos-2024-gamble__top top">
                            <div className="top__row">
                                <div className="top__column">
                                    <div className="top__title-block">
                                        <div className="top__title-big">The Best Casinos of {CURRENTYEAR}</div>
                                    </div>
                                </div>
                                <div className="top__column">
                                    <Link
                                        href={`/all-${SeeAllRoutes[data?.items_block?.type_category]}${
                                            data?.items_block?.category?.slug || '/img/no-results.svg' ? `/${data?.items_block?.category?.slug}` : ''
                                        }`}
                                        className="top__btn"
                                        prefetch={false} 
                                    >
                                        <span>See All</span>
                                        <span className="top__btn-arrow">
                                            <svg>
                                                <use xlinkHref="#arrow"></use>
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="slider-best-casinos-2024-gamble__body">
                            <div className="slider-best-casinos-2024-gamble__swiper swiper">
                                <Swiper
                                    speed={1000}
                                    className="slider-best-casinos-2024-gamble__wrapper swiper-wrapper"
                                    modules={[Autoplay]}
                                    autoplay={
                                        isAutoPlay && {
                                            delay: 4000,
                                            disableOnInteraction: false,
                                        }
                                    }
                                    breakpoints={{
                                        320: {
                                            spaceBetween: 16,
                                        },
                                    }}
                                    slidesPerView="auto"
                                >
                                    {data.items_block.data_cards.map((item, index) => (
                                        <SwiperSlide
                                            key={index}
                                            className="slider-best-casinos-2024-gamble__slide slide-slider-best-casinos-2024-gamble swiper-slide"
                                        >
                                            <div className="slide-slider-best-casinos-2024-gamble__item different-casino-medium">
                                                <Link
                                                    rel="nofollow noopener"
                                                    href={`/casino/${item?.casino_info?.casino_slug}`}
                                                    className="different-casino-medium__image-block"
                                                    prefetch={false} 
                                                >
                                                    <span className="different-casino-medium__image ibg--custom">
                                                    <LazyCardImg img={item?.casino_info?.casino_image || ''} />
                                                    </span>
                                                </Link>
                                                <div className="different-casino-medium__content">
                                                    <Link
                                                        rel="nofollow noopener"
                                                        href={`/casino/${item?.casino_info?.casino_slug}`}
                                                        className="different-casino-medium__name"
                                                        prefetch={false} 
                                                    >
                                                        {item?.casino_info?.casino_name}
                                                    </Link>
                                                    <div className="different-casino-medium__rating">
                                                        <span
                                                            style={{ position: 'relative' }}
                                                            className="different-casino-medium__rating-icon"
                                                        >
                                                            <Image src="/img/icons/star.svg" width={12} height={12} alt="star" />
                                                        </span>
                                                        <span className="different-casino-medium__rationg-number">
                                                            {item?.casino_info?.casino_rank}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

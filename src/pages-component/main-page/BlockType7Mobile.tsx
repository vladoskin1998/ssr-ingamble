'use client'

import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/react'
import { DataHomeItemsBlock, HomeDataBlock } from '@/types'
import { SeeAllButton } from './SeeAllButton'

import Link from 'next/link'

import { Autoplay } from 'swiper/modules'
import Image from 'next/image'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'

export default function BlockType7Mobile({
    data,
    isAutoPlay = false,
}: {
    data: HomeDataBlock<DataHomeItemsBlock>

    isAutoPlay?: boolean
}) {
    return (
        <section
            aria-label=" BlockTypeNumber.BlockType7"
            className="main-gamble__crypto-casinos crypto-casinos-gamble main-gamble__different-casino-medium main-gamble__fastest-payout-casinos fastest-payout-casinos-gamble"
        >
            <div className="crypto-casinos-gamble__container container">
                <div className="crypto-casinos-gamble__top top">
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
                        <div className="top__column">
                            <SeeAllButton type_category={data.items_block.type_category} slug={data?.items_block?.category?.slug} />
                        </div>
                    </div>
                </div>
                <div className="crypto-casinos-gamble__slider slider">
                    <div className="slider__body">
                        <div className="crypto-casinos-gamble__swiper slider__swiper swiper">
                            <Swiper
                                speed={1000}
                                className="slider__wrapper swiper-wrapper"
                                slidesPerView="auto"
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
                                    1650.98: {
                                        spaceBetween: 20,
                                    },
                                    1920: {
                                        spaceBetween: 20,
                                    },
                                }}
                            >
                                {data?.items_block?.data_cards
                                    ?.sort((a, b) => a.order - b.order)
                                    ?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="slider__slide slide-slider swiper-slide">
                                                <div className="slide-slider__item different-casino-medium">
                                                    <Link
                                                        href={`/casino/${item?.casino_info?.casino_slug}`}
                                                        className="different-casino-medium__image-block"
                                                        prefetch={false} 
                                                    >
                                                        <span className="different-casino-medium__image ibg--custom">
                                                          <LazyCardImg img={item.casino_info.casino_image || ''} size="medium" />
                                                        </span>
                                                    </Link>
                                                    <div className="different-casino-medium__content">
                                                        <Link
                                                            href={`/casino/${item?.casino_info?.casino_slug}`}
                                                            aria-label="Put your descripton here."
                                                            className="different-casino-medium__name"
                                                            prefetch={false} 
                                                        >
                                                            {item.casino_info.casino_name}
                                                        </Link>
                                                        <div className="different-casino-medium__rating">
                                                            <span
                                                                style={{ position: 'relative' }}
                                                                className="different-casino-medium__rating-icon"
                                                            >
                                                                <Image fill src="/img/icons/star.svg" alt="star" />
                                                            </span>
                                                            <span className="different-casino-medium__rationg-number">
                                                                {item.casino_info.casino_rank}
                                                            </span>
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
            </div>
        </section>
    )
}

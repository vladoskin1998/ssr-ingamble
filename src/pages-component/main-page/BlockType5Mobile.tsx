'use client'

import { useRef, useState } from 'react'

import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import { DataHomeItemsBlock, HomeDataBlock } from '@/types'
import { SeeAllButton } from './SeeAllButton'

import Link from 'next/link'

import { Autoplay } from 'swiper/modules'
import Image from 'next/image'

export default function BlockType5Mobile({
    data,
    isAutoPlay = false,
}: {
    data: HomeDataBlock<DataHomeItemsBlock>

    isAutoPlay?: boolean
}) {
    const sliderRef = useRef<SwiperRef | null>(null)
    const [isScrolled, setIsScrolled] = useState<boolean>(false)

    return (
        <div
            aria-label="BlockTypeNumber.BlockType5.Mobile"
            className="main-gamble__best-casinos-2024 best-casinos-2024-gamble main-gamble__different-casino-medium main-gamble__fastest-payout-casinos fastest-payout-casinos-gamble"
        >
            <div className="best-casinos-2024-gamble__container container">
                <div className="best-casinos-2024-gamble__body">
                    <div className="best-casinos-2024-gamble__bg ibg--custom">
                        <Image width={170} height={210} src="/img/bg/01.webp" alt="bg" loading="lazy" />
                    </div>
                    <div className="best-casinos-2024-gamble__waves">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={`best-casinos-2024-gamble__girl ${isScrolled && 'scrolled'}`}>
                        <Image 
                            width={357} 
                            height={440} 
                            src="/img/girls/01.webp" 
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
                    <div className={`best-casinos-2024-gamble__slider slider-best-casinos-2024-gamble ${isScrolled && 'scrolled'}`}>
                        <div className="slider-best-casinos-2024-gamble__top top">
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
                        <div className="slider-best-casinos-2024-gamble__body">
                            <div className="slider-best-casinos-2024-gamble__swiper swiper">
                                <Swiper
                                    speed={1000}
                                    className="slider-best-casinos-2024-gamble__wrapper swiper-wrapper"
                                    ref={sliderRef}
                                    slidesPerView="auto"
                                    modules={[Autoplay]}
                                    autoplay={
                                        isAutoPlay && {
                                            delay: 4000,
                                            disableOnInteraction: false,
                                        }
                                    }
                                    onSlideChange={(swiper) => {
                                        setIsScrolled(!swiper.isBeginning)
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
                                    {[...data?.items_block.data_cards]
                                        ?.sort((a, b) => a?.order - b?.order)
                                        ?.map((item, index) => (
                                            <SwiperSlide
                                                key={index}
                                                className="slider-best-casinos-2024-gamble__slide slide-slider-best-casinos-2024-gamble swiper-slide"
                                            >
                                                <div className="slide-slider-best-casinos-2024-gamble__item different-casino-medium">
                                                    <Link
                                                        href={`/casino/${item?.casino_info?.casino_slug}`}
                                                        className="different-casino-medium__image-block"
                                                    >
                                                        <span className="different-casino-medium__image ibg--custom">
                                                            <Image
                                                                width={444}
                                                                height={444}
                                                                alt="Casino Image"
                                                                src={item?.casino_info?.casino_image || '/img/no-results.svg'}
                                                            />
                                                        </span>
                                                    </Link>
                                                    <div className="different-casino-medium__content">
                                                        <Link
                                                            href={`/casino/${item?.casino_info?.casino_slug}`}
                                                            aria-label="Put your description here."
                                                            className="different-casino-medium__name"
                                                        >
                                                            {item?.casino_info?.casino_name}
                                                        </Link>
                                                        <div className="different-casino-medium__rating">
                                                            <span
                                                                style={{ position: 'relative' }}
                                                                className="different-casino-medium__rating-icon"
                                                            >
                                                                <Image fill src="/img/icons/star.svg" alt="star" />
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

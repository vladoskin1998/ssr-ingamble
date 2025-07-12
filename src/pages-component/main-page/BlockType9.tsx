'use client'

import { memo } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { EssentialItemsBlock, HomeDataBlock } from '@/types'

import { cloacingFetch, cloacingLink, sanitizeNumberLike } from '@/helper'
import Link from 'next/link'

import { Autoplay } from 'swiper/modules'
import Image from 'next/image'

const BlockType9 = memo(function BlockType9({
    data,
    isAutoPlay = false,
}: {
    data: HomeDataBlock<EssentialItemsBlock>
    isAutoPlay?: boolean
}) {
    return (
        <section
            aria-label="BlockTypeNumber.BlockType9"
            className="simple-bonus__essential-programs essential-programs-gamble essential-programs-gamble_images"
        >
            <div className="essential-programs-gamble__container container">
                <div className="essential-programs-gamble__top top">
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
                            <Link
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
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="essential-programs-gamble__slider slider">
                    <div className="essential-programs-gamble__swiper slider__swiper swiper">
                        <Swiper
                            speed={1000}
                            slidesPerView="auto"
                            allowTouchMove={true}
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
                                1024.98: {
                                    spaceBetween: 20,
                                },
                                1920: {
                                    spaceBetween: 20,
                                },
                            }}
                            className="slider__wrapper swiper-wrapper"
                        >
                            {data.items_block.data_cards?.map((item, index) => {
                                if (!item?.casino_slug) return null;
                                return (
                                <SwiperSlide key={index} className="slider__slide slide-slider ">
                                    <div className="slide-slider__item essential-programs-gamble__item item-essential-programs-gamble">
                                        <div className="item-essential-programs-gamble__top">
                                            <Link
                                                href={`/casino/${item.casino_slug}`}
                                                aria-label="Put your description here."
                                                className="item-essential-programs-gamble__logo"
                                            >
                                                <Image width={444} height={444} alt="Casino Image" src={item.card_logo || ''} />
                                            </Link>
                                        </div>
                                        <div className="item-essential-programs-gamble__body">
                                            <div className="item-essential-programs-gamble__provider">
                                                <span className="item-essential-programs-gamble__provider-name">{item.casino_name}</span>
                                                <span className="item-essential-programs-gamble__provider-rating">
                                                    <span
                                                        style={{ position: 'relative' }}
                                                        className="item-essential-programs-gamble__provider-rating-star"
                                                    >
                                                        <Image fill src="/img/icons/star.svg" alt="star" sizes="20px" />
                                                    </span>
                                                    <span className="item-essential-programs-gamble__provider-rating-number">
                                                        {item.casino_rank}
                                                    </span>
                                                </span>
                                                <div className="info-casino-card__likes">
                                                    <span style={{position:'relative'}} className="info-casino-card__likes-icon">
                                                        <Image fill src="/img/icons/like.svg" alt="like" sizes="20px" />
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
                                                                    {item?.stars?.map((_, idstar) => (
                                                                        <div
                                                                            style={{ position: 'relative' }}
                                                                            key={idstar}
                                                                            className="value-item-stats-essential-programs-gamble__star"
                                                                        >
                                                                            <Image fill src="/img/icons/star.svg" alt="star" sizes="16px" />
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
                                                {item?.keypoints?.map((itp, idk) => (
                                                    <div className="features-essential-programs-gamble__item" key={idk}>
                                                        <div className="features-essential-programs-gamble__icon">
                                                            <Image width={44} height={44} alt="Casino Image" src={itp.image || ''} />
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
                                                >
                                                    Read More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
})

export default BlockType9

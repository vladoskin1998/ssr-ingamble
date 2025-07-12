import { useEffect, useRef, useState } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { RewievCasinoDataResponse } from '@/types'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'
import { cloacingFetch, cloacingLink } from '../../helper'
import Link from 'next/link' 
import { useAdaptiveBehavior } from '../../context/AppContext'

const nameArray = ['Welcome Bonus', 'Cashback bonus']

export const CasinoBonuses = ({ data }: { data: undefined | RewievCasinoDataResponse }) => {

    const {isShowPlayButton} = useAdaptiveBehavior()
    const sliderRef = useRef<SwiperRef | null>(null)
    const paginationRef = useRef<HTMLDivElement | null>(null)

    const [countPageSize, setCountPageSize] = useState(15)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCountPageSize(window.innerWidth < 900 ? 8 : 15)
        }
    }, [])

    const [active, setActive] = useState<string>('review-iwild-casino-bonuses')

    useEffect(() => {
        if (sliderRef.current && paginationRef.current) {
            const swiper = sliderRef.current.swiper
            if (swiper && paginationRef.current) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                swiper.params.pagination.el = paginationRef.current
                swiper.pagination.init()
                swiper.pagination.render()
                swiper.pagination.update()
            }
        }
    }, [])

    const scrollToElement = (id: string) => {
        setActive(id)
        const element = document.querySelector(`#${id}`)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="review__iwild-casino-bonuses iwild-casino-bonuses">
            <div className="iwild-casino-bonuses__tabs tabs">
                <div className="tabs__container container">
                    <div className="tabs__slider">
                        <div className="tabs__swiper iwild-casino-bonuses-tabs__swiper swiper">
                            <Swiper
                                className="tabs__wrapper swiper-wrapper"
                                slidesPerView="auto"
                                spaceBetween={40}
                                breakpoints={{
                                    320: { spaceBetween: 24 },
                                    480.98: { spaceBetween: 40 },
                                    1920: { spaceBetween: 40 },
                                }}
                            >
                                <SwiperSlide className="tabs__slide slide-tabs swiper-slide">
                                    <button className={`slide-tabs__btn link-scroll ${active === 'review-iwild-casino-bonuses' && 'active'}`} onClick={() => scrollToElement('review-iwild-casino-bonuses')}>
                                        Bonuses
                                    </button>
                                </SwiperSlide>
                                <SwiperSlide className="tabs__slide slide-tabs swiper-slide">
                                    <button className={`slide-tabs__btn link-scroll ${active === 'review-general-information' && 'active'}`} onClick={() => scrollToElement('review-general-information')}>
                                        Keypoints
                                    </button>
                                </SwiperSlide>
                                {/* <SwiperSlide className="tabs__slide slide-tabs swiper-slide">
                                    <button
                                        className={`slide-tabs__btn link-scroll ${active === "review-iwild-casino-special-promo" && "active"}`}
                                     
                                        onClick={() => scrollToElement("review-iwild-casino-special-promo")}
                                    >
                                        Special Promo
                                    </button>
                                </SwiperSlide> */}
                                <SwiperSlide className="tabs__slide slide-tabs swiper-slide">
                                    <button className={`slide-tabs__btn link-scroll  ${active === 'review-iwild-casino-review' && 'active'}`} onClick={() => scrollToElement('review-iwild-casino-review')}>
                                        Casino Review
                                    </button>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            <div className="iwild-casino-bonuses__container container" id="review-iwild-casino-bonuses">
                <div className="iwild-casino-bonuses__top top">
                    <div className="top__row">
                        <div className="top__column">
                            <div className="top__title-block">
                                <h2 className="top__title">{data?.name} Bonuses</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="iwild-casino-bonuses__slider slider">
                    <div className="slider__body">
                        <div className="iwild-casino-bonuses__swiper slider__swiper swiper">
                            <Swiper
                                slidesPerView="auto"
                                
                                ref={sliderRef}
                                pagination={{
                                    el: paginationRef.current,
                                    clickable: true,
                                }}
                                modules={[Pagination]}
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
                                {data?.bonuses
                                    ?.sort((a, b) => {
                                        const aIndex = nameArray.indexOf(a.bonus_type?.name || '')
                                        const bIndex = nameArray.indexOf(b.bonus_type?.name || '')

                                        if (aIndex !== -1 && bIndex !== -1) {
                                            return aIndex - bIndex
                                        }

                                        if (aIndex !== -1) return -1
                                        if (bIndex !== -1) return 1

                                        return 0
                                    })
                                    .map((b) => (
                                        <SwiperSlide 
                                          className="slider__slide slide-slider swiper-slide" 
                                          aria-label="Bonus card"
                                          key={b?.bonus_slug || b?.id}
                                        >
                                            <div className="slide-slider__item casino-card">
                                                <div className="casino-card__image-block casino-card__image-block_yellow">
                                                    <Link 
                                                        className="casino-card__image ibg--custom" 
                                                        href={
                                                            b.special_side_bar 
                                                                ? data?.url || '#' 
                                                                : data?.casino_slug && b?.bonus_slug 
                                                                    ? `/casino/${data.casino_slug}/bonuses/${b.bonus_slug}`
                                                                    : '#'
                                                        }
                                                    >
                                                        <LazyCardImg img={b?.bonus_image || ''} height="100%" width="100%" imgLoading={'lazy'} />
                                                    </Link>
                                                    {isShowPlayButton && (
                                                        <a
                                                            href={cloacingLink(data?.name)}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                cloacingFetch(data?.casino_affiliate_link)
                                                                window.open(data?.casino_affiliate_link || data?.url, '_blank', 'noopener,noreferrer')
                                                            }}
                                                            aria-label="Play bonus link"
                                                            className="casino-card__bnt"
                                                        >
                                                            Play
                                                        </a>
                                                    )}
                                                </div>
                                                <Link 
                                                    className="casino-card__content" 
                                                    href={
                                                        b.special_side_bar 
                                                            ? data?.url || '#' 
                                                            : data?.casino_slug && b?.bonus_slug 
                                                                ? `/casino/${data.casino_slug}/bonuses/${b.bonus_slug}`
                                                                : '#'
                                                    }
                                                >
                                                    <div
                                                        className="casino-card__name"
                                                        dangerouslySetInnerHTML={{
                                                            __html: b.name.replace(/([+-]?\s?\€?\$?\d+(\.\d+)?[%,$€&!*#@^+-]?)/g, '<span>$1</span>'),
                                                        }}
                                                    >
                                                        {/*                                                 
                                                  
                                                Great Bonus Up{" "}
                                                <span>To 360%</span> For Evening */}
                                                    </div>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="slider__bottom bottom-slider">
                        <div ref={paginationRef} className="bottom-slider__pagination iwild-casino-bonuses__pagination swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

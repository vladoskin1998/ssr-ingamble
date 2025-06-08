//@ts-ignore



import React, { useEffect, useRef } from 'react'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { SwiperRef } from 'swiper/react'

import { cloacingFetch, cloacingLink, sanitizeNumberLike } from '../../helper'

import { useAdaptiveBehavior } from '../../context/AppContext'
import { Autoplay } from 'swiper/modules'
import { useRouter } from 'next/compat/router'
import Link from 'next/link'
import Image from 'next/image'
import ItemMainSlider from './MainSliderItem'

const MainSlider = ({
    data,
    isAutoPlay = false,
}: {
    data?: {
        img: string | null
        casinoName: string
        bonuseName?: string
        raiting: string | number
        likes: string | number
        tags?: React.ReactNode
        imageLink?: string
        playLink?: string
        casinoLink?: string
        bonuseLink?: string
    }[]
    isAutoPlay?: boolean
}) => {
    const sliderRef = useRef<SwiperRef | null>(null)
    const paginationRef = useRef<HTMLDivElement | null>(null)

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

    const router = useRouter()

    const navToImageLink = (e: React.MouseEvent, l: string) => {
        e.preventDefault()
        router?.push(l)
    }

    const { isShowPlayButton } = useAdaptiveBehavior()
    return (
        <div className="more-staket-simple-bonus__slider slider">
            <div className="slider__body">
                <div className="more-staket-simple-bonus__swiper slider__swiper swiper">
                    <div className="slider__wrapper">
                        <Swiper
                            lazyPreloadPrevNext={1}
                            slidesPerView="auto"
                            ref={sliderRef}
                            pagination={{
                                el: paginationRef.current,
                                clickable: true,
                            }}
                            modules={[Pagination, Autoplay]}
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
                            speed={1000}
                        >
                            {data?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <ItemMainSlider index={index} item={item} isShowPlayButton={isShowPlayButton} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className="slider__bottom bottom-slider">
                <div
                    ref={paginationRef}
                    className="bottom-slider__pagination more-staket-simple-bonus__pagination swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"
                ></div>
            </div>
        </div>
    )
}

export default MainSlider

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

export const SpecialPromo = () => {
    const sliderRef = useRef<SwiperRef | null>(null)
    const paginationRef = useRef<HTMLDivElement | null>(null)
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
    return (
        <section className="review__iwild-casino-promo iwild-casino-promo iwild-casino-promo_mob" id="review-iwild-casino-special-promo">
            <div className="iwild-casino-promo__container container">
                <div className="iwild-casino-promo__top top">
                    <div className="top__row">
                        <div className="top__column">
                            <div className="top__title-block">
                                <h2 className="top__title">iWildCasino Special Promo</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="iwild-casino-promo__slider slider">
                    <div className="slider__body">
                        <div className="iwild-casino-promo-mob__swiper slider__swiper swiper">
                            <Swiper
                                slidesPerView="auto"
                                className="slider__wrapper swiper-wrapper"
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
                                <SwiperSlide className="slider__slide slide-slider swiper-slide">
                                    <div className="slide-slider__item casino-card">
                                        <div className="casino-card__image-block">
                                            <div className="casino-card__image ibg--custom">
                                                <Image src="/src/assets/img/casino-cards/15.jpg" alt="Special 10,000,000$ Tournament" width={350} height={197} />
                                            </div>
                                            <a href="https://www.youtube.com/watch?v=IBcwhaYP6Uk" data-fancybox="gallery-1" data-caption="Caption" className="casino-card__btn-play"></a>
                                        </div>
                                        <div className="casino-card__content">
                                            <a href="" aria-label="Put your description here." target="_blank" className="casino-card__name">
                                                Special 10,000,000$ Tournament
                                            </a>
                                            <div className="casino-card__text">
                                                <p>This week iWild Casino offers special tournament for their vip players. You can win 10,000,000. Offer is available for 7 days. You need just deposit 10 EUR and play.</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="slider__slide slide-slider swiper-slide">
                                    <div className="slide-slider__item casino-card">
                                        <div className="casino-card__image-block">
                                            <div className="casino-card__image ibg--custom">
                                                <Image src="/src/assets/img/casino-cards/16.jpg" alt="5,000,000$ Bonus Racing" width={350} height={197} />
                                            </div>
                                            <a href="https://www.youtube.com/watch?v=AKeUssuu3Is" data-fancybox="gallery-2" data-caption="Caption" className="casino-card__btn-play"></a>
                                        </div>
                                        <div className="casino-card__content">
                                            <a href="" aria-label="Put your description here." target="_blank" className="casino-card__name">
                                                5,000,000$ Bonus Racing
                                            </a>
                                            <div className="casino-card__text">
                                                <p>This week iWild Casino offers special tournament for their vip players. You can win 10,000,000. Offer is available for 7 days.</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="slider__slide slide-slider swiper-slide">
                                    <div className="slide-slider__item casino-card">
                                        <div className="casino-card__image-block">
                                            <div className="casino-card__image ibg--custom">
                                                <Image src="/src/assets/img/casino-cards/15.jpg" alt="Special 10,000,000$ Tournament" width={350} height={197} />
                                            </div>
                                            <a href="https://www.youtube.com/watch?v=IBcwhaYP6Uk" data-fancybox="gallery-3" data-caption="Caption" className="casino-card__btn-play"></a>
                                        </div>
                                        <div className="casino-card__content">
                                            <a href="" aria-label="Put your description here." target="_blank" className="casino-card__name">
                                                Special 10,000,000$ Tournament
                                            </a>
                                            <div className="casino-card__text">
                                                <p>This week iWild Casino offers special tournament for their vip players. You can win 10,000,000. Offer is available for 7 days. You need just deposit 10 EUR and play.</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="slider__slide slide-slider swiper-slide">
                                    <div className="slide-slider__item casino-card">
                                        <div className="casino-card__image-block">
                                            <div className="casino-card__image ibg--custom">
                                                <Image src="/src/assets/img/casino-cards/16.jpg" alt="5,000,000$ Bonus Racing" width={350} height={197} />
                                            </div>
                                            <a href="https://www.youtube.com/watch?v=AKeUssuu3Is" data-fancybox="gallery-4" data-caption="Caption" className="casino-card__btn-play"></a>
                                        </div>
                                        <div className="casino-card__content">
                                            <a href="" aria-label="Put your description here." target="_blank" className="casino-card__name">
                                                5,000,000$ Bonus Racing
                                            </a>
                                            <div className="casino-card__text">
                                                <p>This week iWild Casino offers special tournament for their vip players. You can win 10,000,000. Offer is available for 7 days.</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="slider__slide slide-slider swiper-slide">
                                    <div className="slide-slider__item casino-card">
                                        <div className="casino-card__image-block">
                                            <div className="casino-card__image ibg--custom">
                                                <Image src="/src/assets/img/casino-cards/15.jpg" alt="Special 10,000,000$ Tournament" width={350} height={197} />
                                            </div>
                                            <a href="https://www.youtube.com/watch?v=IBcwhaYP6Uk" data-fancybox="gallery-5" data-caption="Caption" className="casino-card__btn-play"></a>
                                        </div>
                                        <div className="casino-card__content">
                                            <a href="" aria-label="Put your description here." target="_blank" className="casino-card__name">
                                                Special 10,000,000$ Tournament
                                            </a>
                                            <div className="casino-card__text">
                                                <p>This week iWild Casino offers special tournament for their vip players. You can win 10,000,000. Offer is available for 7 days. You need just deposit 10 EUR and play.</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="slider__slide slide-slider swiper-slide">
                                    <div className="slide-slider__item casino-card">
                                        <div className="casino-card__image-block">
                                            <div className="casino-card__image ibg--custom">
                                                <Image src="/src/assets/img/casino-cards/16.jpg" alt="5,000,000$ Bonus Racing" width={350} height={197} />
                                            </div>
                                            <a href="https://www.youtube.com/watch?v=AKeUssuu3Is" data-fancybox="gallery-6" data-caption="Caption" className="casino-card__btn-play"></a>
                                        </div>
                                        <div className="casino-card__content">
                                            <a href="" aria-label="Put your description here." target="_blank" className="casino-card__name">
                                                5,000,000$ Bonus Racing
                                            </a>
                                            <div className="casino-card__text">
                                                <p>This week iWild Casino offers special tournament for their vip players. You can win 10,000,000. Offer is available for 7 days.</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                    <div className="slider__bottom bottom-slider">
                        <div ref={paginationRef} className="bottom-slider__pagination iwild-casino-promo-mob__pagination swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

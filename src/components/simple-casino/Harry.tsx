import { RewievCasinoDataResponse } from '../../types'
import { CasinoReview } from './CasinoReview'
import { useEffect, useState } from 'react'
import { getLikeByIdAndType, sanitizeNumberLike, saveLikesToStorage } from '../../helper'
import Image from 'next/image'
const DoYouLike = ({ likes: DataLike, id }: { likes: number; id: number | undefined }) => {
    const [like, setLike] = useState<'' | 'like' | 'dislike'>('')

    useEffect(() => {
        if (!id) {
            return
        }
        const lk = getLikeByIdAndType('casino_like', id) || ''
        setLike(lk)
    }, [id])

    const handlerLike = (l: '' | 'like' | 'dislike', id?: number) => {
        if (!id) {
            return
        }

        setLike((s) => (s === l ? '' : l))
        saveLikesToStorage('casino_like', id, l)
    }

    return (
        <div className="iwild-review__item item-iwild-review item-iwild-review_like-bonus">
            <h2 className="item-iwild-review__title">Do You Like This Casino?</h2>
            <div className="item-iwild-review__btns">
                <div className="item-iwild-review__btns-item">
                    <button aria-label="Put your description here." className={`item-iwild-review__btn item-iwild-review__btn_like  ${like === 'like' && 'active'}`} onClick={() => handlerLike('like', id)}>
                        <span className="item-iwild-review__btn-icon">
                            <svg>
                                <use xlinkHref="#like"></use>
                            </svg>
                        </span>
                        <span className="item-iwild-review__btn-number">{sanitizeNumberLike(DataLike + (like === 'like' ? 1 : 0))}</span>
                    </button>
                </div>
                <div className="item-iwild-review__btns-item">
                    <button aria-label="Put your description here." className={`item-iwild-review__btn item-iwild-review__btn_dislike ${like === 'dislike' && 'active'}`} onClick={() => handlerLike('dislike', id)}>
                        <span className="item-iwild-review__btn-icon">
                            <svg>
                                <use xlinkHref="#like"></use>
                            </svg>
                        </span>
                        <span className="item-iwild-review__btn-number"></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export const Harry = ({ handlerOpen, data }: { handlerOpen: (s: boolean) => void; data: undefined | RewievCasinoDataResponse }) => {
    return (
        <>
            <section className="review__iwild-review-mob iwild-review-mob">
                <div className="iwild-review-mob__container container"></div>
            </section>

            <section className="review__iwild-review iwild-review">
                <div className="iwild-review__container container">
                    <div className="iwild-review__row iwild-review__row_1">
                        <div className="iwild-review__column iwild-review__column_medium iwild-review__harytitle" data-da="iwild-review-mob__container, 0, 1150">
                            <CasinoReview handlerOpen={handlerOpen} data={data} />
                        </div>

                        <div className="iwild-review__column iwild-review__column_medium">
                            <div className="iwild-review__item item-iwild-review item-iwild-review_author" style={{ justifyContent: 'center' }}>
                                <div className="item-iwild-review__content content-item-iwild-review">
                                    <div className="content-item-iwild-review__image">
                                        <Image src="/img/casino-person/3.webp" alt="HARRY STYLES" width={105} height={105} />
                                    </div>
                                    <div className="content-item-iwild-review__body">
                                        <div className="content-item-iwild-review__label">Author</div>
                                        <div className="content-item-iwild-review__name">MAREK PROCHAZKA</div>
                                        <div className="content-item-iwild-review__text">
                                            <p>
                                                Content Maker, Crypto & Gambling Enthusiast
                                                {/* Marketing @Coinmooner. Current
                                                learning project: USA.
                                                <br />I also summarise books on
                                                my <span>personal blog</span>. */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="item-iwild-review__socials">
                                    <div className="socials-top-footer__items">
                                        <div className="socials-top-footer__item">
                                            <a
                                                href=""
                                                aria-label="Put your description here."
                                                target="_blank"
                                                className="socials-top-footer__link"
                                            >
                                                <svg>
                                                    <use xlinkHref="#x"></use>
                                                </svg>
                                            </a>
                                        </div>
                                        <div className="socials-top-footer__item">
                                            <a
                                                href=""
                                                aria-label="Put your description here."
                                                target="_blank"
                                                className="socials-top-footer__link"
                                            >
                                                <svg>
                                                    <use xlinkHref="#facebook"></use>
                                                </svg>
                                            </a>
                                        </div>
                                        <div className="socials-top-footer__item">
                                            <a
                                                href=""
                                                aria-label="Put your description here."
                                                target="_blank"
                                                className="socials-top-footer__link"
                                            >
                                                <svg>
                                                    <use xlinkHref="#linkedin"></use>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="iwild-review__column iwild-review__column_small iwild-review__do-you-like-mob">
                            <DoYouLike likes={data?.likes || 0} id={data?.id} />
                        </div>
                    </div>
                    <h2 className="iwild-review__title-mob">Summary</h2>
                    <div className="iwild-review__row iwild-review__row_2">
                        <div className="iwild-review__column iwild-review__column_small">
                            <div className="iwild-review__item item-iwild-review item-iwild-review_like">
                                <div className="item-iwild-review__bg"></div>
                                <div className="item-iwild-review__body">
                                    <h3 className="item-iwild-review__title">What we like:</h3>
                                    <ul className="item-iwild-review__list">
                                        {data?.what_we_like?.split('\r\n').map((item) => (
                                            <li 
                                              className="item-iwild-review__list-item"
                                              key={item} // Ensure each item has a unique key
                                            >{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="iwild-review__column iwild-review__column_small">
                            <div className="iwild-review__item item-iwild-review item-iwild-review_dont-like">
                                <div className="item-iwild-review__bg"></div>
                                <div className="item-iwild-review__body">
                                    <h3 className="item-iwild-review__title">What we don’t like:</h3>
                                    <ul className="item-iwild-review__list">
                                        {data?.what_we_dont_like?.split('\r\n').map((item) => (
                                            <li 
                                              className="item-iwild-review__list-item"
                                              key={item} // Ensure each item has a unique key
                                            >{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="iwild-review__column iwild-review__column_small iwild-review__do-you-like-pc">
                            <DoYouLike likes={data?.likes || 0} id={data?.id} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

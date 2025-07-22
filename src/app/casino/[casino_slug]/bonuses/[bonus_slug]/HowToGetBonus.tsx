import { GetDataBonusResponse } from '@/types'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cloacingFetch, getLikeByIdAndType, sanitizeNumberLike, saveLikesToStorage } from '@/helper'
import { useSafeCloacingLink } from '@/hooks/useSafeCloacingLink'
import Image from 'next/image'

export const HowToGetBonus = ({ data }: { data: GetDataBonusResponse | undefined }) => {
    const [like, setLike] = useState<'' | 'like' | 'dislike'>('')
    const safeCloacingHref = useSafeCloacingLink(data?.casino_name)

    useEffect(() => {
        if (!data?.id) {
            return
        }
        const lk = getLikeByIdAndType('bonus_like', data?.id) || ''
        setLike(lk)
    }, [data?.id])

    const handlerLike = (l: '' | 'like' | 'dislike', id?: number) => {
        if (!id) {
            return
        }

        setLike((s) => (s === l ? '' : l))
        saveLikesToStorage('bonus_like', id, l)
    }

    return (
        <section className="simple-bonus__get-bonus get-bonus">
            <div className="get-bonus__container container">
                <div className="get-bonus__body">
                    <div className="get-bonus__bg ibg--custom">
                        <Image src="/img/bg/08.webp" alt="bg" width={1920} height={1080} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="get-bonus__row">
                        <div className="get-bonus__main main-get-bonus">
                            <div className="main-get-bonus__icon">
                                <svg>
                                    <use xlinkHref="#gift"></use>
                                </svg>
                            </div>
                            <div className="main-get-bonus__content">
                                <h2 className="main-get-bonus__title">How to get Bonus?</h2>
                                <div className="main-get-bonus__text">Bonus is activated after first deposit</div>
                                <div className="main-get-bonus__btns">
                                    <div className="main-get-bonus__btns-item">
                                        <a
                                            href={safeCloacingHref}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                e.preventDefault()
                                                cloacingFetch(data?.casino_affiliate_link)
                                                window.open(data?.casino_affiliate_link || data?.url_casino, '_blank', 'noopener,noreferrer')
                                            }}
                                            className="main-get-bonus__btn main-get-bonus__btn_bonus"
                                        >
                                            <span>
                                                <Image src="/img/icons/gift.svg" alt="gift" width={20} height={20} />
                                            </span>
                                            Get Bonus
                                        </a>
                                    </div>
                                    <div className="main-get-bonus__btns-item">
                                        <Link
                                            rel="nofollow noopener"
                                            href={`/casino/${data?.casino_slug}`}
                                            aria-label="Put your description here."
                                            className="main-get-bonus__btn main-get-bonus__btn_review"
                                            prefetch={false} // отключаем предзагрузку для мобильных
                                        >
                                            <span>
                                                <svg>
                                                    <use xlinkHref="#review"></use>
                                                </svg>
                                            </span>
                                            {data?.casino_name.replace(/casino/i, '')} Casino Review
                                        </Link>
                                    </div>
                                    <div className="main-get-bonus__btns-item">
                                        <a
                                            rel="nofollow noopener"
                                            // href={data?.link_tc || ''}
                                            aria-label="Put your description here."
                                            target="_blank"
                                            className="main-get-bonus__btn main-get-bonus__btn_apply"
                                        >
                                            T&C Apply
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="get-bonus__like like-get-bonus">
                            <div className="like-get-bonus__body">
                                <div className="like-get-bonus__title">Do You Like This Bonus?</div>
                                <div className="like-get-bonus__btns">
                                    <div className="like-get-bonus__btns-item">
                                        <button onClick={() => handlerLike('like', data?.id)} className={`like-get-bonus__btn like-get-bonus__btn_like ${like === 'like' && 'active'}`}>
                                            <span className="like-get-bonus__btn-icon">
                                                <svg>
                                                    <use xlinkHref="#like"></use>
                                                </svg>
                                            </span>
                                            <span className="like-get-bonus__btn-number">{sanitizeNumberLike((data?.likes ?? 0) + (like === 'like' ? 1 : 0))}</span>
                                        </button>
                                    </div>
                                    <div className="like-get-bonus__btns-item">
                                        <button onClick={() => handlerLike('dislike', data?.id)} className={`like-get-bonus__btn like-get-bonus__btn_dislike ${like === 'dislike' && 'active'}`}>
                                            <span className="like-get-bonus__btn-icon">
                                                <svg>
                                                    <use xlinkHref="#like"></use>
                                                </svg>
                                            </span>
                                            <span className="like-get-bonus__btn-number"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

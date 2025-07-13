import { cloacingFetch, cloacingLink, sanitizeNumberLike } from '@/helper'

import { useAdaptiveBehavior } from '@/context/AppContext'

// ✅ ЗМІНА: Замінено next/compat/router на next/navigation для App Router
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { LazyCardImg } from '../lazy-img/LazyCardImg'

const ItemMainSlider = ({
    item,
    isShowPlayButton,
    index = 0,
}: {
    item: {
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
    }
    isShowPlayButton: boolean
    index?: number
}) => {
    const router = useRouter()

    const navToImageLink = (e: React.MouseEvent, l: string) => {
        e.preventDefault()
        router?.push(l)
    }

    const {} = useAdaptiveBehavior()
    return (
        <div className="slide-slider__item casino-card">
            <div className="casino-card__image-block">
                <Link
                    href={item?.imageLink || '/'}
                    onClick={(e) => navToImageLink(e, item?.imageLink || '')}
                    aria-label="Put your description here."
                    className="casino-card__image"
                >
                    <LazyCardImg img={item.img || ''} width="100%" height="100%" />
                </Link>
                {isShowPlayButton && (
                    <a
                        rel="nofollow noopener"
                        href={cloacingLink(item.casinoName)}
                        target="_blank"
                        aria-label="Put your description here."
                        className="casino-card__bnt"
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            cloacingFetch(item.playLink)
                            window.open(item.playLink, '_blank', 'noopener,noreferrer')
                        }}
                    >
                        Play
                    </a>
                )}
            </div>
            {item?.tags && <div className="casino-card__tags tags-casino-card">{item.tags}</div>}
            <div className="casino-card__content">
                <div className="casino-card__info info-casino-card">
                    <div className="info-casino-card__stake">
                        <Link
                            rel="nofollow noopener"
                            href={item?.casinoLink ? item?.casinoLink : '#'}
                            aria-label="Put your description here."
                            className="info-casino-card__stake-link"
                        >
                            {item.casinoName}
                        </Link>
                        <div className="info-casino-card__stake-rating">
                            <span
                                style={{ position: 'relative' }}
                                className="info-casino-card__stake-rating-icon casino-small-card__rating-icon"
                            >
                                <Image fill src="/img/icons/star.svg" alt="star" sizes="16px" />
                            </span>
                            <span>{item.raiting}</span>
                        </div>
                    </div>
                    <div className="info-casino-card__likes">
                        <span style={{ position: 'relative' }} className="info-casino-card__likes-icon">
                            <Image fill src="/img/icons/like.svg" alt="like" sizes="16px" />
                        </span>
                        <span className="info-casino-card__likes-number">{sanitizeNumberLike(item?.likes || 0)}</span>
                    </div>
                </div>

                <Link
                    rel="nofollow noopener"
                    href={item?.bonuseLink ? item?.bonuseLink : '#'}
                    aria-label="Put your description here."
                    className="casino-card__name"
                >
                    {item?.bonuseName}
                </Link>
            </div>
        </div>
    )
}

export default ItemMainSlider

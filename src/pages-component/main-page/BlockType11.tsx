'use client'

import { DataHomeItemsBlock, HomeDataBlock } from '@/types'
import '../../../styles/style-type-10-11.css'

import Link from 'next/link'
import { LoadingLink } from '@/components/LoadingLink'
import { cloacingFetch, cloacingLink } from '@/helper'
import { useAdaptiveBehavior } from '@/context/AppContext'
import { initialCasinoFilters, useFilterContext } from '@/context/FilterContext'
import Image from 'next/image'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'

export default function BlockType11({
    data,
}: {
    data: HomeDataBlock<DataHomeItemsBlock>

    isAutoPlay?: boolean
}) {
    const arr1 = data.items_block.data_cards.slice(0, 6)
    const arr2 = data.items_block.data_cards.slice(6, 12)

    const { isShowPlayButton } = useAdaptiveBehavior()
    const { setCasinoFilters } = useFilterContext()

    return (
        <section className="main-gamble__top-bonuses top-bonuses-gamble">
            <div className="top-bonuses-gamble__container container">
                <div className="top-bonuses-gamble__row">
                    <div className="top-bonuses-gamble__column">
                        <div className="top-bonuses-gamble__block">
                            <div className="top-bonuses-gamble__top top">
                                <div className="top__row">
                                    <div className="top__column">
                                        <div className="top__title-block">
                                            <h2 className="top__title"> Top Ranked Casinos </h2>
                                        </div>
                                    </div>
                                    <div className="top__column">
                                        <Link
                                            href={`/filter-casinos`}
                                            onClick={() => {
                                                setCasinoFilters({ ...initialCasinoFilters, casino_rank: { min: 8.5, max: 10 } })
                                            }}
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
                            <div className="top-bonuses-gamble__body">
                                {arr1.map((item, index) => (
                                    <div className="top-bonuses-gamble__deposit deposit-top-bonuses-gamble" key={index}>
                                        <Link
                                            href={`/casino/${item?.casino_info?.casino_slug}`}
                                            className="deposit-top-bonuses-gamble__image-block"
                                        >
                                            <span className="deposit-top-bonuses-gamble__image ibg--custom">
                                            <LazyCardImg img={item?.casino_info?.casino_image || ''} width="auto" />
                                            </span>
                                        </Link>
                                        <div className="deposit-top-bonuses-gamble__body">
                                            <div className="deposit-top-bonuses-gamble__main">
                                                <Link
                                                    href={`/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`}
                                                    className="deposit-top-bonuses-gamble__title"
                                                >
                                                    {item?.bonus_info?.bonus_name}
                                                </Link>
                                                <div className="deposit-top-bonuses-gamble__stake">
                                                    <Link
                                                        href={`/casino/${item?.casino_info?.casino_slug}`}
                                                        aria-label="Put your description here."
                                                        className="deposit-top-bonuses-gamble__stake-link"
                                                    >
                                                        {item?.casino_info?.casino_name}
                                                    </Link>
                                                    <span
                                                        style={{ position: 'relative' }}
                                                        className="deposit-top-bonuses-gamble__stake-icon"
                                                    >
                                                        <Image src="/img/icons/star.svg" width={12} height={12} alt="star" />
                                                    </span>
                                                    <span className="deposit-top-bonuses-gamble__stake-number">
                                                        {item?.casino_info?.casino_rank}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="deposit-top-bonuses-gamble__info info-deposit-top-bonuses-gamble">
                                                <div className="info-deposit-top-bonuses-gamble__row">
                                                    <div className="info-deposit-top-bonuses-gamble__column">
                                                        <div className="info-deposit-top-bonuses-gamble__icon">
                                                            <Image src="/img/icons/deposit-icon.svg" alt="deposit-icon" width={24} height={24} />
                                                        </div>
                                                        <div className="info-deposit-top-bonuses-gamble__text">{`WR: ${
                                                            typeof item?.bonus_info?.wr === 'number' ? item?.bonus_info.wr + 'X' : '-'
                                                        }`}</div>
                                                    </div>
                                                    <div className="info-deposit-top-bonuses-gamble__column">
                                                        <div className="info-deposit-top-bonuses-gamble__label">Min Dep:</div>
                                                        <div className="info-deposit-top-bonuses-gamble__value">
                                                            {typeof item?.bonus_info?.bonus_min_dep?.[0]?.min_value === 'number'
                                                                ? '$' + item?.bonus_info?.bonus_min_dep?.[0]?.min_value
                                                                : '-'}
                                                        </div>
                                                    </div>
                                                </div>
                                                {isShowPlayButton && (
                                                    <a
                                                        href={cloacingLink(item?.casino_info?.casino_name)}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            e.preventDefault()
                                                            cloacingFetch(item?.casino_info?.casino_affiliate_link)
                                                            window.open(
                                                                item?.casino_info?.casino_affiliate_link,
                                                                '_blank',
                                                                'noopener,noreferrer',
                                                            )
                                                        }}
                                                        className="deposit-top-bonuses-gamble__btn"
                                                    >
                                                        Play
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="top-bonuses-gamble__column">
                        <div className="top-bonuses-gamble__block">
                            <div className="top-bonuses-gamble__top top">
                                <div className="top__row">
                                    <div className="top__column">
                                        <div className="top__title-block">
                                            <h2 className="top__title">Best Crypto Casinos</h2>
                                        </div>
                                    </div>
                                    <div className="top__column">
                                        <LoadingLink href={`/all-casinos/best-payid-casinos`} className="top__btn">
                                            <span>See All</span>
                                            <span className="top__btn-arrow">
                                                <svg>
                                                    <use xlinkHref="#arrow"></use>
                                                </svg>
                                            </span>
                                        </LoadingLink>
                                    </div>
                                </div>
                            </div>
                            <div className="top-bonuses-gamble__body">
                                {arr2.map((item, index) => (
                                    <div key={index + 10} className="top-bonuses-gamble__deposit deposit-top-bonuses-gamble">
                                        <Link
                                            href={`/casino/${item?.casino_info?.casino_slug}`}
                                            className="deposit-top-bonuses-gamble__image-block"
                                        >
                                            <span className="deposit-top-bonuses-gamble__image ibg--custom">
                                            <LazyCardImg img={item?.casino_info?.casino_image || ''} width="auto" />
                                            </span>
                                        </Link>
                                        <div className="deposit-top-bonuses-gamble__body">
                                            <div className="deposit-top-bonuses-gamble__main">
                                                <Link
                                                    href={`/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`}
                                                    className="deposit-top-bonuses-gamble__title"
                                                >
                                                    {item?.bonus_info?.bonus_name}
                                                </Link>
                                                <div className="deposit-top-bonuses-gamble__stake">
                                                    <Link
                                                        href={`/casino/${item?.casino_info?.casino_slug}`}
                                                        className="deposit-top-bonuses-gamble__stake-link"
                                                    >
                                                        {item.casino_info.casino_name}
                                                    </Link>
                                                    <span
                                                        style={{ position: 'relative' }}
                                                        className="deposit-top-bonuses-gamble__stake-icon"
                                                    >
                                                        <Image src="/img/icons/star.svg" width={12} height={12} alt="star" />
                                                    </span>
                                                    <span className="deposit-top-bonuses-gamble__stake-number">
                                                        {item.casino_info.casino_rank}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="deposit-top-bonuses-gamble__info info-deposit-top-bonuses-gamble">
                                                <div className="info-deposit-top-bonuses-gamble__row">
                                                    <div className="info-deposit-top-bonuses-gamble__column">
                                                        <div className="info-deposit-top-bonuses-gamble__icon">
                                                            <Image src="/img/icons/deposit-icon.svg" alt="deposit-icon" width={24} height={24} />
                                                        </div>
                                                        <div className="info-deposit-top-bonuses-gamble__text">{`WR: ${
                                                            typeof item?.bonus_info?.wr === 'number' ? item?.bonus_info.wr + 'X' : '-'
                                                        }`}</div>
                                                    </div>
                                                    <div className="info-deposit-top-bonuses-gamble__column">
                                                        <div className="info-deposit-top-bonuses-gamble__label">Min Dep:</div>
                                                        <div className="info-deposit-top-bonuses-gamble__value">
                                                            {typeof item?.bonus_info?.bonus_min_dep?.[0]?.min_value === 'number'
                                                                ? '$' + item?.bonus_info?.bonus_min_dep?.[0]?.min_value
                                                                : '-'}
                                                        </div>
                                                    </div>
                                                </div>
                                                {isShowPlayButton && (
                                                    <a
                                                        href={cloacingLink(item?.casino_info?.casino_name)}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            e.preventDefault()
                                                            cloacingFetch(item?.casino_info?.casino_affiliate_link)
                                                            window.open(
                                                                item?.casino_info?.casino_affiliate_link,
                                                                '_blank',
                                                                'noopener,noreferrer',
                                                            )
                                                        }}
                                                        className="deposit-top-bonuses-gamble__btn"
                                                    >
                                                        Play
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

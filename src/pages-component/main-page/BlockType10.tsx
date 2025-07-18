'use client'

import '../../../styles/style-type-10-11.css'

import { DataHomeItemsBlock, HomeDataBlock } from '@/types'

import Link from 'next/link'
import { LoadingLink } from '@/components/LoadingLink'
import { SeeAllRoutes } from '@/context/FilterContext'
import { CURRENTYEAR } from '@/helper'
import Image from 'next/image'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'

export default function BlockType10({
    data,
}: {
    data: HomeDataBlock<DataHomeItemsBlock>

    isAutoPlay?: boolean
}) {
    return (
        <section aria-label="BlockType10" className="main-gamble__best-casinos-2024-2 best-casinos-2024-2-gamble" style={{ marginTop: '59px', marginBottom: '60px' }}>
            <div className="best-casinos-2024-2-gamble__container container">
                <div className="low-wager-bonuses-gamble__top top">
                    <div className="top__row">
                        <div className="top__column">
                            <div className="top__title-block">
                                {data.items_block.title_image && (
                                    <span className="top__title-icon ibg--custom ibg--custom-width-auto">
                                        <Image width={444} height={444} src={data.items_block.title_image} alt="security" />
                                    </span>
                                )}
                                <h2 className="top__title">{data.items_block.block_title}</h2>
                            </div>
                            {data.items_block.subtitle && <div className="top__subtitle">{data.items_block.subtitle}</div>}
                        </div>
                    </div>
                </div>
                <div className="best-casinos-2024-2-gamble__row">
                    <div className="best-casinos-2024-2-gamble__column best-casinos-2024-2-gamble__column_small">
                        <div className="best-casinos-2024-2-gamble__item different-casino-big">
                            <div className="different-casino-big__bg ibg--custom">
                                <Image width={444} height={444} src="/img/bg/03.webp" alt="bg" />
                            </div>
                            <Link
                                rel="nofollow noopener"
                                href={`/casino/${data.items_block.data_cards?.[0]?.casino_info?.casino_slug}`}
                                className="different-casino-big__image-block"
                            >
                                <span className="different-casino-big__image ibg--custom">
                                    <Image
                                        width={444}
                                        height={444}
                                        alt="Casino Image"
                                        src={data.items_block.data_cards?.[0]?.casino_info?.casino_image || '/img/no-results.svg'}
                                    />
                                </span>
                            </Link>
                            <div className="different-casino-big__content">
                                <Link
                                    href={`/casino/${data.items_block.data_cards?.[0]?.casino_info?.casino_slug}`}
                                    className="different-casino-big__name"
                                >
                                    {data.items_block.data_cards?.[0]?.casino_info.casino_name}
                                </Link>
                                <div className="different-casino-big__info">
                                    {data.items_block.data_cards?.[0]?.casino_info.additional_casino_params.map((item, index) => (
                                        <span key={index} className="different-casino-big__info-link">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div className="different-casino-big__rating">
                                    <span style={{ position: 'relative' }} className="different-casino-big__rating-icon">
                                      <Image src="/img/icons/star.svg" width={12} height={12} alt="star" />
                                    </span>
                                    <span className="different-casino-big__rating-number">
                                        {' '}
                                        {data.items_block.data_cards?.[0]?.casino_info.casino_rank}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="best-casinos-2024-2-gamble__item different-casino-big">
                            <div className="different-casino-big__bg ibg--custom">
                                <Image width={444} height={444} src="/img/bg/03.webp" alt="bg" />
                            </div>
                            <Link
                                rel="nofollow noopener"
                                href={`/casino/${data?.items_block.data_cards?.[1]?.casino_info?.casino_slug}`}
                                className="different-casino-big__image-block"
                            >
                                <span className="different-casino-big__image ibg--custom">
                                <LazyCardImg img={data.items_block.data_cards?.[1]?.casino_info?.casino_image || ''} />
                                </span>
                            </Link>
                            <div className="different-casino-big__content">
                                <Link
                                    href={`/casino/${data.items_block.data_cards?.[1]?.casino_info?.casino_slug}`}
                                    className="different-casino-big__name"
                                >
                                    {data.items_block.data_cards?.[1]?.casino_info.casino_name}
                                </Link>
                                <div className="different-casino-big__info">
                                    {data.items_block.data_cards?.[1]?.casino_info.additional_casino_params.map((item, index) => (
                                        <span key={index} className="different-casino-big__info-link">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div className="different-casino-big__rating">
                                    <span style={{ position: 'relative' }} className="different-casino-big__rating-icon">
                                    <Image src="/img/icons/star.svg" width={12} height={12} alt="star" />
                                    </span>
                                    <span className="different-casino-big__rating-number">
                                        {' '}
                                        {data.items_block.data_cards?.[1]?.casino_info.casino_rank}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="best-casinos-2024-2-gamble__column best-casinos-2024-2-gamble__column_big">
                        <div className="best-casinos-2024-2-gamble__bg ibg--custom">
                            <Image width={444} height={444} src="/img/bg/02.webp" alt="bg" />
                        </div>
                        <div className="best-casinos-2024-2-gamble__waves">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className={`best-casinos-2024-2-gamble__girl`}>
                            <Image 
                                fill 
                                src="/img/girls/02.webp" 
                                alt="girl" 
                                loading="lazy"
                                sizes="(max-width: 768px) 225px, (max-width: 1355px) 320px, (max-width: 1425px) 320px, (max-width: 1650px) 245px, 290px"
                                style={{
                                    objectFit: 'contain',
                                    objectPosition: 'bottom center',
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                        </div>
                        <div className={`best-casinos-2024-2-gamble__content `}>
                            <div className="best-casinos-2024-2-gamble__text">
                                <span>The Best</span>
                                {` Casinos of ${CURRENTYEAR}`}
                            </div>
                            <LoadingLink
                                href={`/all-${SeeAllRoutes[data?.items_block?.type_category]}${
                                    data?.items_block?.category?.slug || '' ? `/${data?.items_block?.category?.slug}` : ''
                                }`}
                                className="best-casinos-2024-2-gamble__btn"
                            >
                                See All
                            </LoadingLink>
                        </div>
                    </div>
                    <div className="best-casinos-2024-2-gamble__column best-casinos-2024-2-gamble__column_small">
                        <div className="best-casinos-2024-2-gamble__item different-casino-big">
                            <div className="different-casino-big__bg ibg--custom">
                                <Image width={444} height={444} src="/img/bg/03.webp" alt="bg" loading="lazy" />
                            </div>
                            <Link
                                rel="nofollow noopener"
                                href={`/casino/${data.items_block.data_cards?.[2]?.casino_info?.casino_slug}`}
                                className="different-casino-big__image-block"
                            >
                                <span className="different-casino-big__image ibg--custom">
                                <LazyCardImg img={data.items_block.data_cards?.[2]?.casino_info?.casino_image || ''} />
                                </span>
                            </Link>
                            <div className="different-casino-big__content">
                                <Link
                                    href={`/casino/${data.items_block.data_cards?.[2]?.casino_info?.casino_slug}`}
                                    className="different-casino-big__name"
                                >
                                    {data.items_block.data_cards?.[2]?.casino_info?.casino_name}
                                </Link>
                                <div className="different-casino-big__info">
                                    {data.items_block.data_cards?.[2]?.casino_info?.additional_casino_params?.map((item, index) => (
                                        <span key={index} className="different-casino-big__info-link">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div className="different-casino-big__rating">
                                    <span style={{ position: 'relative' }} className="different-casino-big__rating-icon">
                                    <Image src="/img/icons/star.svg" width={12} height={12} alt="star" />
                                    </span>
                                    <span className="different-casino-big__rating-number">
                                        {' '}
                                        {data.items_block.data_cards?.[2]?.casino_info?.casino_rank}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="best-casinos-2024-2-gamble__item different-casino-big">
                            <div className="different-casino-big__bg ibg--custom">
                                <Image width={444} height={444} src="/img/bg/03.webp" alt="bg" loading="lazy" />
                            </div>
                            <Link
                                rel="nofollow noopener"
                                href={`/casino/${data.items_block.data_cards?.[3]?.casino_info?.casino_slug}`}
                                className="different-casino-big__image-block"
                            >
                                <span className="different-casino-big__image ibg--custom">
                                  <LazyCardImg img={data.items_block.data_cards?.[3]?.casino_info?.casino_image || ''} />
                                </span>
                            </Link>
                            <div className="different-casino-big__content">
                                <Link
                                    href={`/casino/${data.items_block.data_cards?.[3]?.casino_info?.casino_slug}`}
                                    className="different-casino-big__name"
                                >
                                    {data.items_block.data_cards?.[3]?.casino_info.casino_name}
                                </Link>
                                <div className="different-casino-big__info">
                                    {data.items_block.data_cards?.[3]?.casino_info?.additional_casino_params?.map((item, index) => (
                                        <span key={index} className="different-casino-big__info-link">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div className="different-casino-big__rating">
                                    <span style={{ position: 'relative' }} className="different-casino-big__rating-icon">
                                      <Image src="/img/icons/star.svg" width={12} height={12} alt="star" />
                                    </span>
                                    <span className="different-casino-big__rating-number">
                                        {data.items_block.data_cards?.[3]?.casino_info.casino_rank}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

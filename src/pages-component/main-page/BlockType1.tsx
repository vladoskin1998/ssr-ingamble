'use client'

import MainSlider from '../../components/swiper/MainSlider'
import Image from 'next/image'

import { getTagColorByindex, shuffleArray } from '@/helper'
import { DataHomeItemsBlock, HomeDataBlock } from '@/types'
import { SeeAllButton } from './SeeAllButton'
import { useMemo } from 'react'

export default function BlockType1({ data, isAutoPlay = false }: { data: HomeDataBlock<DataHomeItemsBlock>; isAutoPlay?: boolean }) {
    const dataCard = useMemo(() => {
        return shuffleArray(data?.items_block.data_cards).slice(0, 8)
    }, [data?.items_block.data_cards])

    return (
        <>
            <section aria-label="BlockTypeNumber.BlockType1" className="main-gamble__todays-hot todays-hot-gamble">
                <div className="todays-hot-gamble__container container">
                    <div className="todays-hot-gamble__top top">
                        <div className="top__row">
                            <div className="top__column">
                                <div className="top__title-block">
                                    {data.items_block.title_image && (
                                        <span className="top__title-icon ibg--custom ibg--custom-width-auto">
                                            <Image src={data.items_block.title_image} alt="security" loading="lazy" width={40} height={40} />
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
                    <MainSlider
                        isAutoPlay={isAutoPlay}
                        data={dataCard.map((item) => ({
                            img: item?.bonus_info?.bonus_image,
                            raiting: item?.casino_info?.casino_rank,
                            likes: item?.bonus_info?.bonus_likes,
                            casinoName: item?.casino_info?.casino_name,
                            bonuseName: item?.bonus_info?.bonus_name,
                            playLink: item?.casino_info?.casino_affiliate_link || item?.casino_info?.url_casino,
                            imageLink: `/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`,
                            casinoLink: `/casino/${item?.casino_info?.casino_slug}`,
                            bonuseLink: `/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`,
                            tags: (
                                <>
                                    {item?.bonus_info?.labels?.length ? (
                                        item?.bonus_info?.labels
                                            ?.sort((a: string, b: string) => a.localeCompare(b))
                                            .map((item, cindex) => (
                                                <div key={cindex} className={`tags-casino-card__item ${getTagColorByindex(cindex)}`}>
                                                    <span className="tags-casino-card__item-label">{item}</span>
                                                </div>
                                            ))
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ),
                        }))}
                    />
                </div>
            </section>
        </>
    )
}

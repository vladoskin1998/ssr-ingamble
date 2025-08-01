'use client'

import MainSlider from '@/components/swiper/MainSlider'

import { getTagColorByindex, shuffleArray } from '@/helper'
import { DataHomeItemsBlock, HomeDataBlock } from '@/types'
import { SeeAllButton } from './SeeAllButton'
import { useMemo } from 'react'
import Image from 'next/image'

export default function BlockType8({
    data,
    isAutoPlay = false,
}: {
    data: HomeDataBlock<DataHomeItemsBlock>

    isAutoPlay?: boolean
}) {
    const dataCard = useMemo(() => {
        return shuffleArray(data?.items_block.data_cards).slice(0, 8)
    }, [data?.items_block.data_cards])

    return (
        <section aria-label="BlockTypeNumber.BlockType8" className="main-gamble__low-wager-bonuses low-wager-bonuses-gamble ">
            <div className="low-wager-bonuses-gamble__container container">
                <div className="low-wager-bonuses-gamble__top top">
                    <div className="top__row">
                        <div className="top__column">
                            <div className="top__title-block">
                                {data.items_block.title_image && (
                                    <span className="top__title-icon ibg--custom ibg--custom-width-auto">
                                        <Image src={data.items_block.title_image} alt="security" width={32} height={32} />
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
                    data={dataCard?.slice(0, 8)?.map((item) => ({
                        playLink: item?.casino_info?.casino_affiliate_link || item?.casino_info?.url_casino,
                        img: item.bonus_info.bonus_image,
                        raiting: item.casino_info.casino_rank,
                        likes: item.bonus_info.bonus_likes,
                        casinoName: item.casino_info.casino_name,
                        bonuseName: item.bonus_info.bonus_name,
                        imageLink: `/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`,
                        casinoLink: `/casino/${item?.casino_info?.casino_slug}`,
                        bonuseLink: `/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`,
                        tags: (
                            <>
                                {item?.bonus_info?.labels?.length ? (
                                    item?.bonus_info?.labels
                                        ?.sort((a: string, b: string) => a.localeCompare(b))
                                        ?.map((item, cindex) => (
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
    )
}

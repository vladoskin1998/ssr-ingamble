/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import MainSlider from '@/components/swiper/MainSlider'
import $api from '@/http'
import { useQuery } from '@tanstack/react-query'
import { BonusInRankRangeResponse } from '@/types'
import { getTagColorByindex, shuffleArray } from '@/helper'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const getFilteringBonusList = async () => {
    if (process.env.USE_NEXT_API === 'true') {
        const response = await fetch('/api/bonuses-rank-range')
        return response.json()
    }
    
    const response = await $api.get(`bonuses-in-rank-range/`)
    return response.data
}

export const OtherBestReloadBonus = ({ casinoName }: { casinoName?: string }) => {
    const params = useParams()
    const bonus_slug = Array.isArray(params.bonus_slug) ? params.bonus_slug[0] : params.bonus_slug

    const [slug, setSlug] = useState<string>(bonus_slug || '')

    useEffect(() => {
        if (bonus_slug) {
            setSlug(bonus_slug)
        }
    }, [bonus_slug])
    
    const { data: BonusDataHigh } = useQuery({
        queryKey: ['bonuses-in-rank-range/'],
        queryFn: () => getFilteringBonusList(),
        staleTime: Infinity,
    })

    return (
        <>
            <section className="simple-bonus__more-stake more-staket-simple-bonus">
                <div className="more-staket-simple-bonus__container container">
                    <div className="more-staket-simple-bonus__top top">
                        <div className="top__row">
                            <div className="top__column">
                                <div className="top__title-block">
                                    <h2 className="top__title">Other Best Bonuses</h2>
                                </div>
                            </div>
                            <div className="top__column">
                                <Link rel="nofollow noopener" href="/all-bonuses" aria-label="Put your description here." className="top__btn">
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
                    <MainSlider
                        data={(BonusDataHigh?.filter((item: BonusInRankRangeResponse) => item.bonus_slug !== slug) || [])
                            .slice(0, 10)
                            .map((bonus: BonusInRankRangeResponse) => ({
                                img: bonus?.bonus_image || '',
                                raiting: bonus?.casino_rank,
                                likes: bonus?.bonus_likes,
                                casinoName: bonus?.casino_name,
                                bonuseName: bonus?.bonus_name,
                                imageLink: `/casino/${bonus?.casino_slug}/bonuses/${bonus?.bonus_slug}`,
                                playLink: bonus?.casino_affiliate_link || bonus?.url_casino,
                                casinoLink: `/casino/${bonus?.casino_slug}`,
                                bonuseLink: bonus?.bonus_type === null ? '' : `/casino/${bonus?.casino_slug}/bonuses/${bonus?.bonus_slug}`,
                                tags: (
                                    <>
                                        {bonus?.labels
                                            ?.sort((a: any, b: any) => {
                                                const labelA = typeof a === 'string' ? a : a?.name || ''
                                                const labelB = typeof b === 'string' ? b : b?.name || ''
                                                return labelA.localeCompare(labelB)
                                            })
                                            .map((l: any, ct: number) => (
                                                <div key={ct} className={`tags-casino-card__item ${getTagColorByindex(ct)}`}>
                                                    <span className="tags-casino-card__item-label">{typeof l !== 'string' && 'name' in l ? l?.name : ''}</span>
                                                </div>
                                            ))}
                                    </>
                                ),
                            }))}
                    />
                </div>
            </section>
        </>
    )
}

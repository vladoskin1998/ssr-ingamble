

import MainSlider from '@/components/swiper/MainSlider'
import $api from '@/http'
import { useQuery } from 'react-query'
import { BonusInRankRangeResponse } from '@/types'
import {  getTagColorByindex, shuffleArray } from '@/helper'


import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const getFilteringBonusList = async () => {
    const response = await $api.get(`bonuses-in-rank-range/`)
    return response.data
}

//@ts-ignore
export const OtherBestReloadBonus = ({ casinoName }: { casinoName?: string }) => {
       const { bonus_slug } = useParams()

    const [slug, setSlug] = useState<string>(bonus_slug || '')

    useEffect(() => {
        if (bonus_slug) {
            setSlug(bonus_slug)
        }
    }, [bonus_slug])
    const { data: BonusDataHigh } = useQuery<BonusInRankRangeResponse[]>(['bonuses-in-rank-range/'], () => getFilteringBonusList(), {
        keepPreviousData: true,
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
                        data={shuffleArray(BonusDataHigh?.filter((item) => item.bonus_slug !== slug))
                            ?.slice(0, 10)
                            .map((b: BonusInRankRangeResponse) => ({
                                img: b?.bonus_image || '',
                                raiting: b?.casino_rank,
                                likes: b?.bonus_likes,
                                casinoName: b?.casino_name,
                                bonuseName: b?.bonus_name,
                                imageLink: `/casino/${b?.casino_slug}/bonuses/${b?.bonus_slug}`,
                                playLink: b?.casino_affiliate_link || b?.url_casino,
                                casinoLink: `/casino/${b?.casino_slug}`,
                                bonuseLink: b?.bonus_type === null ? '' : `/casino/${b?.casino_slug}/bonuses/${b?.bonus_slug}`,
                                tags: (
                                    <>
                                        {typeof b !== 'string'
                                            ? b?.labels
                                                  ?.sort((a, b) => {
                                                      const labelA = typeof a === 'string' ? a : a?.name || ''
                                                      const labelB = typeof b === 'string' ? b : b?.name || ''
                                                      return labelA.localeCompare(labelB)
                                                  })
                                                  .map((l, ct) => (
                                                      <div key={ct} className={`tags-casino-card__item ${getTagColorByindex(ct)}`}>
                                                          <span className="tags-casino-card__item-label">{typeof l !== 'string' && 'name' in l ? l?.name : ''}</span>
                                                      </div>
                                                  ))
                                            : []}
                                    </>
                                ),
                            }))}
                    />
                </div>
            </section>
        </>
    )
}

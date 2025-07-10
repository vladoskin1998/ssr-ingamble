import $api from '../../http'

import {
    
    FilterLoyaltiesPostResponse,
    NAMETITLECATEGORYSLUGType,
    SeeAllEssentialLoyaltyCasino,
    SeeAllEssentialLoyaltyKeypoint
} from '@/types'
// ✅ ЗМІНА: all-loyalties.css та style.css тепер імпортуються в layout.tsx
import { filterEmptyValues } from '@/helper'
import Link from 'next/link'
import Image from 'next/image'
import AllLoyaltyLayout from './layout'
import { headers } from 'next/headers'
import { CloakingButton } from './cloaking-button'
import { PaginationPage } from '@/components/pagination/PaginationPage'




// const countPageSize = (isMobile: boolean) => < 900 ? 8 : 15


const NAMETITLECATEGORYSLUG: NAMETITLECATEGORYSLUGType = {
    'loyalty-rank': { key: 'loyalty_rank', value: { min: 8, max: 10 } },
    'vip-manager': { key: 'vip_manager', value: true },
    'level-up-bonus': { key: 'level_up_bonus', value: true },
    withdrawals: { key: 'withdrawals', value: true },
    'special-prizes': { key: 'special_prizes', value: true },
    gifts: { key: 'gifts', value: true },
}

const getFilteringLoyaltiesList = async (
    dto: keyof NAMETITLECATEGORYSLUGType | undefined,
    page: number,
): Promise<FilterLoyaltiesPostResponse> => {
    let payload = {}
    if (dto) {
        payload = {
            [NAMETITLECATEGORYSLUG[dto].key]: NAMETITLECATEGORYSLUG[dto].value,
        }
    }


    
    const body = filterEmptyValues(payload)
    const response = await $api.post(`filter/loyalty/?page=${page}&page_size=${10}`, body)
    return response.data
}


export default async function SeeAllEssentialsLoyalty({ loyaltie_slug, currentPage }: { loyaltie_slug?: string; currentPage?: number }) {
    const userAgent = (await headers()).get('user-agent') || ''
    const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent)
    let totalCountPage = 1


    let allData: SeeAllEssentialLoyaltyCasino[] = []

    // console.log('loyaltie_slug', loyaltie_slug)
    if (isMobile) {
        // Для мобільних: завжди вантажимо тільки першу сторінку на SSR/ISR
        const data = await getFilteringLoyaltiesList(loyaltie_slug as keyof NAMETITLECATEGORYSLUGType, 1)
        totalCountPage = data?.count || 1
        allData = data?.results || []
    } else {
        const data = await getFilteringLoyaltiesList(loyaltie_slug as keyof NAMETITLECATEGORYSLUGType, Number(currentPage || 1))
        totalCountPage = data?.count || 1
        allData = data?.results || []
    }

    console.log(totalCountPage)

    return (
        <AllLoyaltyLayout totalPages={totalCountPage}>
            <div className="main-loyaltie-programs__items loyaltie-programs__items">
                {/* ✅ ЗМІНА: Типізовано allData mapping з правильним типом */}
                {allData?.map((item: SeeAllEssentialLoyaltyCasino, index: number) => (
                    <div key={index} className="loyaltie-programs__item item-loyaltie-programs">
                        <div className="item-loyaltie-programs__row">
                            <div className="item-loyaltie-programs__main">
                                <Link
                                    href={`/casino/${item.casino_slug}`}
                                    prefetch={false}
                                    className="item-loyaltie-programs__image loyalty-img-custom"
                                    style={{ position: 'relative' }}
                                >
                                    <Image src={item?.casino_image || ''} fill alt={item.casino_slug} />
                                </Link>
                            </div>
                            <div className="item-loyaltie-programs__content content-item-loyaltie-programs">
                                <div className="content-item-loyaltie-programs__top top-content-item-loyaltie-programs">
                                    <h2 className="top-content-item-loyaltie-programs__name">{item.casino_name}</h2>
                                    <div className="info-casino-card__stake-rating">
                                        <span className="info-casino-card__stake-rating-icon">
                                            <Image src={'/img/icons/star.svg'} alt="star" width={20} height={20} />
                                        </span>
                                        <span className="info-casino-card__stake__rating-number">{item.casino_rank}</span>
                                    </div>
                                </div>
                                <div className="content-item-loyaltie-programs__features features-essential-programs-gamble">
                                    {/* ✅ ЗМІНА: Типізовано loyalty_keypoint mapping */}
                                    {item.loyalty_program.loyalty_keypoint.map((it: SeeAllEssentialLoyaltyKeypoint, index: number) => (
                                        <div key={index} className="features-essential-programs-gamble__column">
                                            <div className="features-essential-programs-gamble__item">
                                                <div className="features-essential-programs-gamble__icon " style={{ position: 'relative' }}>
                                                    <Image src={it?.image || ''} fill alt={'loyalty_keypoint'} />
                                                </div>
                                                <div className="features-essential-programs-gamble__info">
                                                    <div className="features-essential-programs-gamble__name">{it.text_1}</div>
                                                    <div className="features-essential-programs-gamble__text">{it.text_2}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="features-essential-programs-gamble__column features-essential-programs-gamble__column_rating">
                                        <div className="features-essential-programs-gamble__item features-essential-programs-gamble__item_rating">
                                            <div className="item-essential-programs-gamble__rating">
                                                <div className="item-essential-programs-gamble__rating-number">
                                                    {parseInt(String(item?.loyalty_program?.loyalty_rank), 10)}
                                                    /10
                                                </div>
                                                <div className="item-essential-programs-gamble__rating-body">
                                                    <div className="item-essential-programs-gamble__rating-items items-rating-essential-programs-gamble">
                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                                                            <div
                                                                key={level}
                                                                className={`items-rating-essential-programs-gamble__item items-rating-essential-programs-gamble__item_${level} ${
                                                                    level <= (Number(item?.loyalty_program?.loyalty_rank) || 10) && 'full'
                                                                }`}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                    <div className="item-essential-programs-gamble__rating-text">
                                                        {item?.loyalty_program?.loyalty_level_description || 'Excellent'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-item-loyaltie-programs__bottom bottom-content-item-loyaltie-programs">
                                    <div className="bottom-content-item-loyaltie-programs__btns">
                                        {/* <a
                                            href={cloacingLink(item?.casino_name)}
                                            onClick={(e) => {
                                                'use client'
                                                e.stopPropagation()
                                                e.preventDefault()
                                                cloacingFetch(item?.casino_affiliate_link)
                                                window.open(
                                                    item?.casino_affiliate_link || item?.url_casino,
                                                    '_blank',
                                                    'noopener,noreferrer',
                                                )
                                            }}
                                            className="bottom-content-item-loyaltie-programs__btn-view"
                                        >
                                            Visit Casino
                                        </a> */}
                                        <CloakingButton
                                            casinoName={item?.casino_name}
                                            affiliateLink={item?.casino_affiliate_link}
                                            urlCasino={item?.url_casino || ''}
                                        />
                                        <Link
                                            href={`/casino/${item.loyalty_program.loyalty_slug}/loyalty`}
                                            prefetch={false}
                                            aria-label="Put your description here."
                                            className="bottom-content-item-loyaltie-programs__btn-more"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AllLoyaltyLayout>
    )
}

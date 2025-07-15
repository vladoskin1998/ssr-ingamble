'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import 'swiper/css'
import { useQuery } from '@tanstack/react-query'
import { lazy, useEffect, useState } from 'react'
import $api from '@/http'
import { BreadCrumb } from '@/components/breadcrumb/index'
import { GeoLocationAllowdType } from '@/types'
import { BonusSubType } from './BonusSubType'
import { Categories } from '@/components/categories/Categories'
import { LastUpdate } from './LastUpdate'


import { LogoLoader } from '@/components/loader/LogoLoader'
import { HeaderSimpleBonus } from './HeaderSimpleBonus'
import { HowToGetBonus } from './HowToGetBonus'

import { HarryStyles } from './HarryStyles'
import { EssentialVIPLoyaltyPrograms } from './EssentialVIPLoyaltyPrograms'
import { useFilterContext } from '@/context/FilterContext'
import { SiblingBonus } from './SiblingBonus'

import { OtherBestReloadBonus } from './OtherBestBonus'
import initializeAdaptiveBehavior from '@/helper/adaprive-bahavior'
const Footer = lazy(() => import('@/components/footer'))
const SubscribeForm = lazy(() => import('@/components/subscribe/SubscribeForm'))
const CheckMoreWhatSuitsYouBest = lazy(() => import('@/components/categories/CheckMoreWhatSuitsYouBest'))

const getBonusDataFetch = async ({ slug }: { slug: string | null }) => {
    if (process.env.USE_NEXT_API === 'true') {
        const response = await fetch(`/api/bonus/${slug}`)
        const dataBonus = await response.json()
        return { dataBonus, headers: response.headers }
    }
    
    const response = await $api.get(`get-data-bonus/${slug}/`)
    const headers = response.headers
    return { dataBonus: response.data, headers }
}

import { useParams } from 'next/navigation'

export default function SimpleBonus() {
    const params = useParams()
    const bonusSlug = params.bonus_slug as string

    return <SimpleBonusClient bonusSlug={bonusSlug} />
}

function SimpleBonusClient({ bonusSlug }: { bonusSlug: string }) {
    const { data: Country } = useFilterContext()

    const [slug, setSlug] = useState<string>(bonusSlug || '')

    useEffect(() => {
        if (bonusSlug) {
            setSlug(bonusSlug)
            window.scrollTo(0, 0)
        }
    }, [bonusSlug])

    const [geoLocation, setGeoLocation] = useState<GeoLocationAllowdType>({
        countryCode: '',
        countryName: '',
        isAllowed: true,
        isLoadedGeo: false,
        countryImg: undefined,
        idCountry: null,
    })

    const { data, isLoading } = useQuery({
        queryKey: ['get-data-bonus', slug],
        queryFn: () => getBonusDataFetch({ slug }),
        staleTime: Infinity,
        enabled: !!slug,
    })

    useEffect(() => {
        if (data?.headers) {
            const headers = data?.headers
            const countryCode = headers?.['cf-ipcountry-code']
            const countryName = headers?.['cf-ipcountry']

            const countryImg = (Country?.general?.countries )?.find((it) => {
                return it.code === countryCode || it.name.toLocaleLowerCase() === countryName.toLocaleLowerCase()
            })?.flag_image

            const idCountry = data.dataBonus?.blocked_countries?.find((item: any) => item?.code?.toLocaleLowerCase() === countryCode?.toLocaleLowerCase())?.id

            setGeoLocation({
                countryCode,
                countryName,
                isAllowed: !idCountry,
                isLoadedGeo: true,
                countryImg,
                idCountry,
            })
        }
        initializeAdaptiveBehavior()

        // const newUrl = `/casino/${data?.dataBonus?.casino_name
        //     .replace(/\s/g, "-")
        //     .toLocaleLowerCase()}/bonuses/${data?.dataBonus?.bonus_type
        //     .replace(/\s/g, "-")
        //     .toLocaleLowerCase()}`f

        // window.history.pushState({}, "", newUrl)
    }, [data, Country])

    useEffect(() => {
        initializeAdaptiveBehavior()
    }, [isLoading])

     if (isLoading || !geoLocation.isLoadedGeo) return <LogoLoader />

    return (
        <div>
            <main className="gamble__simple-bonus main-gamble simple-bonus">
                <div className="main-gamble__body">
                    <Categories />
                    <BreadCrumb
                        path={[
                            {
                                name: 'Home',
                                link: '/    ',
                            },
                            {
                                name: 'Casino',
                                link: '/all-casinos',
                            },
                            {
                                name: data?.dataBonus?.casino_name || 'Casino Name',
                                link: `/casino/${data?.dataBonus.casino_slug}`,
                            },
                            {
                                name: 'Bonuses',
                                link: '/all-bonuses',
                            },
                         
                            {
                                name: data?.dataBonus?.name || 'Bonus Type',
                                link: `#`,
                            },
                        ]}
                    />
                    <HeaderSimpleBonus data={data?.dataBonus} geoLocation={geoLocation} />
                    <BonusSubType bonus_subtype={data?.dataBonus?.bonus_subtype || []} />
                    <LastUpdate data={data?.dataBonus} />
                    <HowToGetBonus data={data?.dataBonus} />
                    <SiblingBonus
                        casinoName={data?.dataBonus.casino_name}
                        sibling_bonuses={data?.dataBonus.sibling_bonuses}
                        casino_rank={data?.dataBonus?.casino_rank}
                        casino_affiliate_link={data?.dataBonus.casino_affiliate_link || data?.dataBonus?.url_casino}
                        casino_slug={data?.dataBonus?.casino_slug}
                    />
                    <OtherBestReloadBonus />
                    <EssentialVIPLoyaltyPrograms />
                    <HarryStyles img="/img/casino-person/5.webp" title="ASHLING O'BRIEN" subtitle="Content Maker, Casino Promotions Analyst" />
                    <CheckMoreWhatSuitsYouBest />
                    <SubscribeForm />
                    <Footer />
                </div>
            </main>
        </div>
    )
}

'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { LoyaltieCasinoInfo } from './LoyaltieCasinoInfo'
import { LoyaltyRewnew } from './LoyaltyRewnew'
import { LoyaltyText } from './LoyaltyText'
import { HowToStartVipJorney } from './HowToStartVipJorney'
import { LoyaltyAcordeon } from './LoyaltyAcordeon'
import $api from '@/http'

import { LogoLoader } from '@/components/loader/LogoLoader'

import { Categories } from '@/components/categories/Categories'
import { BreadCrumb } from '@/components/breadcrumb'
import { GeoLocationAllowdType } from '@/types'
import { EssentialVIPLoyaltyPrograms } from '../bonuses/[bonus_slug]/EssentialVIPLoyaltyPrograms'
import { SiblingBonus } from '../bonuses/[bonus_slug]/SiblingBonus'
// import { OtherBestReloadBonus } from '../bonuses/bonus_slug/OtherBestBonus'
import { HarryStyles } from '../bonuses/[bonus_slug]/HarryStyles'
import { useFilterContext } from '@/context/FilterContext'
import initializeAdaptiveBehavior from '@/helper/adaprive-bahavior'

const CheckMoreWhatSuitsYouBest = lazy(() => import('@/components/categories/CheckMoreWhatSuitsYouBest'))
const SubscribeForm = lazy(() => import('@/components/subscribe/SubscribeForm'))
const BottomInfo = lazy(() => import('@/components/footer/BottomInfo'))

const getCurrentLoyaltiesFetchData = async (slug: string) => {
    if (process.env.USE_NEXT_API === 'true') {
        const response = await fetch(`/api/loyalty-program/${slug}`)
        const dataCurrentLoyaltie = await response.json()
        return { dataCurrentLoyaltie, headers: response.headers }
    }
    
    const response = await $api.get(`get-data-loyalty-program/${slug}/`)
    const headers = response.headers
    return { dataCurrentLoyaltie: response.data, headers }
}

export default function SimpleLoyalties() {
    const params = useParams()
    const casinoSlug = params.casino_slug as string
    const { data: Country } = useFilterContext()

    const [slug, setSlug] = useState<string>(casinoSlug || '')
    const [geoLocation, setGeoLocation] = useState<GeoLocationAllowdType>({
        countryCode: '',
        countryName: '',
        isAllowed: true,
        isLoadedGeo: false,
        countryImg: undefined,
        idCountry: null,
    })

    useEffect(() => {
        if (casinoSlug) {
            setSlug(casinoSlug)
            window.scrollTo(0, 0)
        }
    }, [casinoSlug])

    const { data, isLoading } = useQuery({
        queryKey: ['get-data-loyalty-program', slug],
        queryFn: () => getCurrentLoyaltiesFetchData(slug),
        staleTime: Infinity,
        enabled: !!slug,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    useEffect(() => {
        if (data?.headers) {
            const countryCode = data.headers['cf-ipcountry-code']
            const countryName = data.headers['cf-ipcountry']
            
            const countryImg = Country?.general?.countries?.find((it) => {
                return it.code === countryCode || it.name.toLocaleLowerCase() === countryName?.toLocaleLowerCase()
            })?.flag_image

            const idCountry = data.dataCurrentLoyaltie?.blocked_countries?.find(
                (item: any) => item?.code?.toLocaleLowerCase() === countryCode?.toLocaleLowerCase(),
            )?.id

            setGeoLocation({
                countryCode: countryCode || '',
                countryName: countryName || '',
                isAllowed: !idCountry,
                isLoadedGeo: true,
                countryImg,
                idCountry,
            })
        }
    }, [data, Country])

    useEffect(() => {
        initializeAdaptiveBehavior()
    }, [geoLocation])

    if (isLoading || !geoLocation.isLoadedGeo) return <LogoLoader />
    
    return (
        <main className="gamble__loyaltie main-gamble loyaltie">
            <div className="main-gamble__body">
                <Categories />
                <BreadCrumb
                    path={[
                        { name: 'Home', link: '/' },
                        { name: 'Casino', link: '/all-casinos' },
                        {
                            name: data?.dataCurrentLoyaltie?.casino_name || 'Casino Name',
                            link: `/casino/${data?.dataCurrentLoyaltie?.casino_slug}`,
                        },
                        { name: 'Loyalties', link: `/all-loyalties` },
                        { name: `${data?.dataCurrentLoyaltie?.casino_name} Vip Loyalty Program`, link: `/all-loyalties` },
                    ]}
                />
                <LoyaltieCasinoInfo data={data?.dataCurrentLoyaltie} geoLocation={geoLocation} />
                {data?.dataCurrentLoyaltie?.loyalty_keypoint.length && (
                    <LoyaltyRewnew loyalty_subtype={data.dataCurrentLoyaltie.loyalty_keypoint} />
                )}
                <LoyaltyAcordeon data={data?.dataCurrentLoyaltie} />
                <LoyaltyText data={data?.dataCurrentLoyaltie} />
                <HowToStartVipJorney
                    casino_affiliate_link={data?.dataCurrentLoyaltie?.casino_affiliate_link || data?.dataCurrentLoyaltie?.url_casino}
                    casino_name={data?.dataCurrentLoyaltie?.casino_name}
                    likes={data?.dataCurrentLoyaltie?.likes}
                    slug={data?.dataCurrentLoyaltie?.casino_slug}
                    link_tc={data?.dataCurrentLoyaltie?.link_tc || ''}
                    id={data?.dataCurrentLoyaltie?.id}
                />
                <div className="main-gamble-loyaltie-mob">
                    <EssentialVIPLoyaltyPrograms />
                </div>
                <SiblingBonus
                    casinoName={data?.dataCurrentLoyaltie?.casino_name}
                    sibling_bonuses={data?.dataCurrentLoyaltie?.sibling_bonuses}
                    casino_rank={data?.dataCurrentLoyaltie?.casino_rank}
                    casino_affiliate_link={data?.dataCurrentLoyaltie?.casino_affiliate_link || data?.dataCurrentLoyaltie?.url_casino}
                    casino_slug={data?.dataCurrentLoyaltie?.casino_slug}
                />
                {/* <OtherBestReloadBonus /> */}
                <div className="main-gamble-loyaltie-pc">
                    <EssentialVIPLoyaltyPrograms />
                </div>
                <HarryStyles
                    img={'/img/casino-person/4.webp'}
                    title={'JEFF MURPHY'}
                    subtitle={'Content Maker, Crypto & Gambling Enthusiast'}
                />
                <Suspense fallback={<></>}>
                    <CheckMoreWhatSuitsYouBest />
                    <SubscribeForm />
                    <BottomInfo />
                </Suspense>
            </div>
        </main>
    )
}

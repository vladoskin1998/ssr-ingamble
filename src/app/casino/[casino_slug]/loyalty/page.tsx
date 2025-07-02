/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'

import { LoyaltieCasinoInfo } from './LoyaltieCasinoInfo'
import { LoyaltyRewnew } from './LoyaltyRewnew'
import { LoyaltyText } from './LoyaltyText'
import { HowToStartVipJorney } from './HowToStartVipJorney'
import { LoyaltyAcordeon } from './LoyaltyAcordeon'
import $api from '@/http'

import { LogoLoader } from '@/components/loader/LogoLoader'

import { Categories } from '@/components/categories/Categories'
import { BreadCrumb } from '@/components/breadcrumb'
import { GeoLocationAllowdType, LoyaltieProgramDataResponse } from '@/types'
import { EssentialVIPLoyaltyPrograms } from '../bonuses/bonus_slug/EssentialVIPLoyaltyPrograms'
import { SiblingBonus } from '../bonuses/bonus_slug/SiblingBonus'
// import { OtherBestReloadBonus } from '../bonuses/bonus_slug/OtherBestBonus'
import { HarryStyles } from '../bonuses/bonus_slug/HarryStyles'
import { lazy, Suspense } from 'react'

const CheckMoreWhatSuitsYouBest = lazy(() => import('@/components/categories/CheckMoreWhatSuitsYouBest'))
const SubscribeForm = lazy(() => import('@/components/subscribe/SubscribeForm'))
const BottomInfo = lazy(() => import('@/components/footer/BottomInfo'))

// Типы для geoLocation
// interface CountryType {
//     code: string
//     name: string
//     flag_image?: string
// }
interface BlockedCountryType {
    code: string
    id: number
}

// SEO оптимізація метаданих для сторінки лояльності казино
export async function generateMetadata({ 
  params 
}: { 
  params: { casino_slug: string } 
}): Promise<Metadata> {
  try {
    const data = await getCurrentLoyaltiesFetchData(params.casino_slug)
    
    return {
       // SEO метадані для сторінки лояльності казино
      title: `${data.dataCurrentLoyaltie?.casino_name} VIP Loyalty Program 2025 - inGamble`,
      description: `Explore ${data.dataCurrentLoyaltie?.casino_name} VIP loyalty program. Get exclusive rewards, bonuses and benefits. Comprehensive review with latest updates.`,
      keywords: `${data.dataCurrentLoyaltie?.casino_name}, VIP loyalty, casino rewards, exclusive bonuses, loyalty program`,
      // Open Graph метадані для соціальних мереж
      openGraph: {
        title: `${data.dataCurrentLoyaltie?.casino_name} VIP Loyalty Program`,
        description: `Explore ${data.dataCurrentLoyaltie?.casino_name} VIP loyalty program with exclusive rewards`,
        images: [
          {
            url: data.dataCurrentLoyaltie?.casino_image || '/img/default-casino.webp',
            width: 1200,
            height: 630,
            alt: `${data.dataCurrentLoyaltie?.casino_name} Casino`,
          }
        ],
        type: 'website',
        siteName: 'inGamble',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${data.dataCurrentLoyaltie?.casino_name} VIP Loyalty Program`,
        description: `Explore ${data.dataCurrentLoyaltie?.casino_name} VIP loyalty program`,
        images: [data.dataCurrentLoyaltie?.casino_image || '/img/default-casino.webp'],
      },
      alternates: {
        canonical: `/casino/${params.casino_slug}/loyalty`,
      },
    }
  } catch {
    return {
      title: 'Casino VIP Loyalty Program - inGamble',
      description: 'Explore casino VIP loyalty programs and exclusive benefits',
    }
  }
}

async function getCurrentLoyaltiesFetchData(slug: string) {
    const response = await $api.get(`get-data-loyalty-program/${slug}/`)
    const headers = response.headers
    return { dataCurrentLoyaltie: response.data, headers }
}

export default async function SimpleLoyalties({ params }: { params: { casino_slug: string } }) {
    const slug = params.casino_slug
    let data: { dataCurrentLoyaltie: LoyaltieProgramDataResponse; headers: any } | null = null
    let geoLocation: GeoLocationAllowdType = {
        countryCode: '',
        countryName: '',
        isAllowed: true,
        isLoadedGeo: false,
        countryImg: undefined,
        idCountry: null,
    }
    try {
        data = await getCurrentLoyaltiesFetchData(slug)
        if (data?.headers) {
            const countryCode = data.headers['cf-ipcountry-code']
            const countryName = data.headers['cf-ipcountry']
            // Здесь предполагается, что Country.general.countries доступен на сервере, иначе убрать countryImg
            // const countryImg = ...
            const idCountry = data.dataCurrentLoyaltie?.blocked_countries?.find(
                (item: BlockedCountryType) => item?.code?.toLocaleLowerCase() === countryCode?.toLocaleLowerCase(),
            )?.id
            geoLocation = {
                countryCode,
                countryName,
                isAllowed: !idCountry,
                isLoadedGeo: true,
                countryImg: undefined, // если нужно, реализуйте получение флага на сервере
                idCountry,
            }
        }
    } catch {
        // обработка ошибки
        return <LogoLoader />
    }
    if (!data || !geoLocation.isLoadedGeo) return <LogoLoader />
    return (
        <main className="gamble__loyaltie main-gamble loyaltie">
            <div className="main-gamble__body">
                <Categories />
                <BreadCrumb
                    path={[
                        { name: 'Home', link: '/' },
                        { name: 'Casino', link: '/all-casinos' },
                        {
                            name: data.dataCurrentLoyaltie?.casino_name || 'Casino Name',
                            link: `/casino/${data.dataCurrentLoyaltie?.casino_slug}`,
                        },
                        { name: 'Loyalties', link: `/all-loyalties` },
                        { name: `${data.dataCurrentLoyaltie?.casino_name} Vip Loyalty Program`, link: `/all-loyalties` },
                    ]}
                />
                <LoyaltieCasinoInfo data={data.dataCurrentLoyaltie} geoLocation={geoLocation} />
                {data.dataCurrentLoyaltie?.loyalty_keypoint.length && (
                    <LoyaltyRewnew loyalty_subtype={data.dataCurrentLoyaltie.loyalty_keypoint} />
                )}
                <LoyaltyAcordeon data={data.dataCurrentLoyaltie} />
                <LoyaltyText data={data.dataCurrentLoyaltie} />
                <HowToStartVipJorney
                    casino_affiliate_link={data.dataCurrentLoyaltie?.casino_affiliate_link || data.dataCurrentLoyaltie.url_casino}
                    casino_name={data.dataCurrentLoyaltie?.casino_name}
                    likes={data.dataCurrentLoyaltie?.likes}
                    slug={data.dataCurrentLoyaltie?.casino_slug}
                    link_tc={data.dataCurrentLoyaltie?.link_tc || ''}
                    id={data.dataCurrentLoyaltie.id}
                />
                <div className="main-gamble-loyaltie-mob">
                    <EssentialVIPLoyaltyPrograms />
                </div>
                <SiblingBonus
                    casinoName={data.dataCurrentLoyaltie?.casino_name}
                    sibling_bonuses={data.dataCurrentLoyaltie.sibling_bonuses}
                    casino_rank={data.dataCurrentLoyaltie?.casino_rank}
                    casino_affiliate_link={data.dataCurrentLoyaltie?.casino_affiliate_link || data.dataCurrentLoyaltie.url_casino}
                    casino_slug={data.dataCurrentLoyaltie?.casino_slug}
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

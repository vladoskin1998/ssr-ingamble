import 'swiper/css'
import { useQuery } from 'react-query'
import { lazy, useEffect, useState } from 'react'
import $api from '../../http'
import { BreadCrumb } from '../../components/breadcrumb/BreadCrumb'
import { GeoLocationAllowdType, GetDataBonusResponse } from '../../types'
import { BonusSubType } from './BonusSubType'
import { Categories } from '../../components/categories/Categories'
import { LastUpdate } from './LastUpdate'
import { Wraper } from '../Wraper'


import { LogoLoader } from '../../components/loader/LogoLoader'
import { HeaderSimpleBonus } from './HeaderSimpleBonus'
import { HowToGetBonus } from './HowToGetBonus'

import { HarryStyles } from './HarryStyles'
import { useParams } from 'react-router-dom'
import { EssentialVIPLoyaltyPrograms } from './EssentialVIPLoyaltyPrograms'
import { useFilterContext } from '../../context/FilterContext'
import { SiblingBonus } from './SiblingBonus'

import { OtherBestReloadBonus } from './OtherBestBonus'
import ASHLINGOBRIEN from '../../assets/img/casino-person/5.webp'
import initializeAdaptiveBehavior from '../../helper/adaprive-bahavior'
const BottomInfo = lazy(() => import('../../components/footer/BottomInfo'))
const SubscribeForm = lazy(() => import('../../components/subscribe/SubscribeForm'))
const CheckMoreWhatSuitsYouBest = lazy(() => import('../../components/categories/CheckMoreWhatSuitsYouBest'))

const getBonusDataFetch = async ({ slug }: { slug: string | null }) => {
    const response = await $api.get(`get-data-bonus/${slug}/`)
    const headers = response.headers

    return { dataBonus: response.data, headers }
}

export default function SimpleBonus() {
    // document.title = "Simple Bonus"

    const { data: Country } = useFilterContext()

     const { bonus_slug } = useParams()

    const [slug, setSlug] = useState<string>(bonus_slug || '')

    useEffect(() => {
        if (bonus_slug) {
            setSlug(bonus_slug)
            window.scrollTo(0, 0)
        }
    }, [bonus_slug])

    const [geoLocation, setGeoLocation] = useState<GeoLocationAllowdType>({
        countryCode: '',
        countryName: '',
        isAllowed: true,
        isLoadedGeo: false,
        countryImg: undefined,
        idCountry: null,
    })

    const { data, isLoading } = useQuery<{
        dataBonus: GetDataBonusResponse
        headers: any
    }>(['get-data-bonus', slug], () => getBonusDataFetch({ slug }), {
        keepPreviousData: true,
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

            const idCountry = data.dataBonus?.blocked_countries?.find((item) => item?.code?.toLocaleLowerCase() === countryCode?.toLocaleLowerCase())?.id

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
        <Wraper>
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
                    <HarryStyles img={ASHLINGOBRIEN} title="ASHLING O'BRIEN" subtitle="Content Maker, Casino Promotions Analyst" />
                    <CheckMoreWhatSuitsYouBest />
                    <SubscribeForm />
                    <BottomInfo />
                </div>
            </main>
        </Wraper>
    )
}

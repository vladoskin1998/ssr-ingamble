'use client'

import { Categories } from '@/components/categories/Categories'
import { BreadCrumb } from '@/components/breadcrumb'
import { PaginationPage } from '../../components/pagination/PaginationPage'

import { DataHomeItemsBlockEnumCategory, NAMETITLECATEGORYSLUGType } from '../../types'
import { useParams } from 'next/navigation'
import '../../../styles/all-loyalties.css'

import { useRouter } from 'next/navigation'
import React, { lazy, useEffect, useState } from 'react'
import { LOYALTIECATEGORYIES } from '../../helper'

import { initialLoyaltiesFilters, useFilterContext } from '../../context/FilterContext'


const SubscribeForm = lazy(() => import('../../components/subscribe/SubscribeForm'))
const CheckMoreWhatSuitsYouBest = lazy(() => import('../../components/categories/CheckMoreWhatSuitsYouBest'))
const BottomInfo = lazy(() => import('../../components/footer/BottomInfo'))



const pathBreadCrumb = [
    {
        name: 'Home',
        link: '/    ',
    },
    {
        name: 'Essential VIP Loyalty Programs',
        link: '/all-loyalties',
    },
]

const NAMETITLECATEGORYSLUG: NAMETITLECATEGORYSLUGType = {
    'loyalty-rank': { key: 'loyalty_rank', value: { min: 8, max: 10 } },
    'vip-manager': { key: 'vip_manager', value: true },
    'level-up-bonus': { key: 'level_up_bonus', value: true },
    withdrawals: { key: 'withdrawals', value: true },
    'special-prizes': { key: 'special_prizes', value: true },
    gifts: { key: 'gifts', value: true },
}

export default function AllLoyaltyLayout({
    children,


    totalPages,
}: {
    totalPages: number

    children: React.ReactNode
}) {
    const router = useRouter()
    const { setLoyaltiesFilters } = useFilterContext()

    const params = useParams()
    let loyaltie_slug: string | undefined = undefined
    let currentPage = 1

    if (Array.isArray(params?.params)) {
        if (params.params.length === 1) {
           
            if (isNaN(Number(params.params[0]))) {
                loyaltie_slug = params.params[0]
            } else {
                currentPage = Number(params.params[0])
            }
        }
        if (params.params.length === 2) {
            loyaltie_slug = params.params[0]
            currentPage = Number(params.params[1])
        }
    }

    // console.log('params', params)
    

    useEffect(() => {
        if (loyaltie_slug) {
            const { key, value } = NAMETITLECATEGORYSLUG[loyaltie_slug]

            setLoyaltiesFilters({
                ...initialLoyaltiesFilters,
                [key]: value,
            })
        }

        window.scrollTo(0, 0)

        return () => {
            setLoyaltiesFilters(initialLoyaltiesFilters)
        }
    }, [loyaltie_slug])



    return (
        <main className="gamble__loyaltie-programs main-gamble loyaltie-programs loyaltie-filtered__main">
            <div className="main-gamble__body">
                <Categories type_category={DataHomeItemsBlockEnumCategory.loyaltie_category} />
                <BreadCrumb
                    path={
                        loyaltie_slug
                            ? [
                                  ...pathBreadCrumb,
                                  {
                                      name: LOYALTIECATEGORYIES.find((item) => item.slug === loyaltie_slug)?.name || 'Loyalty Programs',
                                      link: `/all-bonuses/${loyaltie_slug}`,
                                  },
                              ]
                            : pathBreadCrumb
                    }
                />
                <section className="loyaltie-programs__main main-loyaltie-programs">
                    <div className="main-loyaltie-programs__container container">
                        <div className="main-loyaltie-programs__top top">
                            <div className="top__row">
                                <div className="top__column">
                                    <div className="top__title-block">
                                        <h2 className="top__title">
                                            {loyaltie_slug
                                                ? LOYALTIECATEGORYIES.find((item) => item.slug === loyaltie_slug)?.name
                                                : 'Essential VIP Loyalty Programs'}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {children}
                        <PaginationPage
                            //@ts-ignore
                            countElem={totalPages}
                            currentPage={Number(currentPage || 1)}
                            countPageElem={10}
                            setCurrentPage={(page) => {
                                const link = loyaltie_slug ? `/all-loyalties/${loyaltie_slug}/${page}` : `/all-loyalties/${page}`
                                router?.push(link)
                                // if (!isMobile) {
                                //     window?.scrollTo({
                                //         behavior: 'smooth',
                                //         top: 0,
                                //     })
                                // }
                            }}
                        />
                    </div>
                </section>
                <CheckMoreWhatSuitsYouBest />
                <SubscribeForm />
                <BottomInfo />
            </div>
        </main>
    )
}

'use client'

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import {
    BonusFilterBodyType,
    CasinoFilterBodyType,
    DataHomeItemsBlockCategoryType,
    DataHomeItemsBlockEnumCategory,
    FooCategorySanitazeLinkPropType,
    FooCategorySanitazeLinkReturnType,
    GetFilterDataTypeResponse,
    LoyaltiesFilterBodyType,
} from '../types'

import $api from '../http'
import { useQuery } from 'react-query'
import { baseURL, CURRENTYEAR } from '../helper'
import { useRouter } from 'next/compat/router'

export const SeeAllRoutes = {
    [DataHomeItemsBlockEnumCategory.bonus_category as DataHomeItemsBlockCategoryType]: 'bonuses',
    [DataHomeItemsBlockEnumCategory.casino_category as DataHomeItemsBlockCategoryType]: 'casinos',
    [DataHomeItemsBlockEnumCategory.loyaltie_category as DataHomeItemsBlockCategoryType]: 'loyalties',
    [DataHomeItemsBlockEnumCategory.all_category as DataHomeItemsBlockCategoryType]: '/',
}

const getDatasFilter = async () => {
    const response = await fetch(baseURL + 'get-datas-filter/', {
        method: 'GET',
        // Кеширование на сутки (24 часа)
        next: { revalidate: 86400 },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}
export const initialCasinoFilters: CasinoFilterBodyType = {
    payout_speed: [],
    casino_rank: null,
    casino_likes: null,
    sportsbook: undefined,
    tournaments: undefined,
    vpn_usage: undefined,
    bonus_hunt_with_active_bonus: undefined,
    social_bonus: undefined,
    established: null,
    casino_owner: [],
    withdrawal_limits: {
        daily: null,
        weekly: null,
        monthly: null,
        unlimited: undefined,
    },
    min_wager: null,
    min_deposit: null,
    selected_countries: [],
    accepted_currencies: [],
    payment_methods: [],
    language_live_chat: [],
    language_website: [],
    game_providers: [],
    game_types: [],
    licenses: [],
    games: [],
    responsible_gambling: [],
    live_chat_competence: [],

    unlimited_min_wager: undefined,
    unlimited_min_deposit: undefined,
    casino_name: undefined,
}
export const initialBonusFilters: BonusFilterBodyType = {
    bonus_rank: null,
    bonus_likes: null,
    bonus_min_dep: null,
    bonus_max_bet: null,
    free_spin_amount: null,
    bonus_value: null,
    bonus_amount: null,
    bonus_max_win: null,
    bonus_type: [],
    daily_availability: [],
    wagering_difficulty: [],
    selected_countries: [],
    selected_games: [],
    selected_providers: [],
    sticky: undefined,

    bonus_plus_deposit: null,
    bonus_only: null,
    deposit_only: null,
    winnings_only: null,

    unlimited_bonus_max_bet: undefined,
    unlimited_bonus_amount: undefined,
    unlimited_bonus_max_win: undefined,
}

export const initialLoyaltiesFilters: LoyaltiesFilterBodyType = {
    loyalty_rank: null,
    loyalty_level_count: null,
    vip_manager: undefined,
    level_up_bonus: undefined,
    withdrawals: undefined,
    special_prizes: undefined,
    gifts: undefined,
    bonuses: undefined,
}

export enum RouteToNextFilter {
    CASINOS = 'casinos',
    BONUS = 'bonus',
    LOYALTIES = 'loyalties',
    DEFAULT = '',
}

type FilterContextType = {
    data: GetFilterDataTypeResponse | undefined

    searchGlobal: string
    handlerSeachGlobal: (v: string) => void

    casinoFilters: CasinoFilterBodyType
    setCasinoFilters: React.Dispatch<React.SetStateAction<CasinoFilterBodyType>>

    bonusFilters: BonusFilterBodyType
    setBonusFilters: React.Dispatch<React.SetStateAction<BonusFilterBodyType>>

    loyaltiesFilters: LoyaltiesFilterBodyType
    setLoyaltiesFilters: React.Dispatch<React.SetStateAction<LoyaltiesFilterBodyType>>

    currentRouteFilter: RouteToNextFilter
    handlerCurrentRouteFilter: (v: RouteToNextFilter) => void

    handlerClearAllFilters: () => void

    fooCategorySanitazeLink: (s: FooCategorySanitazeLinkPropType) => FooCategorySanitazeLinkReturnType
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
     const router = useRouter()
    const [currentRouteFilter, setCurrentRouteFilter] = useState<RouteToNextFilter>(RouteToNextFilter.DEFAULT)

    const handlerCurrentRouteFilter = (v: RouteToNextFilter) => {
        if (currentRouteFilter !== v) {
            setCurrentRouteFilter(v)
        }
    }

    const [searchGlobal, setSeachGlobal] = useState('')

    const handlerSeachGlobal = (v: string) => setSeachGlobal(v)

    const [casinoFilters, setCasinoFilters] = useState<CasinoFilterBodyType>(initialCasinoFilters)

    const [bonusFilters, setBonusFilters] = useState<BonusFilterBodyType>(initialBonusFilters)

    const [loyaltiesFilters, setLoyaltiesFilters] = useState<LoyaltiesFilterBodyType>(initialLoyaltiesFilters)

    const handlerClearAllFilters = () => {
        handlerCurrentRouteFilter(RouteToNextFilter.DEFAULT)
        setCasinoFilters(initialCasinoFilters)
        setBonusFilters(initialBonusFilters)
        setLoyaltiesFilters(initialLoyaltiesFilters)
         router?.push('/')
    }

    const { data } = useQuery<GetFilterDataTypeResponse>('get-datas-filter', getDatasFilter, {
        staleTime: Infinity,
    })

    const fooCategorySanitazeLink = ({ type_category, slug }: FooCategorySanitazeLinkPropType): FooCategorySanitazeLinkReturnType => {
        if (slug === 'vpn-friendly-casinos') {
            return {
                seeAllLink: '/filter-casinos/vpn-friendly-casinos',
                seeAllFoo: () => {
                    setCasinoFilters({ ...initialCasinoFilters, vpn_usage: true })
                },
            }
        }
        if (slug === 'unlimited-max-bet-bonuses') {
            return {
                seeAllLink: '/filter-bonus/unlimited-max-bet-bonuses',
                seeAllFoo: () => {
                    setBonusFilters({ ...initialBonusFilters, unlimited_bonus_max_bet: true })
                },
            }
        }
        if (slug === 'non-sticky-bonuses') {
            return {
                seeAllLink: '/filter-bonus/non-sticky-bonuses',
                seeAllFoo: () => {
                    setBonusFilters({ ...initialBonusFilters, sticky: false })
                },
            }
        }
        if (slug === 'casinos-with-best-loyalties') {
            return {
                seeAllLink: '/all-loyalties/loyalty-rank',
            }
        }
        if (slug === 'newly-opened-casinos') {
            return {
                seeAllLink: '/filter-casinos/newly-opened-casinos',
                seeAllFoo: () => {
                    setCasinoFilters({ ...initialCasinoFilters, established: { min: CURRENTYEAR - 2, max: CURRENTYEAR } })
                },
            }
        }

        if (slug === 'top-ranked-casinos') {
            return {
                seeAllLink: '/filter-casinos/top-ranked-casinos',
                seeAllFoo: () => {
                    setCasinoFilters({ ...initialCasinoFilters, casino_rank: { min: 8.5, max: 10 } })
                },
            }
        }

        return { seeAllLink: `/all-${SeeAllRoutes[type_category]}${slug ? `/${slug}` : ''}`, seeAllFoo: () => {} }
    }

    const value = useMemo(
        () => ({
            data,
            searchGlobal,
            handlerSeachGlobal,
            casinoFilters,
            setCasinoFilters,
            bonusFilters,
            setBonusFilters,
            loyaltiesFilters,
            setLoyaltiesFilters,
            currentRouteFilter,
            handlerCurrentRouteFilter,
            handlerClearAllFilters,
            fooCategorySanitazeLink,
        }),
        [data, searchGlobal, casinoFilters, bonusFilters, loyaltiesFilters, currentRouteFilter],
    )

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext)
    if (!context) {
        throw new Error('useFilterContext must be used within a FilterProvider')
    }
    return context
}

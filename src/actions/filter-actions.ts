'use server'

import { redirect } from 'next/navigation'
import { CasinoFilterBodyType, BonusFilterBodyType, LoyaltiesFilterBodyType } from '@/types'

type FilterActionState = {
    error?: string
    success?: boolean
}

export async function applyCasinoFilters(
    prevState: FilterActionState,
    formData: FormData
): Promise<FilterActionState> {
    try {
        const filters: CasinoFilterBodyType = {
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
            selected_countries: [],
            licenses: [],
            games: [],
            game_types: [],
            language_website: [],
            language_live_chat: [],
            payment_methods: [],
            accepted_currencies: [],
            responsible_gambling: [],
            withdrawal_limits: {
                daily: null,
                weekly: null,
                monthly: null,
                unlimited: undefined
            },
            min_wager: null,
            min_deposit: null,
            game_providers: [],
            live_chat_competence: [],
            unlimited_min_wager: undefined,
            unlimited_min_deposit: undefined,
            casino_name: undefined,
        }

        // Отримання значень з FormData
        const casinoRankMin = formData.get('casino_rank_min')
        const casinoRankMax = formData.get('casino_rank_max')
        
        if (casinoRankMin && casinoRankMax) {
            filters.casino_rank = {
                min: Number(casinoRankMin),
                max: Number(casinoRankMax)
            }
        }

        const casinoLikesMin = formData.get('casino_likes_min')
        const casinoLikesMax = formData.get('casino_likes_max')
        
        if (casinoLikesMin && casinoLikesMax) {
            filters.casino_likes = {
                min: Number(casinoLikesMin),
                max: Number(casinoLikesMax)
            }
        }

        // Boolean поля
        const sportsbook = formData.get('sportsbook')
        if (sportsbook !== null) {
            filters.sportsbook = sportsbook === 'true'
        }

        const tournaments = formData.get('tournaments')
        if (tournaments !== null) {
            filters.tournaments = tournaments === 'true'
        }

        const vpnUsage = formData.get('vpn_usage')
        if (vpnUsage !== null) {
            filters.vpn_usage = vpnUsage === 'true'
        }

        // Масиви значень (чекбокси)
        const selectedCountries = formData.getAll('selected_countries')
        if (selectedCountries.length > 0) {
            filters.selected_countries = selectedCountries.map(id => Number(id))
        }

        const licenses = formData.getAll('licenses')
        if (licenses.length > 0) {
            filters.licenses = licenses.map(id => Number(id))
        }

        const games = formData.getAll('games')
        if (games.length > 0) {
            filters.games = games.map(id => Number(id))
        }

        const gameTypes = formData.getAll('game_types')
        if (gameTypes.length > 0) {
            filters.game_types = gameTypes.map(id => Number(id))
        }

        // Формуємо query string
        const searchParams = new URLSearchParams()
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (Array.isArray(value) && value.length > 0) {
                    searchParams.set(key, value.join(','))
                } else if (typeof value === 'object' && 'min' in value && 'max' in value) {
                    searchParams.set(`${key}_min`, value.min.toString())
                    searchParams.set(`${key}_max`, value.max.toString())
                } else if (typeof value === 'boolean') {
                    searchParams.set(key, value.toString())
                } else if (typeof value === 'number') {
                    searchParams.set(key, value.toString())
                }
            }
        })

        // Перенаправлення на сторінку з фільтрами
        redirect(`/filter-casinos?${searchParams.toString()}`)
    } catch (error) {
        console.error('Помилка при застосуванні фільтрів казино:', error)
        return {
            error: 'Помилка при застосуванні фільтрів'
        }
    }
}

export async function applyBonusFilters(
    prevState: FilterActionState,
    formData: FormData
): Promise<FilterActionState> {
    try {
        const filters: BonusFilterBodyType = {
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

        // Отримання значень з FormData
        const bonusRankMin = formData.get('bonus_rank_min')
        const bonusRankMax = formData.get('bonus_rank_max')
        
        if (bonusRankMin && bonusRankMax) {
            filters.bonus_rank = {
                min: Number(bonusRankMin),
                max: Number(bonusRankMax)
            }
        }

        // Boolean поля - прибираю неіснуючі поля
        const sticky = formData.get('sticky')
        if (sticky !== null) {
            filters.sticky = sticky === 'true'
        }

        // Wagering поля
        const depositOnly = formData.get('deposit_only')
        if (depositOnly) {
            filters.deposit_only = Number(depositOnly)
        }

        const winningsOnly = formData.get('winnings_only')
        if (winningsOnly) {
            filters.winnings_only = Number(winningsOnly)
        }

        const bonusOnly = formData.get('bonus_only')
        if (bonusOnly) {
            filters.bonus_only = Number(bonusOnly)
        }

        const bonusPlusDeposit = formData.get('bonus_plus_deposit')
        if (bonusPlusDeposit) {
            filters.bonus_plus_deposit = Number(bonusPlusDeposit)
        }

        // Масиви - використовую правильні назви полів
        const selectedCountries = formData.getAll('selected_countries')
        if (selectedCountries.length > 0) {
            filters.selected_countries = selectedCountries.map(id => Number(id))
        }

        const bonusTypes = formData.getAll('bonus_type') // правильна назва поля
        if (bonusTypes.length > 0) {
            filters.bonus_type = bonusTypes.map(id => Number(id))
        }

        const selectedGames = formData.getAll('selected_games')
        if (selectedGames.length > 0) {
            filters.selected_games = selectedGames.map(id => Number(id))
        }

        // Формуємо query string
        const searchParams = new URLSearchParams()
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (Array.isArray(value) && value.length > 0) {
                    searchParams.set(key, value.join(','))
                } else if (value && typeof value === 'object' && 'min' in value && 'max' in value) {
                    searchParams.set(`${key}_min`, (value as { min: number; max: number }).min.toString())
                    searchParams.set(`${key}_max`, (value as { min: number; max: number }).max.toString())
                } else if (typeof value === 'boolean') {
                    searchParams.set(key, value.toString())
                } else if (typeof value === 'number') {
                    searchParams.set(key, value.toString())
                }
            }
        })

        redirect(`/filter-bonuses?${searchParams.toString()}`)
    } catch (error) {
        console.error('Помилка при застосуванні фільтрів бонусів:', error)
        return {
            error: 'Помилка при застосуванні фільтрів'
        }
    }
}

export async function applyLoyaltiesFilters(
    prevState: FilterActionState,
    formData: FormData
): Promise<FilterActionState> {
    try {
        const filters: LoyaltiesFilterBodyType = {
            loyalty_rank: null,
            loyalty_level_count: null,
            vip_manager: undefined,
            level_up_bonus: undefined,
            withdrawals: undefined,
            special_prizes: undefined,
            gifts: undefined,
            bonuses: undefined,
        }

        // Range поля
        const loyaltyRankMin = formData.get('loyalty_rank_min')
        const loyaltyRankMax = formData.get('loyalty_rank_max')
        
        if (loyaltyRankMin && loyaltyRankMax) {
            filters.loyalty_rank = {
                min: Number(loyaltyRankMin),
                max: Number(loyaltyRankMax)
            }
        }

        const loyaltyLevelMin = formData.get('loyalty_level_count_min')
        const loyaltyLevelMax = formData.get('loyalty_level_count_max')
        
        if (loyaltyLevelMin && loyaltyLevelMax) {
            filters.loyalty_level_count = {
                min: Number(loyaltyLevelMin),
                max: Number(loyaltyLevelMax)
            }
        }

        // Boolean поля
        const vipManager = formData.get('vip_manager')
        if (vipManager !== null) {
            filters.vip_manager = vipManager === 'true'
        }

        const levelUpBonus = formData.get('level_up_bonus')
        if (levelUpBonus !== null) {
            filters.level_up_bonus = levelUpBonus === 'true'
        }

        const withdrawals = formData.get('withdrawals')
        if (withdrawals !== null) {
            filters.withdrawals = withdrawals === 'true'
        }

        const specialPrizes = formData.get('special_prizes')
        if (specialPrizes !== null) {
            filters.special_prizes = specialPrizes === 'true'
        }

        const gifts = formData.get('gifts')
        if (gifts !== null) {
            filters.gifts = gifts === 'true'
        }

        const bonuses = formData.get('bonuses')
        if (bonuses !== null) {
            filters.bonuses = bonuses === 'true'
        }

        // Формуємо query string
        const searchParams = new URLSearchParams()
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (value && typeof value === 'object' && 'min' in value && 'max' in value) {
                    searchParams.set(`${key}_min`, (value as { min: number; max: number }).min.toString())
                    searchParams.set(`${key}_max`, (value as { min: number; max: number }).max.toString())
                } else if (typeof value === 'boolean') {
                    searchParams.set(key, value.toString())
                }
            }
        })

        redirect(`/filter-loyalties?${searchParams.toString()}`)
    } catch (error) {
        console.error('Помилка при застосуванні фільтрів програм лояльності:', error)
        return {
            error: 'Помилка при застосуванні фільтрів'
        }
    }
}

export async function clearAllFilters(): Promise<void> {
    redirect('/')
}

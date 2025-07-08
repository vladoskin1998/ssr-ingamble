'use client'

import { useActionState } from 'react'
import { applyCasinoFilters, applyBonusFilters, applyLoyaltiesFilters } from '@/actions/filter-actions'
import { RouteToNextFilter } from '@/context/FilterContext'
import { CasinoFilterBodyType, BonusFilterBodyType, LoyaltiesFilterBodyType } from '@/types'

interface FilterFormProps {
    currentRouteFilter: RouteToNextFilter
    casinoFilters: CasinoFilterBodyType
    bonusFilters: BonusFilterBodyType
    loyaltiesFilters: LoyaltiesFilterBodyType
    children: React.ReactNode
}

export default function FilterForm({ 
    currentRouteFilter, 
    casinoFilters, 
    bonusFilters, 
    loyaltiesFilters,
    children 
}: FilterFormProps) {
    const [casinoState, casinoAction] = useActionState(applyCasinoFilters, { success: false })
    const [bonusState, bonusAction] = useActionState(applyBonusFilters, { success: false })
    const [loyaltiesState, loyaltiesAction] = useActionState(applyLoyaltiesFilters, { success: false })

    const getActionForCurrentFilter = () => {
        switch (currentRouteFilter) {
            case RouteToNextFilter.CASINOS:
                return casinoAction
            case RouteToNextFilter.BONUS:
                return bonusAction
            case RouteToNextFilter.LOYALTIES:
                return loyaltiesAction
            default:
                return casinoAction
        }
    }

    const getCurrentFilters = () => {
        switch (currentRouteFilter) {
            case RouteToNextFilter.CASINOS:
                return casinoFilters
            case RouteToNextFilter.BONUS:
                return bonusFilters
            case RouteToNextFilter.LOYALTIES:
                return loyaltiesFilters
            default:
                return casinoFilters
        }
    }

    const getCurrentState = () => {
        switch (currentRouteFilter) {
            case RouteToNextFilter.CASINOS:
                return casinoState
            case RouteToNextFilter.BONUS:
                return bonusState
            case RouteToNextFilter.LOYALTIES:
                return loyaltiesState
            default:
                return casinoState
        }
    }

    const filters = getCurrentFilters()
    const currentState = getCurrentState()

    return (
        <form action={getActionForCurrentFilter()}>
            {/* Скриті інпути для передачі всіх значень фільтрів */}
            {Object.entries(filters).map(([key, value]) => {
                if (value === null || value === undefined) return null
                
                if (Array.isArray(value)) {
                    return value.map((item, index) => (
                        <input
                            key={`${key}-${index}`}
                            type="hidden"
                            name={key}
                            value={item}
                        />
                    ))
                }
                
                if (typeof value === 'object' && 'min' in value && 'max' in value) {
                    return (
                        <div key={key}>
                            <input
                                type="hidden"
                                name={`${key}_min`}
                                value={value.min}
                            />
                            <input
                                type="hidden"
                                name={`${key}_max`}
                                value={value.max}
                            />
                        </div>
                    )
                }
                
                if (typeof value === 'boolean') {
                    return (
                        <input
                            key={key}
                            type="hidden"
                            name={key}
                            value={value.toString()}
                        />
                    )
                }
                
                if (typeof value === 'number' || typeof value === 'string') {
                    return (
                        <input
                            key={key}
                            type="hidden"
                            name={key}
                            value={value}
                        />
                    )
                }
                
                return null
            })}

            {children}
            
            {currentState.error && (
                <div className="filter-error" style={{ color: 'red', padding: '10px' }}>
                    {currentState.error}
                </div>
            )}
        </form>
    )
}

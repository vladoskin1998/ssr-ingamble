'use client'

import { RouteToNextFilter } from '@/context/FilterContext'
import { CasinoFilterBodyType, BonusFilterBodyType, LoyaltiesFilterBodyType } from '@/types'
import { LengthApplyFilter } from '@/helper'

interface SubmitFilterButtonProps {
    currentRouteFilter: RouteToNextFilter
    casinoFilters: CasinoFilterBodyType
    bonusFilters: BonusFilterBodyType
    loyaltiesFilters: LoyaltiesFilterBodyType
    onSidebarClose: () => void
}

export default function SubmitFilterButton({ 
    currentRouteFilter, 
    casinoFilters, 
    bonusFilters, 
    loyaltiesFilters,
    onSidebarClose 
}: SubmitFilterButtonProps) {
    
    const handleSubmit = () => {
        onSidebarClose()
        // Сабміт буде оброблено в обгортці FilterForm
    }

    return (
        <button
            type="submit"
            onClick={handleSubmit}
            className="bottom-form-filters__btn bottom-form-filters__btn_submit"
        >
            <span>{`Apply Filters ${LengthApplyFilter({
                currentRouteFilter,
                casinoFilters,
                bonusFilters,
                loyaltiesFilters,
            })}`}</span>
        </button>
    )
}

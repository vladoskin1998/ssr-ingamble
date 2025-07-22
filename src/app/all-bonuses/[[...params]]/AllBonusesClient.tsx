'use client'

import { useLoading } from '@/context/LoadingContext'
import SeeAllBonus from '@/pages-component/all-bonuses-page'

interface AllBonusesClientProps {
    bonusSlug: string | null
}

export default function AllBonusesClient({ bonusSlug }: AllBonusesClientProps) {
    const { setContentLoaded } = useLoading()

    return (
        <SeeAllBonus 
            bonusSlug={bonusSlug} 
            setContentLoaded={setContentLoaded}
        />
    )
}

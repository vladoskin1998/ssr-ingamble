import { LogoLoader } from '@/components/loader/LogoLoader'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import AllBonusesClient from './AllBonusesClient'

export const metadata: Metadata = {
    title: 'All Bonuses',
    description: 'All Bonuses',
}

const AllBonus = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    
    // Передаємо перший параметр як bonusSlug
    const bonusSlug = dataparam?.params?.[0] || null

    return (
        <Suspense fallback={<LogoLoader />}>
            <AllBonusesClient bonusSlug={bonusSlug} />
        </Suspense>
    )
}

export default AllBonus

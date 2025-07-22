import type { Metadata } from 'next'
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
        <AllBonusesClient bonusSlug={bonusSlug} />
    )
}

export default AllBonus

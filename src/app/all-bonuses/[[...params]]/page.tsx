import SeeAllBonus from '@/pages-component/all-bonuses-page'
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'All Bonuses',
    description: 'All Bonuses',
}

const AllBonus = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    console.log(dataparam, 'dataparam')
    
    // Передаємо перший параметр як casinoSlug
    const bonusSlug = dataparam?.params?.[0] || null

    return <SeeAllBonus bonusSlug={bonusSlug} />
}

export default AllBonus

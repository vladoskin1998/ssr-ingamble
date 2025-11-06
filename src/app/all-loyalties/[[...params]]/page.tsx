import type { Metadata } from 'next'
import AllLoyaltiesClient from '@/app/all-loyalties/[[...params]]/AllLoyaltiesClient'

export const metadata: Metadata = {
    title: 'List of best loyalty programs for VIP players | inGamble',
    description: 'We collected and observed all levels and features of each casinos loyalty program. Find best loyalties and perks for loyal players',
}

const AllLoyalties = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    
    // Передаємо перший параметр як loyaltie_slug
    const loyaltieSlug = dataparam?.params?.[0] || null

    return <AllLoyaltiesClient loyaltieSlug={loyaltieSlug} />
}

export default AllLoyalties

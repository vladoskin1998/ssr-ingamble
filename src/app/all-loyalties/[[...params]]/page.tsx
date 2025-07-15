import SeeAllEssentialsLoyalty from '@/pages-component/all-loyalties-page'
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'All Essentials Loyalty',
    description: 'All Essentials Loyalty',
}

const AllLoyalties = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    console.log(dataparam, 'dataparam')
    
    // Передаємо перший параметр як loyaltie_slug
    const loyaltieSlug = dataparam?.params?.[0] || null

    return <SeeAllEssentialsLoyalty loyaltieSlug={loyaltieSlug} />
}

export default AllLoyalties

import SeeAllEssentialsLoyalty from '@/pages-component/all-loyalties-page'
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'All Essentials Loyalty',
    description: 'All Essentials Loyalty',
}

const AllLoyalties = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    console.log(dataparam, 'dataparam')

    return <SeeAllEssentialsLoyalty />
}

export default AllLoyalties

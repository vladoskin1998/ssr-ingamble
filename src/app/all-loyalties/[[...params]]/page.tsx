import { LogoLoader } from '@/components/loader/LogoLoader'
import SeeAllEssentialsLoyalty from '@/pages-component/all-loyalties-page'
import type { Metadata } from 'next'
import { Suspense } from 'react'
export const metadata: Metadata = {
    title: 'All Essentials Loyalty',
    description: 'All Essentials Loyalty',
}

const AllLoyalties = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    
    // Передаємо перший параметр як loyaltie_slug
    const loyaltieSlug = dataparam?.params?.[0] || null

    return (
      <Suspense fallback={<LogoLoader />}>
        <SeeAllEssentialsLoyalty loyaltieSlug={loyaltieSlug} />
      </Suspense>
    )
}

export default AllLoyalties

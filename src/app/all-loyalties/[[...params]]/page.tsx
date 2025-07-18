import { LogoLoader } from '@/components/loader/LogoLoader'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import AllLoyaltiesClient from '@/app/all-loyalties/[[...params]]/AllLoyaltiesClient'

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
        <AllLoyaltiesClient loyaltieSlug={loyaltieSlug} />
      </Suspense>
    )
}

export default AllLoyalties

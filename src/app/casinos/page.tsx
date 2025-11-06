import { LogoLoader } from '@/components/loader/LogoLoader'
import MainPage from '@/pages-component/main-page'
import { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Top Casinos - Overview | inGamble',
    description: 'Explore safest and most loved online casinos. Best by inGamble and our rating',
}

export default async function Casino() {
    const src = 'get-data-hub-page-casino/'

    return (
        <Suspense fallback={<LogoLoader />}>
            <MainPage src={src} />
        </Suspense>
    )
}

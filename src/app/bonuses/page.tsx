import { LogoLoader } from '@/components/loader/LogoLoader'
import MainPage from '@/pages-component/main-page'
import { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Best Casino Bonuses 2024 | Exclusive Bonus Offers - inGamble',
    description: 'Find the best casino bonuses and exclusive offers for 2024. No deposit bonuses, welcome bonuses, and VIP rewards from top online casinos.',
    keywords: 'casino bonuses, no deposit bonus, welcome bonus, free spins, VIP rewards, casino offers, gambling bonuses',
    viewport: 'width=device-width, initial-scale=1',
    openGraph: {
        title: 'Best Casino Bonuses 2024 | Exclusive Bonus Offers - inGamble',
        description: 'Find the best casino bonuses and exclusive offers for 2024. No deposit bonuses, welcome bonuses, and VIP rewards from top online casinos.',
        type: 'website',
        siteName: 'inGamble',
        url: '/bonuses',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Casino Bonuses 2024 | Exclusive Bonus Offers - inGamble',
        description: 'Find the best casino bonuses and exclusive offers for 2024. No deposit bonuses, welcome bonuses, and VIP rewards from top online casinos.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default async function Bonuses() {
    const src = 'get-data-hub-page-bonus/'

    return (
        <Suspense fallback={<LogoLoader />}>
            <MainPage src={src} />
        </Suspense>
    )
}

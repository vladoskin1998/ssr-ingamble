// ✅ ЗМІНА: Створено layout для динамічного generateMetadata (Server Component)
import type { Metadata } from 'next'
import { GetDataBonusResponse } from '@/types'

type Props = {
    params: Promise<{ casino_slug: string; bonus_slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { casino_slug, bonus_slug } = await params
    
    try {
        // Отримуємо дані бонусу для генерації мета-тегів
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ingamble.com'}/get-data-bonus/${bonus_slug}/`)
        const data: GetDataBonusResponse = await response.json()
        
        const title = `${data.name} - ${data.casino_name} | inGamble`
        const description = `Exclusive ${data.name} bonus from ${data.casino_name}. ${data.description || 'Get the best casino bonus deals and start playing today!'}`
        
        return {
            title,
            description,
            keywords: [`${data.casino_name}`, `${data.name}`, 'casino bonus', 'online casino', 'gambling bonus'],
            openGraph: {
                title,
                description,
                type: 'website',
                siteName: 'inGamble',
                url: `/casino/${casino_slug}/bonuses/${bonus_slug}`,
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
            },
            robots: {
                index: true,
                follow: true,
            },
        }
    } catch {
        // Fallback metadata у випадку помилки
        return {
            title: `Casino Bonus | inGamble`,
            description: 'Discover exclusive casino bonuses and start playing at the best online casinos.',
            robots: { index: true, follow: true },
        }
    }
}

export default function BonusLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}

import type { Metadata } from 'next'
import $api from '@/http'
import SimpleBonus from './SimpleBonus'

type BonusResponse = {
    name: string
    bonus_slug: string
    casino_name: string
    // ...other fields if needed
}

async function getBonusData(slug: string): Promise<string | null> {
    try {
        const response = await $api.get<BonusResponse>(`get-data-bonus/${slug}/`)
        console.log('getBonusData: fetched bonus data:', response.data)
        return response.data.name || null
    } catch (error) {
        console.error('Error fetching bonus:', error)
        return null
    }
}

export async function generateMetadata(props: { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any
}): Promise<Metadata> {
    try {
        const bonusSlug = props.params.bonus_slug
        console.log('generateMetadata: bonus_slug:', bonusSlug)
        
        // Get bonus name from API
        const name = await getBonusData(bonusSlug)

        return {
            title: `${name || 'Casino Bonus'} Bonus | inGamble`,
            description: 'Find the best casino bonuses with our advanced filter.',
        }
    } catch (error) {
        console.error('Metadata generation error:', error)
        return {
            title: 'Casino Bonus | inGamble',
            description: 'Find the best casino bonuses with our advanced filter.',
        }
    }
}

export default function Page() {
    return <SimpleBonus />
}
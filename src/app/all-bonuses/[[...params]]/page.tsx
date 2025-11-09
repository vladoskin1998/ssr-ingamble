import type { Metadata } from 'next'
import AllBonusesClient from './AllBonusesClient'
import $api from '@/http'

async function getBonusData(bonusSlug: string | undefined) {
    try {
        const response = await $api.get(`get-see-all-bonus-category${bonusSlug ? '/' + bonusSlug : ''}/?page=1&page_size=10`)
        return response.data
    } catch (error) {
        console.error('Error fetching bonus data:', error)
        return null
    }
}

export async function generateMetadata({ 
    params 
}: { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any 
}): Promise<Metadata> {
    const bonusSlug = params?.params?.[0] || undefined
    const data = await getBonusData(bonusSlug)
    
    const titlePage = bonusSlug ? data?.category_name : 'All Bonuses'

    console.log('Metadata generation:', {
        bonusSlug,
        categoryData: data,
        titlePage
    })

    return {
        title: `${titlePage} | inGamble`,
        description: 'All Bonuses',
    }
}

const AllBonus = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    const bonusSlug = dataparam?.params?.[0] || null

    return (
        <AllBonusesClient bonusSlug={bonusSlug} />
    )
}

export default AllBonus
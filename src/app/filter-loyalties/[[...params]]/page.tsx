import type { Metadata } from 'next'
import $api from '@/http'
import FilterLoyalty from './FilterLoyalty'


type HomeCategory = {
    id: number
    slug: string
    name: string
}

type HomeCategoriesResponse = {
    bonus_categories: HomeCategory[]
    casino_categories: HomeCategory[]
}

async function getCategoryName(slug: string | undefined): Promise<string | null> {
    try {
        const response = await $api.get<HomeCategoriesResponse>('get-data-home-page-categories/')
        // Look in bonus_categories array instead of direct data
        const category = response.data.casino_categories.find(cat => cat.slug === slug)
        
        return category?.name || null
    } catch (error) {
        return null
    }
}

export async function generateMetadata(props: { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any
}): Promise<Metadata> {
    try {
        const resolvedParams = await (
            props.params instanceof Promise ? props.params : Promise.resolve(props.params)
        )
        const slug = resolvedParams?.params?.[0]
        
        // Get category name from home categories
        const name = await getCategoryName(slug)

        return {
            title: `${name || 'Loyalties Filter'} | inGamble`,
            description: 'Find the best casino loyalties with our advanced filter.',
        }
    } catch (error) {
        return {
            title: 'Loyalties Filter | inGamble',
            description: 'Find the best casino loyalties with our advanced filter.',
        }
    }
}

export default function Page() {
    return <FilterLoyalty />
}
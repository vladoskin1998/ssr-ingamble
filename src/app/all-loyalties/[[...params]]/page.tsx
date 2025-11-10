import type { Metadata } from 'next'
import { LOYALTIECATEGORYIES } from '@/helper'
import AllLoyaltiesClient from '@/app/all-loyalties/[[...params]]/AllLoyaltiesClient'


export async function generateMetadata(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { params }: { params: any }
): Promise<Metadata> {
    try {
        const slug = params?.params?.[0]
        console.log('generateMetadata: slug:', slug)
        
        // Get name from LOYALTIECATEGORYIES array
        const name = LOYALTIECATEGORYIES.find(item => item.slug === slug)?.name || 'Essential VIP Loyalty Programs'
        console.log('generateMetadata: name from LOYALTIECATEGORYIES:', name)

        return {
            title: `${name} Casino Loyalties | inGamble`,
            description: 'Find the best casino VIP programs and loyalty rewards.',
        }
    } catch (error) {
        console.error('Metadata generation error:', error)
        return {
            title: 'Essential VIP Loyalty Programs | inGamble',
            description: 'Find the best casino VIP programs and loyalty rewards.',
        }
    }
}

const AllLoyalties = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    const loyaltieSlug = dataparam?.params?.[0] || null
    console.log('AllLoyalties component: loyaltieSlug:', loyaltieSlug)

    return <AllLoyaltiesClient loyaltieSlug={loyaltieSlug} />
}

export default AllLoyalties
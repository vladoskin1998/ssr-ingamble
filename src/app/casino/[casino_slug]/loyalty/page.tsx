import { Metadata } from 'next'
import $api from '@/http'
import SimpleLoyaltie from './SimpleLoyalties'

export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any   
): Promise<Metadata> {
  const slug = params.casino_slug

    try {
        const response = await $api.get(`get-data-loyalty-program/${slug}/`)

        const loyaltyData = response.data
        
        // Get first two paragraphs from review/description
        const reviewText = loyaltyData.description || ''
        const firstTwoParagraphs = reviewText.split(/\n\s*\n/).slice(0, 2).join('\n\n').trim()
        
        const metadata = {
            title: `${loyaltyData.casino_name} Review | inGamble`,
            description: firstTwoParagraphs || 'Learn about VIP loyalty program benefits and rewards.',
            openGraph: {
                title: `${loyaltyData.casino_name || 'Casino'} Review | inGamble`,
                description: firstTwoParagraphs || 'Learn about VIP loyalty program benefits and rewards.',
                url: `/casino/${slug}/loyalty`,
                siteName: 'inGamble',
            }
        }
        
        return metadata
    } catch (error) {
        return {
            title: 'VIP Loyalty Program Review | inGamble',
            description: 'Learn about casino VIP loyalty program benefits and rewards.',
        }
    }
}

export default function Page() {
    return <SimpleLoyaltie />
}
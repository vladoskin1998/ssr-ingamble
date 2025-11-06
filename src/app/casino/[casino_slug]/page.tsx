import { Metadata } from 'next'
import $api from '@/http'
import SimpleCasinos from './SimpleCasinos'

export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any   
): Promise<Metadata> {
    const slug = params.casino_slug 

    try {
        const response = await $api.get(`get-data-casino/${slug}/`)
        const casinoData = response.data
        
        // Get first two paragraphs from review field
        const reviewText = casinoData.review || ''
        const firstTwoParagraphs = reviewText.split(/\n\s*\n/).slice(0, 2).join('\n\n').trim()

        return {
            title: `${casinoData.name || 'Casino'} Review | inGamble`,
            description: firstTwoParagraphs || 'Read our detailed casino review.',
            openGraph: {
                title: `${casinoData.name || 'Casino'} Review | inGamble`,
                description: firstTwoParagraphs || 'Read our detailed casino review.',
                url: `/casino/${slug}`,
                siteName: 'inGamble',
            }
        }
    } catch (error) {
        return {
            title: 'Casino Review | inGamble',
            description: 'Read our detailed casino review on inGamble.',
        }
    }
}

export default function Page() {
    return <SimpleCasinos />
}
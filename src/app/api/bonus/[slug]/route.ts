import { NextResponse } from 'next/server'
import $api from '@/http'

// API route для отримання даних бонусу за slug
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const response = await $api.get(`get-data-bonus/${slug}/`)
        
        return NextResponse.json(response.data, {
            headers: {
                'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
            },
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch bonus data' },
            { status: 500 }
        )
    }
}

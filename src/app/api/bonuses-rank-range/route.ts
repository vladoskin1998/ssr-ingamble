import { NextResponse } from 'next/server'
import $api from '@/http'

// API route для отримання бонусів в рейтингу
export async function GET() {
    try {
        const response = await $api.get('bonuses-in-rank-range/')
        
        return NextResponse.json(response.data, {
            headers: {
                'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
            },
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch bonuses in rank range' },
            { status: 500 }
        )
    }
}

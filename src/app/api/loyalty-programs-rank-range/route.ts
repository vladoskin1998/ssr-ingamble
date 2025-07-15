import { NextResponse } from 'next/server'
import $api from '@/http'

// API route для отримання програм лояльності в рейтингу
export async function GET() {
    try {
        const response = await $api.get('loyalty-programs-in-rank-range/')
        
        return NextResponse.json(response.data, {
            headers: {
                'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
            },
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch loyalty programs in rank range' },
            { status: 500 }
        )
    }
}

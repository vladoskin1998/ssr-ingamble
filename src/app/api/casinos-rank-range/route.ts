import { NextResponse } from 'next/server'
import $api from '@/http'

// API route для отримання казино в рейтингу
export async function GET() {
    try {
        const response = await $api.get('casinos-in-rank-range/')
        
        return NextResponse.json({ 
            dataCasinosRes: response.data 
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
            },
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch casinos in rank range' },
            { status: 500 }
        )
    }
}

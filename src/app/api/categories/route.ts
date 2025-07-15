import { NextResponse } from 'next/server'
import $api from '@/http'

// API route для отримання категорій головної сторінки
export async function GET() {
    try {
        const response = await $api.get('get-data-home-page-categories/')
        
        return NextResponse.json(response.data, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        )
    }
}

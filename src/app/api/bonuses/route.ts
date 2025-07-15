import { NextResponse } from 'next/server'
import $api from '@/http'

// API route для отримання всіх бонусів з категорією
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const page = searchParams.get('page') || '1'
        const pageSize = searchParams.get('page_size') || '20'
        const slug = searchParams.get('slug')
        
        const endpoint = `get-see-all-bonus-category${slug ? '/' + slug : ''}/?page=${page}&page_size=${pageSize}`
        const response = await $api.get(endpoint)
        
        return NextResponse.json(response.data, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=1800',
            },
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch bonuses' },
            { status: 500 }
        )
    }
}

import { NextResponse } from 'next/server'
import $api from '@/http'
import { filterEmptyValues } from '@/helper'

// API route для фільтрації бонусів
export async function POST(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const page = searchParams.get('page') || '1'
        const pageSize = searchParams.get('page_size') || '20'
        
        const body = await request.json()
        const cleanBody = filterEmptyValues(body)
        
        const response = await $api.post(`filter/bonus/?page=${page}&page_size=${pageSize}`, cleanBody)
        
        return NextResponse.json(response.data, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
            },
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to filter bonuses' },
            { status: 500 }
        )
    }
}

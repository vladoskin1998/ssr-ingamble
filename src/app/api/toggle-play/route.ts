import { NextResponse } from 'next/server'
import $api from '@/http'

// API route для отримання налаштувань toggle play
export async function GET() {
    try {
        const response = await $api.get('get-toggle-play/')
        
        return NextResponse.json(response.data, {
            headers: {
                'Cache-Control': 'public, s-maxage=7200, stale-while-revalidate=86400',
            },
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch toggle play settings' },
            { status: 500 }
        )
    }
}

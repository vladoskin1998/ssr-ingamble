import { NextResponse } from 'next/server'
import $api from '@/http'

export async function GET() {
    try {
        const response = await $api.get('get-block-by-country/')
        
        return NextResponse.json(response.data, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        })
    } catch {
        return NextResponse.json(null, { status: 200 })
    }
}

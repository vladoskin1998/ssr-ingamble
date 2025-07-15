import { NextResponse } from 'next/server'
import $api from '@/http'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const src = searchParams.get('src') || 'get-data-home-page/'
        
        const response = await $api.get(src)
        
        return NextResponse.json({
            dataHome: response.data?.data_blocks || [],
            dataHomeMobile: response.data?.data_blocks_m || [],
            headers: response.headers,
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
            },
        })
    } catch {
        return NextResponse.json({
            dataHome: [],
            dataHomeMobile: [],
            headers: {},
        }, { status: 200 })
    }
}

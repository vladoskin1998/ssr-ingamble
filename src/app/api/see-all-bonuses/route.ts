import { NextRequest, NextResponse } from 'next/server'
import $api from '@/http'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const page = searchParams.get('page') || '1'
    const pageSize = searchParams.get('page_size') || '10'
    
    const endpoint = `get-see-all-bonus-category${slug ? '/' + slug : ''}/?page=${page}&page_size=${pageSize}`
    const response = await $api.get(endpoint)
    
    return NextResponse.json(response.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bonuses data' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import $api from '@/http'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('page_size') || '10')
    
    // Отримуємо дані з того ж ендпоінту, що й сторінка казино
    const response = await $api.get('get-data-hub-page-casino/')
    
    if (!response.data?.data_blocks) {
      return NextResponse.json({
        casino: {
          results: [],
          count: 0,
          next: null,
          previous: null
        }
      })
    }
    
    // Знаходимо блок типу 11 (BlockType11)
    const blockType11 = response.data.data_blocks.find((block: any) => 
      block.items_block?.type_block === 11
    )
    
    if (!blockType11 || !blockType11.items_block?.data_cards) {
      return NextResponse.json({
        casino: {
          results: [],
          count: 0,
          next: null,
          previous: null
        }
      })
    }
    
    // Отримуємо казино з 6 по 12 (блок "Best Crypto Casinos")
    const cryptoCasinos = blockType11.items_block.data_cards.slice(6, 12)
    
    // Конвертуємо формат даних до формату, який очікує SeeAllCasinos
    const convertedCasinos = cryptoCasinos.map((item: any) => ({
      id: item.casino_info?.casino_id,
      casino_name: item.casino_info?.casino_name,
      casino_slug: item.casino_info?.casino_slug,
      casino_image: item.casino_info?.casino_image,
      casino_rank: item.casino_info?.casino_rank,
      casino_affiliate_link: item.casino_info?.casino_affiliate_link,
      // Додаємо інші поля, які можуть бути потрібні
      withdrawal: item.casino_info?.withdrawal || null,
      total_bonuses: item.casino_info?.total_bonuses || 0,
      total_games: item.casino_info?.total_games || 0,
      // і т.д.
    }))
    
    // Пагінація
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedResults = convertedCasinos.slice(startIndex, endIndex)
    
    const totalCount = convertedCasinos.length
    const hasNext = endIndex < totalCount
    const hasPrevious = page > 1
    
    return NextResponse.json({
      casino: {
        results: paginatedResults,
        count: totalCount,
        next: hasNext ? `?page=${page + 1}&page_size=${pageSize}` : null,
        previous: hasPrevious ? `?page=${page - 1}&page_size=${pageSize}` : null
      }
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    })
  } catch (error) {
    console.error('Error fetching crypto casinos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch crypto casinos data' },
      { status: 500 }
    )
  }
}

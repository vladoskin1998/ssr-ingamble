import { NextResponse } from 'next/server'
import $api from '@/http'

// API route для отримання даних для фільтрів
export async function GET() {
    try {
        // Отримуємо дані з зовнішнього API
        const response = await $api.get('get-datas-filter/')
        
        return NextResponse.json(response.data, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
            },
        })
    } catch (error) {
        console.error('Error fetching filter data:', error)
        
        // Повертаємо заглушку з мінімальними даними, щоб сайт не ламався
        const fallbackData = {
            casino: {
                casino_owner: [
                    { id: 1, name: "Dama N.V." },
                    { id: 2, name: "Rabidi N.V." },
                    { id: 3, name: "Direx N.V." },
                    { id: 4, name: "Hollycorn N.V." },
                    { id: 5, name: "Gammix Limited" },
                ],
                countries: [],
                licenses: [],
                game_providers: [],
                game_types: [],
                games: [],
                language: [],
                payment_methods: [],
                classic_currency: [],
                max_casino_likes_value: 100000,
            },
            bonus: {
                countries: [],
                games: [],
                providers: [],
            },
            general: {
                countries: [],
            }
        }
        
        return NextResponse.json(fallbackData, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            },
        })
    }
}

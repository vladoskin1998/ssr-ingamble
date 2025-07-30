import { NextResponse } from 'next/server'

// Типи для даних казино
interface CasinoOwner {
    id: number
    name: string
}

interface Country {
    id: number
    name: string
    code?: string
}

interface License {
    id: number
    name: string
}

interface Provider {
    id: number
    name: string
    slug?: string
}

interface Payment {
    id: number
    name: string
    slug?: string
}

interface Currency {
    id: number
    name: string
    code?: string
}

interface Casino {
    casino_owner?: CasinoOwner
    countries?: Country[]
    license?: License[]
    providers?: Provider[]
    payment?: Payment[]
    currencies?: Currency[]
    casino_rank?: number
}

// API route для створення даних фільтрів на основі існуючих даних казино
export async function GET() {
    try {
        // Отримуємо дані казино з локального API
        const casinosResponse = await fetch('http://localhost:3002/api/casinos')
        const casinosData = await casinosResponse.json()
        const casinos: Casino[] = casinosData.casino?.results || []
        
        // Витягуємо унікальні значення для фільтрів
        const casinoOwners = new Map<number, CasinoOwner>()
        const countries = new Map<number, Country>()
        const licenses = new Map<number, License>()
        const gameProviders = new Map<number, Provider>()
        const paymentMethods = new Map<number, Payment>()
        const currencies = new Map<number, Currency>()
        
        casinos.forEach((casino: Casino) => {
            // Casino owners
            if (casino.casino_owner?.name) {
                casinoOwners.set(casino.casino_owner.id, {
                    id: casino.casino_owner.id,
                    name: casino.casino_owner.name
                })
            }
            
            // Countries
            if (casino.countries && Array.isArray(casino.countries)) {
                casino.countries.forEach((country: Country) => {
                    if (country.id && country.name) {
                        countries.set(country.id, {
                            id: country.id,
                            name: country.name,
                            code: country.code || undefined
                        })
                    }
                })
            }
            
            // Licenses
            if (casino.license && Array.isArray(casino.license)) {
                casino.license.forEach((license: License) => {
                    if (license.id && license.name) {
                        licenses.set(license.id, {
                            id: license.id,
                            name: license.name
                        })
                    }
                })
            }
            
            // Game providers
            if (casino.providers && Array.isArray(casino.providers)) {
                casino.providers.forEach((provider: Provider) => {
                    if (provider.id && provider.name) {
                        gameProviders.set(provider.id, {
                            id: provider.id,
                            name: provider.name,
                            slug: provider.slug || undefined
                        })
                    }
                })
            }
            
            // Payment methods
            if (casino.payment && Array.isArray(casino.payment)) {
                casino.payment.forEach((payment: Payment) => {
                    if (payment.id && payment.name) {
                        paymentMethods.set(payment.id, {
                            id: payment.id,
                            name: payment.name,
                            slug: payment.slug || undefined
                        })
                    }
                })
            }
            
            // Currencies
            if (casino.currencies && Array.isArray(casino.currencies)) {
                casino.currencies.forEach((currency: Currency) => {
                    if (currency.id && currency.name) {
                        currencies.set(currency.id, {
                            id: currency.id,
                            name: currency.name,
                            code: currency.code || undefined
                        })
                    }
                })
            }
        })
        
        // Формуємо відповідь у форматі, який очікує FilterContext
        const filterData = {
            casino: {
                casino_owner: Array.from(casinoOwners.values()).sort((a, b) => a.name.localeCompare(b.name)),
                countries: Array.from(countries.values()).sort((a, b) => a.name.localeCompare(b.name)),
                licenses: Array.from(licenses.values()).sort((a, b) => a.name.localeCompare(b.name)),
                game_providers: Array.from(gameProviders.values()).sort((a, b) => a.name.localeCompare(b.name)),
                payment_methods: Array.from(paymentMethods.values()).sort((a, b) => a.name.localeCompare(b.name)),
                classic_currency: Array.from(currencies.values()).sort((a, b) => a.name.localeCompare(b.name)),
                // Додаткові поля, які можуть знадобитися
                game_types: [],
                games: [],
                language: [],
                max_casino_likes_value: Math.max(...casinos.map((c: Casino) => c.casino_rank || 0), 100000),
            },
            bonus: {
                countries: Array.from(countries.values()),
                games: [],
                providers: Array.from(gameProviders.values()),
            },
            general: {
                countries: Array.from(countries.values()),
            }
        }
        
        return NextResponse.json(filterData, {
            headers: {
                'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=900',
            },
        })
        
    } catch (error) {
        console.error('Error building filter data from casinos:', error)
        
        return NextResponse.json(
            { error: 'Failed to fetch filter data' },
            { status: 500 }
        )
    }
}

import type { Metadata } from 'next'
import AllCasinosClient from './AllCasinosClient'

export const metadata: Metadata = {
    title: 'All Casinos',
    description: 'All Casinos',
}

const AllCasinos = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    
    // Передаємо перший параметр як casinoSlug
    const casinoSlug = dataparam?.params?.[0] || null

    return (
        <AllCasinosClient casinoSlug={casinoSlug} />
    )
}

export default AllCasinos

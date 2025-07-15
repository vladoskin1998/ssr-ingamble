import SeeAllCasinos from '@/pages-component/all-casinos-page'
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'All Casinos',
    description: 'All Casinos',
}

const AllCasinos = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    console.log(dataparam, 'dataparam')
    
    // Передаємо перший параметр як casinoSlug
    const casinoSlug = dataparam?.params?.[0] || null

    return <SeeAllCasinos casinoSlug={casinoSlug} />
}

export default AllCasinos

import SeeAllCasinos from '@/components/SeeAllCasinos'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'All Casinos',
    description: 'All Casinos - Find the best online casinos',
}

function getSlugAndPage(dataparam?: { params: string[] }) {
    let casino_slug: string | undefined = undefined
    let currentPage: number = 1

    if (!dataparam || !dataparam.params) {
        return { casino_slug, currentPage }
    }

    const { params } = dataparam

    if (Array.isArray(params)) {
        if (params.length === 1) {
            // либо slug, либо страница
            if (isNaN(Number(params[0]))) {
                casino_slug = params[0]
            } else {
                currentPage = Number(params[0])
            }
        }
        if (params.length === 2) {
            casino_slug = params[0]
            currentPage = Number(params[1])
        }
    }

    return { casino_slug, currentPage }
}

const AllCasinos = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    const { casino_slug, currentPage } = getSlugAndPage(dataparam)
    console.log(dataparam, 'dataparam')

    return <SeeAllCasinos casino_slug={casino_slug} currentPage={Number(currentPage)} />
}

export default AllCasinos
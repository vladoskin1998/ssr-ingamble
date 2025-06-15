import SeeAllEssentialsLoyalty from '@/pages-component/all-loyalties-page'
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'All Essentials Loyalty',
    description: 'All Essentials Loyalty',
}

function getSlugAndPage(dataparam?: { params: string[] }) {
    let loyaltie_slug: string | undefined = undefined
    let currentPage: number = 1

    if (!dataparam || !dataparam.params) {
        return { loyaltie_slug, currentPage }
    }

    const { params } = dataparam

    

    if (Array.isArray(params)) {
        if (params.length === 1) {
            // либо slug, либо страница
            if (isNaN(Number(params[0]))) {
                loyaltie_slug = params[0]
            } else {
                currentPage = Number(params[0])
            }
        }
        if (dataparam.params.length === 2) {
            loyaltie_slug = params[0]
            currentPage = Number(params[1])
        }
    }

    return { loyaltie_slug, currentPage }
}

const AllLoyalties = async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    const { loyaltie_slug, currentPage } = getSlugAndPage(dataparam)
    console.log(dataparam, 'dataparam')

    return <SeeAllEssentialsLoyalty loyaltie_slug={loyaltie_slug} currentPage={Number(currentPage)} />
}

export default AllLoyalties

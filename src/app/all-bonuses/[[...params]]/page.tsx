'use client'
import SeeAllBonus from '@/components/SeeAllBonuses/index'
import type { Metadata } from 'next'
// export const metadata: Metadata = {
//     title: 'All Essentials Bonuses',
//     description: 'All Essentials Bonuses',
// }

function getSlugAndPage(dataparam?: { params: string[] }) {
    let bonus_slug: string | undefined = undefined
    let currentPage: number = 1

    if (!dataparam || !dataparam.params) {
        return { bonus_slug, currentPage }
    }

    const { params } = dataparam

    

    if (Array.isArray(params)) {
        if (params.length === 1) {
            // либо slug, либо страница
            if (isNaN(Number(params[0]))) {
              bonus_slug = params[0]
            } else {
                currentPage = Number(params[0])
            }
        }
        if (dataparam.params.length === 2) {
          bonus_slug = params[0]
            currentPage = Number(params[1])
        }
    }

    return { bonus_slug, currentPage }
}

const AllBonus= async ({ params }: { params: Promise<{ params: string[] }> }) => {
    const dataparam = await params
    const { bonus_slug, currentPage } = getSlugAndPage(dataparam)
    console.log(dataparam, 'dataparam')

    return <SeeAllBonus bonus_slug={bonus_slug} currentPage={Number(currentPage)} />
}

export default AllBonus

'use client'

import Link from 'next/link'
import { DataHomeItemsBlockCategoryType } from '../../types'
import { useFilterContext } from '../../context/FilterContext'

export const SeeAllButton = (prop: { type_category: DataHomeItemsBlockCategoryType; slug: string }) => {
    const { fooCategorySanitazeLink } = useFilterContext()

    const { seeAllLink, seeAllFoo } = fooCategorySanitazeLink(prop)

    return (
        <Link href={seeAllLink} onClick={seeAllFoo} aria-label="Put your description here." className="top__btn">
            <span>See All</span>
            <span className="top__btn-arrow">
                <svg>
                    <use xlinkHref="#arrow"></use>
                </svg>
            </span>
        </Link>
    )
}

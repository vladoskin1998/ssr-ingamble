'use client'

import { clearAllFilters } from '@/actions/filter-actions'
import Image from 'next/image'

export default function ClearAllButton() {
    return (
        <form action={clearAllFilters}>
            <button type="submit" className="bottom-form-filters__btn bottom-form-filters__btn_reset">
                <span className="bottom-form-filters__btn-icon">
                    <Image alt={'clear-all.svg'} src='/img/icons/clear-all.svg' width={20} height={20} loading="lazy" />
                </span>
                <span>Clear All</span>
            </button>
        </form>
    )
}

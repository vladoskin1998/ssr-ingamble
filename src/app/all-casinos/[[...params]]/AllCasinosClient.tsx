'use client'

import { useLoading } from '@/context/LoadingContext'
import SeeAllCasinos from '@/pages-component/all-casinos-page'

interface AllCasinosClientProps {
    casinoSlug: string | null
}

export default function AllCasinosClient({ casinoSlug }: AllCasinosClientProps) {
    const { setContentLoaded } = useLoading()

    return (
        <SeeAllCasinos 
            casinoSlug={casinoSlug} 
            setContentLoaded={setContentLoaded}
        />
    )
}

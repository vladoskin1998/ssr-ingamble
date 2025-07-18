'use client'

import { useLoading } from '@/context/LoadingContext'
import SeeAllEssentialsLoyalty from '@/pages-component/all-loyalties-page'

interface AllLoyaltiesClientProps {
    loyaltieSlug: string | null
}

export default function AllLoyaltiesClient({ loyaltieSlug }: AllLoyaltiesClientProps) {
    const { setContentLoaded } = useLoading()

    return (
        <SeeAllEssentialsLoyalty 
            loyaltieSlug={loyaltieSlug} 
            setContentLoaded={setContentLoaded}
        />
    )
}

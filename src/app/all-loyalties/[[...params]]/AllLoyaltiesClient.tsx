'use client'

import { useCallback } from 'react'
import { usePageLoading } from '@/hooks/usePageLoading'
import SeeAllEssentialsLoyalty from '@/pages-component/all-loyalties-page'

interface AllLoyaltiesClientProps {
    loyaltieSlug: string | null
}

export default function AllLoyaltiesClient({ loyaltieSlug }: AllLoyaltiesClientProps) {
    // Логіка управління глобальним лоадером
    const { markAsLoaded } = usePageLoading({
        autoComplete: false, // Ручне керування
        dependencies: [loyaltieSlug]
    })

    // Колбек для компонента, коли контент готовий
    const handleContentReady = useCallback((isLoading: boolean, dataLength: number) => {
        if (!isLoading && dataLength >= 0) {
            const timer = setTimeout(() => {
                markAsLoaded()
            }, 600) // Невелика затримка для плавності
            
            return () => clearTimeout(timer)
        }
    }, [markAsLoaded])

    return (
        <SeeAllEssentialsLoyalty 
            loyaltieSlug={loyaltieSlug} 
            onContentReady={handleContentReady}
        />
    )
}

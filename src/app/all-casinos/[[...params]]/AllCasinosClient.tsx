'use client'

import { useCallback } from 'react'
import { usePageLoading } from '@/hooks/usePageLoading'
import SeeAllCasinos from '@/pages-component/all-casinos-page'

interface AllCasinosClientProps {
    casinoSlug: string | null
}

export default function AllCasinosClient({ casinoSlug }: AllCasinosClientProps) {
    // Логіка управління глобальним лоадером
    const { markAsLoaded } = usePageLoading({
        autoComplete: false, // Ручне керування
        dependencies: [casinoSlug]
    })

    // Колбек для компонента, коли контент готовий - використовуємо старий підхід
    const handleContentReady = useCallback((isLoading: boolean, dataLength: number) => {
        if (!isLoading && dataLength >= 0) {
            // Затримка для завершення рендерингу
            const timer = setTimeout(() => {
                markAsLoaded()
            }, 800) // Стара затримка для casinos
            
            return () => clearTimeout(timer)
        }
        return undefined
    }, [markAsLoaded])

    return (
        <SeeAllCasinos 
            casinoSlug={casinoSlug} 
            onContentReady={handleContentReady}
        />
    )
}

'use client'

import { useCallback } from 'react'
import { usePageLoading } from '@/hooks/usePageLoading'
import SeeAllBonus from '@/pages-component/all-bonuses-page'

interface AllBonusesClientProps {
    bonusSlug: string | null
}

export default function AllBonusesClient({ bonusSlug }: AllBonusesClientProps) {
    // Логіка управління глобальним лоадером
    const { markAsLoaded } = usePageLoading({
        autoComplete: false, // Ручне керування
        dependencies: [bonusSlug]
    })

    // Колбек для компонента, коли контент готовий
    const handleContentReady = useCallback((isLoading: boolean, dataLength: number) => {
        if (!isLoading && dataLength >= 0) {
            const timer = setTimeout(() => {
                markAsLoaded()
            }, 800) // Затримка для плавності
            
            return () => clearTimeout(timer)
        }
        // Якщо ще завантажується, повертаємо undefined (cleanup function не потрібна)
        return undefined
    }, [markAsLoaded])

    return (
        <SeeAllBonus 
            bonusSlug={bonusSlug} 
            onContentReady={handleContentReady}
        />
    )
}

'use client'

import { useCallback, useRef, useEffect } from 'react'
import { usePageLoading } from '@/hooks/usePageLoading'
import SeeAllEssentialsLoyalty from '@/pages-component/all-loyalties-page'

interface AllLoyaltiesClientProps {
    loyaltieSlug: string | null
}

export default function AllLoyaltiesClient({ loyaltieSlug }: AllLoyaltiesClientProps) {
    const contentRef = useRef<HTMLElement>(null)
    
    // Логіка управління глобальним лоадером
    const { markAsLoaded } = usePageLoading({
        autoComplete: false, // Ручне керування
        dependencies: [loyaltieSlug]
    })

    // IntersectionObserver для виявлення коли контент повністю відрендерений та видимий
    useEffect(() => {
        if (!contentRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                        // Використовуємо requestAnimationFrame для гарантії що рендеринг завершено
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                markAsLoaded()
                                observer.disconnect() // Відключаємо observer після першого спрацювання
                            })
                        })
                    }
                })
            },
            {
                threshold: 0.1, // Спрацьовує коли 10% контенту видимо
                rootMargin: '50px' // Додатковий запас
            }
        )

        observer.observe(contentRef.current)

        return () => {
            observer.disconnect()
        }
    }, [markAsLoaded])

    // Fallback колбек для компонента (якщо IntersectionObserver не спрацює)
    const handleContentReady = useCallback((isLoading: boolean, dataLength: number) => {
        if (!isLoading && dataLength >= 0) {
            // Fallback затримка якщо IntersectionObserver не спрацював
            const timer = setTimeout(() => {
                markAsLoaded()
            }, 1500) // Більша затримка для fallback
            
            return () => clearTimeout(timer)
        }
        return undefined
    }, [markAsLoaded])

    return (
        <SeeAllEssentialsLoyalty 
            ref={contentRef}
            loyaltieSlug={loyaltieSlug} 
            onContentReady={handleContentReady}
        />
    )
}

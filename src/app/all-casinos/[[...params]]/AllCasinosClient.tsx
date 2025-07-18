'use client'

import { useCallback, useRef, useEffect } from 'react'
import { usePageLoading } from '@/hooks/usePageLoading'
import SeeAllCasinos from '@/pages-component/all-casinos-page'

interface AllCasinosClientProps {
    casinoSlug: string | null
}

export default function AllCasinosClient({ casinoSlug }: AllCasinosClientProps) {
    const contentRef = useRef<HTMLElement>(null)
    
    // Логіка управління глобальним лоадером
    const { markAsLoaded } = usePageLoading({
        autoComplete: false, // Ручне керування
        dependencies: [casinoSlug]
    })

    // IntersectionObserver для виявлення коли контент повністю відрендерений та видимий
    useEffect(() => {
        if (!contentRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                        // Додаткова затримка щоб переконатися що все відрендерилося
                        setTimeout(() => {
                            markAsLoaded()
                            observer.disconnect() // Відключаємо observer після першого спрацювання
                        }, 300)
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
        <SeeAllCasinos 
            ref={contentRef}
            casinoSlug={casinoSlug} 
            onContentReady={handleContentReady}
        />
    )
}

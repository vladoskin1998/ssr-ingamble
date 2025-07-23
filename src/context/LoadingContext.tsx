'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { LogoLoader } from '@/components/loader/LogoLoader'

interface LoadingContextType {
    isGlobalLoading: boolean
    startLoading: () => void
    stopLoading: () => void
    setContentLoaded: () => void
    isContentLoaded: boolean
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isGlobalLoading, setIsGlobalLoading] = useState(true) // Починаємо з true для показу лоадера при завантаженні
    const [isContentLoaded, setIsContentLoaded] = useState(false)
    const [navigationStarted, setNavigationStarted] = useState(false)
    const pathname = usePathname()

    // Функція для початку завантаження
    const startLoading = useCallback(() => {
        setIsGlobalLoading(true)
        setIsContentLoaded(false)
        setNavigationStarted(true)
    }, [])

    // Функція для зупинки завантаження
    const stopLoading = useCallback(() => {
        setIsGlobalLoading(false)
        setNavigationStarted(false)
    }, [])

    // Функція для позначення що контент завантажено
    const setContentLoaded = useCallback(() => {
        setIsContentLoaded(true)
        // Невелика затримка для плавності переходу
        setTimeout(() => {
            setIsGlobalLoading(false)
            setNavigationStarted(false)
        }, 300)
    }, [])

    // Слухач зміни маршруту
    useEffect(() => {
        // Якщо навігація розпочалась і змінився pathname, запускаємо лоадер
        if (navigationStarted) {
            setIsGlobalLoading(true)
            setIsContentLoaded(false)
        }
    }, [pathname, navigationStarted])

    // Слухач оновлення сторінки (refresh)
    useEffect(() => {
        const handleBeforeUnload = () => {
            // Запускаємо лоадер при оновленні сторінки
            setIsGlobalLoading(true)
            setIsContentLoaded(false)
            setNavigationStarted(true)
        }

        // Слухач для виявлення що сторінка завантажується (після refresh)
        const handleLoad = () => {
            // При завантаженні сторінки показуємо лоадер
            setIsGlobalLoading(true)
            setIsContentLoaded(false)
            setNavigationStarted(true)
        }

        // Додаємо слухачі тільки на клієнті
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', handleBeforeUnload)
            
            // Якщо сторінка завантажується (включаючи refresh)
            if (document.readyState === 'loading') {
                handleLoad()
            }
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('beforeunload', handleBeforeUnload)
            }
        }
    }, [])

    // Слухач готовності DOM для автоматичного запуску лоадера при refresh
    useEffect(() => {
        // При першому завантаженні компонента завжди показуємо лоадер
        setIsGlobalLoading(true)
        setIsContentLoaded(false)
        setNavigationStarted(true)

        // Якщо документ ще завантажується, продовжуємо показувати лоадер
        if (typeof window !== 'undefined') {
            const handleDOMContentLoaded = () => {
                // DOM завантажено, але ресурси можуть ще завантажуватися
                // Лоадер буде вимкнено через setContentLoaded в компонентах
            }

            const handleLoad = () => {
                // Вся сторінка завантажена
                // Лоадер буде вимкнено через setContentLoaded в компонентах
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
            }
            
            if (document.readyState !== 'complete') {
                window.addEventListener('load', handleLoad)
            }

            return () => {
                document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
                window.removeEventListener('load', handleLoad)
            }
        }
    }, []) // Виконується тільки один раз при монтуванні

    // ВИДАЛЕНО автоматичне зупинення - тепер тільки ручне керування!
    
    // Fallback для сторінок без ручного керування (безпечна затримка)
    useEffect(() => {
        if (navigationStarted && isGlobalLoading) {
            // Максимальний час показу лоадера - 5 секунд
            const fallbackTimer = setTimeout(() => {
                console.warn('LoadingContext: Fallback timeout reached - stopping loader automatically')
                setContentLoaded()
            }, 5000)

            return () => clearTimeout(fallbackTimer)
        }
    }, [navigationStarted, isGlobalLoading, setContentLoaded])

    const value = {
        isGlobalLoading,
        startLoading,
        stopLoading,
        setContentLoaded,
        isContentLoaded,
    }

    return (
        <LoadingContext.Provider value={value}>
            {children}
            {/* Глобальний лоадер */}
            {isGlobalLoading && <LogoLoader />}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext)
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider')
    }
    return context
}

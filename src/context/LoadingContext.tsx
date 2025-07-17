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
    const [isGlobalLoading, setIsGlobalLoading] = useState(false)
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

    // Автоматичне зупинення лоадера після зміни маршруту
    useEffect(() => {
        if (navigationStarted) {
            const timer = setTimeout(() => {
                setIsContentLoaded(true)
                setTimeout(() => {
                    setIsGlobalLoading(false)
                    setNavigationStarted(false)
                }, 300)
            }, 100) // Мінімальний час показу лоадера

            return () => clearTimeout(timer)
        }
    }, [pathname, navigationStarted])

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

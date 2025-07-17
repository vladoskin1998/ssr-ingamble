'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useLoading } from '@/context/LoadingContext'

interface UsePageLoadingOptions {
    /**
     * Автоматично позначати контент як завантажений після монтування компонента
     */
    autoComplete?: boolean
    /**
     * Затримка перед позначенням як завантажений (в мс)
     */
    delay?: number
    /**
     * Залежності для відслідковування завантаження
     */
    dependencies?: unknown[]
}

export const usePageLoading = (options: UsePageLoadingOptions = {}) => {
    const { autoComplete = true, delay = 0, dependencies = [] } = options
    const { setContentLoaded, isGlobalLoading } = useLoading()
    const hasCompletedRef = useRef(false)

    // Ручне керування завантаженням
    const markAsLoaded = useCallback(() => {
        if (!hasCompletedRef.current) {
            hasCompletedRef.current = true
            if (delay > 0) {
                setTimeout(() => {
                    setContentLoaded()
                }, delay)
            } else {
                setContentLoaded()
            }
        }
    }, [delay, setContentLoaded])

    // Автоматичне позначення як завантажений
    useEffect(() => {
        if (autoComplete && isGlobalLoading && dependencies.every(dep => dep !== undefined && dep !== null)) {
            markAsLoaded()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoComplete, isGlobalLoading, markAsLoaded, dependencies.length])

    // Скидання при зміні залежностей
    useEffect(() => {
        hasCompletedRef.current = false
    }, [dependencies.length])

    return {
        markAsLoaded,
        isLoading: isGlobalLoading,
    }
}

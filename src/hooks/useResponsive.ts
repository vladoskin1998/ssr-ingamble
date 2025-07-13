import { useState, useEffect } from 'react'

/**
 * Custom hook для перевірки responsive breakpoints
 * Безпечний для SSR - не викликає hydration mismatch
 */
export const useResponsive = (breakpoint: number, defaultValue: boolean = false) => {
    const [isMobile, setIsMobile] = useState(defaultValue)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < breakpoint
            setIsMobile(mobile)
            setIsInitialized(true)
        }

        checkMobile()

        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [breakpoint])

    return { isMobile, isInitialized }
}

/**
 * Утилітарні breakpoints для швидкого використання
 */
export const useIsMobile = (defaultValue: boolean = false) => useResponsive(480, defaultValue)
export const useIsTablet = (defaultValue: boolean = false) => useResponsive(900, defaultValue)
export const useIsDesktop = (defaultValue: boolean = false) => useResponsive(1024, defaultValue)

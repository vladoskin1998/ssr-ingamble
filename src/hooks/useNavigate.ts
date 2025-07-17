'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLoading } from '@/context/LoadingContext'

export const useNavigate = () => {
    const router = useRouter()
    const { startLoading } = useLoading()

    const navigate = useCallback((href: string, options?: { replace?: boolean }) => {
        // Запускаємо лоадер перед навігацією
        startLoading()
        
        // Виконуємо навігацію
        if (options?.replace) {
            router.replace(href)
        } else {
            router.push(href)
        }
    }, [router, startLoading])

    return { navigate }
}

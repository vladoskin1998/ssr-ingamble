import { useEffect, useState } from 'react'
import { cloacingLink } from '@/helper'

/**
 * Hook для безпечного використання cloaking links без hydration errors
 * Спочатку повертає статичний URL для SSR, потім оновлює на клієнті
 */
export const useSafeCloacingLink = (name: string | undefined): string => {
    const [link, setLink] = useState<string>('https://ingamble.com/go')
    
    useEffect(() => {
        // Після hydration оновлюємо на правильний cloaking link
        setLink(cloacingLink(name))
    }, [name])
    
    return link
}

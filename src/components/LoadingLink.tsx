'use client'

import React, { ReactNode, MouseEvent } from 'react'
import Link, { LinkProps } from 'next/link'
import { useLoading } from '@/context/LoadingContext'

interface LoadingLinkProps extends Omit<LinkProps, 'onClick'> {
    children: ReactNode
    className?: string
    'aria-label'?: string
    rel?: string
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export const LoadingLink: React.FC<LoadingLinkProps> = ({
    href,
    children,
    onClick,
    ...props
}) => {
    const { startLoading } = useLoading()

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        // Якщо є кастомний onClick, викликаємо його першим
        if (onClick) {
            onClick(e)
            // Якщо preventDefault був викликаний, не запускаємо лоадер
            if (e.defaultPrevented) {
                return
            }
        }

        // Перевіряємо чи це зовнішнє посилання
        const isExternal = typeof href === 'string' && (
            href.startsWith('http') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:')
        )

        // Перевіряємо чи це посилання на той самий маршрут
        const isSameRoute = typeof href === 'string' && 
            typeof window !== 'undefined' && 
            href === window.location.pathname

        // Запускаємо лоадер тільки для внутрішніх навігацій на нові маршрути
        if (!isExternal && !isSameRoute) {
            startLoading()
        }
    }

    return (
        <Link 
            href={href}
            onClick={handleClick}
            {...props}
        >
            {children}
        </Link>
    )
}

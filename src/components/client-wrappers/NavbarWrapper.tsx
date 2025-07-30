'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Navbar from '@/components/navbar'
import { useFilterContext, initialCasinoFilters, initialBonusFilters, initialLoyaltiesFilters, RouteToNextFilter } from '@/context/FilterContext'

const NavbarWrapper = () => {
    const pathname = usePathname()
    const { setCasinoFilters, setBonusFilters, setLoyaltiesFilters, handlerCurrentRouteFilter } = useFilterContext()
    const prevPathnameRef = useRef<string | null>(null)
    
    useEffect(() => {
        // Only reset filters if pathname actually changed (not on first render)
        if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
            const isNavigatingToFilterPage = pathname.startsWith('/filter-')
            
            if (isNavigatingToFilterPage) {
                // Set appropriate currentRouteFilter based on the filter page
                if (pathname.startsWith('/filter-casinos')) {
                    handlerCurrentRouteFilter(RouteToNextFilter.CASINOS)
                } else if (pathname.startsWith('/filter-bonus')) {
                    handlerCurrentRouteFilter(RouteToNextFilter.BONUS)
                } else if (pathname.startsWith('/filter-loyalties')) {
                    handlerCurrentRouteFilter(RouteToNextFilter.LOYALTIES)
                }
                // Don't reset filters when navigating TO filter pages
            } else {
                // Reset filters when navigating away from filter pages OR to non-filter pages
                handlerCurrentRouteFilter(RouteToNextFilter.DEFAULT)
                setCasinoFilters(initialCasinoFilters)
                setBonusFilters(initialBonusFilters)
                setLoyaltiesFilters(initialLoyaltiesFilters)
            }
        }
        prevPathnameRef.current = pathname
    }, [pathname, setCasinoFilters, setBonusFilters, setLoyaltiesFilters, handlerCurrentRouteFilter])
    
    // Force re-render when pathname changes by using it as key
    return <Navbar key={pathname} />
}

export default NavbarWrapper

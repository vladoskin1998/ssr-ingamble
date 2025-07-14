'use client'
import React, { createContext, useContext, useEffect, ReactNode, useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DataHomeItemsBlockCategoryType, DataHomeItemsBlockEnumCategory, FormatedCategoryType } from '../types'
import $api from '../http';
import {   LOYALTIECATEGORYIES, shuffleArray } from '../helper';
import initializeAdaptiveBehavior from '../helper/adaprive-bahavior';
import { usePathname } from 'next/navigation';

interface AdaptiveContextType {
    isShowPlayButton: boolean
    isSidebarActive: boolean
    lastUpdate: string
    category: FormatedCategoryType[]
}

interface HandlerSidebarActiveContextType {
    handlerSidebarActive: (b: boolean) => void
}

const AdaptiveContext = createContext<AdaptiveContextType | undefined>(undefined);
const HandlerSidebarActiveContext = createContext<HandlerSidebarActiveContextType | undefined>(undefined)

const getTogglePlay = async () => {
       const response = await $api.get('get-toggle-play/')
       return response.data
}

const getDataHomePageCategories = async () => {
    const response = await $api.get("get-data-home-page-categories/")
    return response.data
}




const getRandomDate = (startDate: Date, endDate: Date): Date => {
    const randomTime = Math.floor(Math.random() * (endDate.getTime() - startDate.getTime() + 1)) + startDate.getTime();
    return new Date(randomTime);
};


const getLastUpdateDate = (): Date | null => {
    // ЗМІНА: Додано SSR перевірку для localStorage
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return null;
    }
    
    const storedDate = localStorage?.getItem('lastUpdate');
    const date = storedDate ? new Date(storedDate) : null;

    if (date && isNaN(date?.getTime())) {
        console.error('Invalid date stored in localStorage:', storedDate);
        return null;
    }

    return date;
};


const setLastUpdateDate = (date: Date): void => {
    // ЗМІНА: Додано SSR перевірку для localStorage
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return;
    }
    
    if (isNaN(date?.getTime())) {
        console?.error('Invalid date passed to setLastUpdateDate:', date);
        return;
    }
    localStorage.setItem('lastUpdate', date.toISOString());
};


const getCurrentDate = (): Date => new Date();


const getThreeDaysAgo = (): Date => {
    const date = new Date();
    date.setDate(date.getDate() - 3);
    return date;
};


const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};


export const AdaptiveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


    const pathname = usePathname()
    const [isSidebarActive, setSidebarActive] = useState(false)
    
    useEffect(() => {
        const handleResize = () => {
            initializeAdaptiveBehavior();
        };
     
        initializeAdaptiveBehavior();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [
         pathname
    ]);

    const [lastUpdate, setLastUpdate] = useState<string>('');

    useEffect(() => {
     
        const lastUpdateDate = getLastUpdateDate();
        const today = getCurrentDate();
        const threeDaysAgo = getThreeDaysAgo();

        if (!lastUpdateDate) {
       
            const randomDate = getRandomDate(threeDaysAgo, today);
            setLastUpdate(formatDate(randomDate));
            setLastUpdateDate(randomDate);
        } else {
            const lastUpdateDateStr = formatDate(lastUpdateDate);
            if (lastUpdateDate < threeDaysAgo) {

                const randomDate = getRandomDate(threeDaysAgo, today);
                setLastUpdate(formatDate(randomDate));
                setLastUpdateDate(randomDate);
            } else {

                setLastUpdate(lastUpdateDateStr);
            }
        }
    }, []);



    const { data: dataCategories } = useQuery({
        queryKey: ['get-data-home-page-categories/'],
        queryFn: getDataHomePageCategories,
        staleTime: Infinity,
    })

      const { data: isTogglePlay } = useQuery({
        queryKey: ['get-toggle-play/'],
        queryFn: getTogglePlay,
        staleTime: Infinity,
      })

    
        
        const category = useMemo(() => {
            return shuffleArray([
                ...([...(dataCategories?.bonus_categories || [])]?.map((item, index) => ({
                    name: item.name,
                    slug: item.slug,
                    categoryType: DataHomeItemsBlockEnumCategory.bonus_category as DataHomeItemsBlockCategoryType,
                    // Додаємо унікальний ідентифікатор
                    uniqueId: `bonus-${item.slug}-${index}`
                })) || []),
                ...([...(dataCategories?.casino_categories || [])]?.map((item, index) => ({
                    name: item.name,
                    slug: item.slug,
                    categoryType: DataHomeItemsBlockEnumCategory.casino_category as DataHomeItemsBlockCategoryType,
                    // Додаємо унікальний ідентифікатор
                    uniqueId: `casino-${item.slug}-${index}`
                })) || []),
                ...LOYALTIECATEGORYIES.map((item, index) => ({
                    name: item.name,
                    slug: item.slug,
                    categoryType: DataHomeItemsBlockEnumCategory.loyaltie_category as DataHomeItemsBlockCategoryType,
                    // Додаємо унікальний ідентифікатор
                    uniqueId: `loyalty-${item.slug}-${index}`
                })),
            ])
        }, [dataCategories])

        const handlerSidebarActive = useCallback((b:boolean) => {
            setSidebarActive(b)
        },  [] )

        const value = useMemo(
            () => ({
                isShowPlayButton: isTogglePlay?.is_play ?? false,
                category,
                isSidebarActive,
                handlerSidebarActive,
                lastUpdate,
            }),
            [isTogglePlay, category, isSidebarActive, lastUpdate, handlerSidebarActive],
        )

            const actions = useMemo(
                () => ({
                    handlerSidebarActive,
                }),
                [handlerSidebarActive],
            )


    return (
        <AdaptiveContext.Provider value={value}>
            <HandlerSidebarActiveContext.Provider value={actions}>{children}</HandlerSidebarActiveContext.Provider>
        </AdaptiveContext.Provider>
    )
};

export const useAdaptiveBehavior = () => {
    const context = useContext(AdaptiveContext);
    if (!context) {
        throw new Error('useAdaptiveBehavior must be used within an AdaptiveProvider');
    }
    return context;
};


export const useHandlerSidebarActive = () => {
    const context = useContext(HandlerSidebarActiveContext)
    if (!context) {
        throw new Error('useAdaptiveBehavior must be used within an AdaptiveProvider')
    }
    return context
}




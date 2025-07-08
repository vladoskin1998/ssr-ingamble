'use client'

import dynamic from 'next/dynamic'

// Loading component for better UX
const LoadingBlock = () => (
    <div className="block-loading dynamic-component">
        <div className="loading-spinner">Loading...</div>
    </div>
)

// Dynamic imports for all Swiper-based components with loading fallbacks
export const DynamicBlockType2 = dynamic(
    () => import('@/pages-component/main-page/BlockType2'),
    {
        loading: LoadingBlock,
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicBlockType2Mobile = dynamic(
    () => import('@/pages-component/main-page/BlockType2Mobile'),
    {
        loading: LoadingBlock,
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicBlockType3 = dynamic(
    () => import('@/pages-component/main-page/BlockType3'),
    {
        loading: LoadingBlock,
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicBlockType3Mobile = dynamic(
    () => import('@/pages-component/main-page/BlockType3Mobile'),
    {
        loading: LoadingBlock,
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicBlockType4 = dynamic(
    () => import('@/pages-component/main-page/BlockType4'),
    {
        loading: LoadingBlock,
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicBlockType4Mobile = dynamic(
    () => import('@/pages-component/main-page/BlockType4Mobile'),
    {
        loading: LoadingBlock,
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicBlockType7 = dynamic(
    () => import('@/pages-component/main-page/BlockType7'),
    {
        loading: LoadingBlock,
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicBlockType7Mobile = dynamic(
    () => import('@/pages-component/main-page/BlockType7Mobile'),
    {
        loading: LoadingBlock,
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicBlockType9 = dynamic(
    () => import('@/pages-component/main-page/BlockType9'),
    {
        loading: LoadingBlock,
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicBlockType10Mobile = dynamic(
    () => import('@/pages-component/main-page/BlockType10Mobile'),
    {
        loading: LoadingBlock,
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicBlockMType2M = dynamic(
    () => import('@/pages-component/main-page/BlockMType2M'),
    {
        loading: LoadingBlock,
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicCategories = dynamic(
    () => import('@/components/categories/Categories').then(mod => ({ default: mod.Categories })),
    {
        loading: () => (
            <div className="categories-loading dynamic-component">
                <div className="loading-spinner">Loading categories...</div>
            </div>
        ),
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

export const DynamicMainSlider = dynamic(
    () => import('@/components/swiper/MainSlider'),
    {
        loading: () => (
            <div className="slider-loading dynamic-component">
                <div className="loading-spinner">Loading slider...</div>
            </div>
        ),
        ssr: false, // Disable SSR to prevent hydration mismatch
    }
)

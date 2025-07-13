import { memo, useEffect } from 'react'
import { LineLoader } from '../loader/LineLoader'
import { LazyImgHomeType } from '@/pages-component/main-page'
import Image from 'next/image'

export const LazyCardImg = memo(({ img, size, width, height, imgLoading = 'lazy' }: { 
    img: string; 
    size?: 'large' | 'medium' | 'small'; 
    width?: string;
    height?: string;
    imgLoading?: LazyImgHomeType 
}) => {
    useEffect(() => {
        // Можна додати логіку preloading якщо потрібно
    }, [img])

    // Якщо батьківський контейнер має фіксовані розміри і передані width="100%" height="100%"
    // використовуємо fill для заповнення контейнера
    if (width === "100%" && height === "100%") {
        return (
            <>
                {!img ? <LineLoader size={size} /> : <></>}
                <Image
                    src={img}
                    alt={img}
                    fill
                    loading={imgLoading}
                    style={{
                        objectFit: 'cover'
                    }}
                />
            </>
        )
    }

    // Інакше використовуємо адаптивний підхід
    return (
        <>
            {!img ? <LineLoader size={size} /> : <></>}

            <Image
                src={img}
                alt={img}
                width={0}
                height={0}
                sizes="100vw"
                loading={imgLoading}
                style={{
                    width: width || '100%',
                    height: height || 'auto',
                    objectFit: 'contain'
                }}
            />
        </>
    )
})

LazyCardImg.displayName = 'LazyCardImg'
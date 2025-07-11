import { memo, useEffect, useState } from 'react'
import { LineLoader } from '../loader/LineLoader'
import { LazyImgHomeType } from '@/pages-component/main-page'
import Image from 'next/image'

export const LazyCardImg = memo(({ img, size, width = 'auto', height, imgLoading = 'lazy' }: { height?: string; img: string; size?: 'large' | 'medium' | 'small'; width?: string; imgLoading?: LazyImgHomeType }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (img) {
            setLoading(false)
        }
    }, [img])

    return (
        <>
            {!img ? <LineLoader size={size} /> : <></>}

            <Image
                src={img}
                alt={img}
                fill  // Використовуємо fill для заповнення батьківського контейнера
                loading={imgLoading}
                style={{
                    objectFit: 'cover'  // Зберігає пропорції та заповнює контейнер
                }}
            />
        </>
    )
})

LazyCardImg.displayName = 'LazyCardImg'
'use client'
import { memo, useEffect, useState } from 'react'
import { LineLoader } from '../loader/LineLoader'
import { LazyImgHomeType } from '@/pages-component/main-page'
import Image from 'next/image'

export const LazyCardImg = memo(({ img, size, width = 'auto', height, imgLoading = 'lazy' }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  // Визначаємо чи це внутрішній чи зовнішній URL
  const isExternalUrl = img?.startsWith('http')
  
  if (!img) {
    return <LineLoader size={size} />
  }

  if (isExternalUrl) {
    // Для зовнішніх URL використовуємо звичайний img
    return (
      <img
        src={img}
        alt={img}
        loading={imgLoading}
        style={{ height, width }}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    )
  }

  // Для внутрішніх URL використовуємо Next Image
  return (
    <Image
      src={img}
      alt={img}
      width={width === 'auto' ? 0 : parseInt(width)}
      height={height ? parseInt(height) : 0}
      style={{ width, height }}
      loading={imgLoading}
      onLoad={() => setIsLoading(false)}
    />
  )
})

LazyCardImg.displayName = 'LazyCardImg'
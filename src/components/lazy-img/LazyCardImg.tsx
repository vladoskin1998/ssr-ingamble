'use client'
import { memo } from 'react'
import { LineLoader } from '../loader/LineLoader'
import Image from 'next/image'

interface Props {
  img?: string
  size?: 'large' | 'medium' | 'small'
  width?: string
  height?: string
  imgLoading?: 'lazy' | 'eager'
}

export const LazyCardImg = memo(({ img, size, width = 'auto', height, imgLoading = 'lazy' }: Props) => {
  // Визначаємо чи це внутрішній чи зовнішній URL
  const isExternalUrl = img?.startsWith('http')
  
  if (!img) {
    return <LineLoader size={size} />
  }

  if (isExternalUrl) {
    // Для зовнішніх URL використовуємо звичайний img
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={img}
        alt={img}
        loading={imgLoading}
        style={{ height, width }}
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
    />
  )
})

LazyCardImg.displayName = 'LazyCardImg'
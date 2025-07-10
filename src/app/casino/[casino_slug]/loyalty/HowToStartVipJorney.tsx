// ✅ ЗМІНА 1: Додана директива 'use client'
// Потрібна для Next.js App Router, оскільки компонент використовує useState та useEffect
'use client'

import { useEffect, useState } from 'react'
import { cloacingFetch, cloacingLink, getLikeByIdAndType, sanitizeNumberLike, saveLikesToStorage } from '@/helper'

// ✅ ЗМІНА 2: Заміна React Router на Next.js Link
// Було: import { Link } from 'react-router-dom'
// Стало: import Link from 'next/link'
import Link from 'next/link'

// ✅ ЗМІНА 3: Додано Next.js Image компонент
// Замінює звичайний <img> тег для кращої оптимізації
import Image from 'next/image'

export const HowToStartVipJorney = (data: { 
  casino_affiliate_link?: string
  casino_name?: string
  likes?: number
  slug: string | number | undefined
  link_tc: string | undefined
  id: number | undefined 
}) => {
  const [like, setLike] = useState<'' | 'like' | 'dislike'>('')

  useEffect(() => {
    if (!data?.id) {
      return
    }
    const lk = getLikeByIdAndType('casino_like', data?.id) || ''
    setLike(lk)
  }, [data?.id])

  const handlerLike = (l: '' | 'like' | 'dislike', id?: number) => {
    if (!id) {
      return
    }

    setLike((s) => (s === l ? '' : l))
    saveLikesToStorage('casino_like', id, l)
  }

  return (
    <section className="simple-bonus__get-bonus get-bonus">
      <div className="get-bonus__container container">
        <div className="get-bonus__body">
          <div className="get-bonus__bg ibg--custom">
            
            {/* ✅ ЗМІНА 4: Заміна <img> на Next.js <Image> компонент */}
            {/* Було: <img src="/img/bg/08.webp" alt="bg" loading="lazy" /> */}
            <Image 
              src={'/img/bg/08.webp'} 
              alt="VIP Journey Background"      // Покращений alt текст
              fill                             // Замість width/height для заповнення контейнера
              sizes="100vw"                    // Розмір відображення для responsive images
              loading="lazy"                   // Залишено з оригіналу
              style={{ objectFit: 'cover' }}  // CSS властивість для правильного масштабування
            />
          </div>
          <div className="get-bonus__row">
            <div className="get-bonus__main main-get-bonus">
              <div className="main-get-bonus__icon">
                <svg>
                  <use xlinkHref="#vip"></use>
                </svg>
              </div>
              <div className="main-get-bonus__content">
                <h2 className="main-get-bonus__title">How to start VIP journey?</h2>
                <div className="main-get-bonus__text">Loyalty program is activated after first deposit</div>
                <div className="main-get-bonus__btns">
                  <div className="main-get-bonus__btns-item">
                    <a
                      href={cloacingLink(data?.casino_name)}
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        cloacingFetch(data?.casino_affiliate_link)
                        window.open(data?.casino_affiliate_link, '_blank', 'noopener,noreferrer')
                      }}
                      className="main-get-bonus__btn main-get-bonus__btn_bonus"
                      title="Start Playing at Casino"
                      rel="nofollow noopener"
                    >
                      Start Playing
                    </a>
                  </div>
                  <div className="main-get-bonus__btns-item">
                    
                    {/* ✅ ЗМІНА 5: Заміна React Router Link на Next.js Link */}
                    {/* Було: <Link to={`/casino/${data.slug}`}> */}
                    {/* Стало: <Link href={`/casino/${data.slug}`}> - змінився атрибут з 'to' на 'href' */}
                    <Link
                      href={`/casino/${data.slug}`}
                      className="main-get-bonus__btn main-get-bonus__btn_review"
                      aria-label={`${data?.casino_name} Casino Review`}
                      prefetch={false} // Вимкнення предзавантаження для мобільних
                    >
                      <span>
                        <svg>
                          <use xlinkHref="#review"></use>
                        </svg>
                      </span>
                      {(data?.casino_name || 'Casino').replace(/casino/i, '')} Casino Review
                    </Link>
                  </div>
                  <div className="main-get-bonus__btns-item">
                    <a
                      href={data?.link_tc}
                      target="_blank"
                      rel="nofollow noopener"
                      className="main-get-bonus__btn main-get-bonus__btn_apply"
                      aria-label="Terms and Conditions"
                    >
                      T&C Apply
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="get-bonus__like like-get-bonus">
              <div className="like-get-bonus__body">
                <div className="like-get-bonus__title">Do You Like This VIP Program?</div>
                <div className="like-get-bonus__btns">
                  <div className="like-get-bonus__btns-item">
                    <button
                      onClick={() => handlerLike('like', data?.id)}
                      className={`like-get-bonus__btn like-get-bonus__btn_like ${like === 'like' && 'active'}`}
                      aria-label="Like this VIP program"
                    >
                      <span className="like-get-bonus__btn-icon">
                        <svg>
                          <use xlinkHref="#like"></use>
                        </svg>
                      </span>
                      <span className="like-get-bonus__btn-number">
                        {sanitizeNumberLike((data?.likes ?? 0) + (like === 'like' ? 1 : 0))}
                      </span>
                    </button>
                  </div>
                  <div className="like-get-bonus__btns-item">
                    <button
                      onClick={() => handlerLike('dislike', data?.id)}
                      className={`like-get-bonus__btn like-get-bonus__btn_dislike ${like === 'dislike' && 'active'}`}
                      aria-label="Dislike this VIP program"
                    >
                      <span className="like-get-bonus__btn-icon">
                        <svg>
                          <use xlinkHref="#like"></use>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { Categories } from '@/components/categories/Categories'
import { BreadCrumb } from '@/components/breadcrumb'
import { PaginationPage } from '../../components/pagination/PaginationPage'

import { DataHomeItemsBlockEnumCategory, NAMETITLECATEGORYSLUGType, SeeAllEssentialLoyaltyCasino } from '@/types'
import { useParams } from 'next/navigation'
import '../../../styles/all-loyalties.css'

import { useRouter } from 'next/navigation'
import React, { lazy, useEffect, useState } from 'react'
import { LOYALTIECATEGORYIES } from '@/helper'

import { initialLoyaltiesFilters, useFilterContext } from '@/context/FilterContext'
import { isMobileDevice } from '@/helper/adaprive-bahavior'
import Link from 'next/link'
import Image from 'next/image'
import { CloakingButton } from './cloaking-button'


const SubscribeForm = lazy(() => import('../../components/subscribe/SubscribeForm'))
const CheckMoreWhatSuitsYouBest = lazy(() => import('../../components/categories/CheckMoreWhatSuitsYouBest'))
const BottomInfo = lazy(() => import('../../components/footer/BottomInfo'))



const pathBreadCrumb = [
    {
        name: 'Home',
        link: '/    ',
    },
    {
        name: 'Essential VIP Loyalty Programs',
        link: '/all-loyalties',
    },
]

const NAMETITLECATEGORYSLUG: NAMETITLECATEGORYSLUGType = {
    'loyalty-rank': { key: 'loyalty_rank', value: { min: 8, max: 10 } },
    'vip-manager': { key: 'vip_manager', value: true },
    'level-up-bonus': { key: 'level_up_bonus', value: true },
    withdrawals: { key: 'withdrawals', value: true },
    'special-prizes': { key: 'special_prizes', value: true },
    gifts: { key: 'gifts', value: true },
}

export default function AllLoyaltyLayout({
    children,
    totalPages,
}: {
    totalPages: number
    children: React.ReactNode
}) {
    const router = useRouter()
    const { setLoyaltiesFilters } = useFilterContext()
    
    // Нові стани для відслідковування завантажених елементів
    const [mobileContent, setMobileContent] = useState<React.ReactNode[]>([])
    const [loadedPages, setLoadedPages] = useState<number[]>([])
    const [isMobile, setIsMobile] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [apiTotalPages, setApiTotalPages] = useState(totalPages)
    const [highestLoadedPage, setHighestLoadedPage] = useState(1)

    const params = useParams()
    let loyaltie_slug: string | undefined = undefined
    let currentPage = 1

    if (Array.isArray(params?.params)) {
        if (params.params.length === 1) {
           
            if (isNaN(Number(params.params[0]))) {
                loyaltie_slug = params.params[0]
            } else {
                currentPage = Number(params.params[0])
            }
        }
        if (params.params.length === 2) {
            loyaltie_slug = params.params[0]
            currentPage = Number(params.params[1])
        }
    }

    // console.log('params', params)
    
    // Ініціалізація на клієнті
    useEffect(() => {
        // Якщо сторінка не 1, редіректимо на 1 і не ініціалізуємо стани
        if (Number(currentPage) > 1) {
            const link = loyaltie_slug ? `/all-loyalties/${loyaltie_slug}/1` : `/all-loyalties/1`;
            router.replace(link);
            return;
        }
        setIsMobile(isMobileDevice());
        setMobileContent([children]);
        setLoadedPages([Number(currentPage || 1)]);
        setHighestLoadedPage(Number(currentPage || 1));
        
        const handleResize = () => {
            setIsMobile(isMobileDevice());
        };
        window.addEventListener('resize', handleResize);

        if (loyaltie_slug) {
            const { key, value } = NAMETITLECATEGORYSLUG[loyaltie_slug]
            setLoyaltiesFilters({
                ...initialLoyaltiesFilters,
                [key]: value,
            })
        }
        window.scrollTo(0, 0)
        return () => {
            window.removeEventListener('resize', handleResize);
            setLoyaltiesFilters(initialLoyaltiesFilters)
        }
    }, [loyaltie_slug, children, currentPage, setLoyaltiesFilters, router])

    // Функція для завантаження додаткових елементів
    const loadMoreItems = async (nextPage: number) => {
        if (loadedPages.includes(nextPage)) return;
        
        console.log(`Loading page ${nextPage}, current highestLoadedPage: ${highestLoadedPage}, total pages: ${apiTotalPages}`);
        
        setIsLoading(true);
        try {
            const response = await fetch(`/api/loyalties?page=${nextPage}${loyaltie_slug ? `&slug=${loyaltie_slug}` : ''}`);
            
            if (!response.ok) throw new Error('Failed to fetch data');
            
            const data = await response.json();
            
            console.log(`Loaded page ${nextPage}, got ${data.results?.length} items, total pages from API: ${data.total_pages}`);
            
            // Створюємо новий контент на основі отриманих даних
            const newContent = (
                <div key={`page-${nextPage}`} className="mobile-loaded-content">
                    <div className="main-loyaltie-programs__items loyaltie-programs__items">
                        {data.results.map((item: SeeAllEssentialLoyaltyCasino, index: number) => (
                            <div key={`item-${nextPage}-${index}`} className="loyaltie-programs__item item-loyaltie-programs">
                                <div className="item-loyaltie-programs__row">
                                    <div className="item-loyaltie-programs__main">
                                        <Link
                                            prefetch={false}
                                            href={`/casino/${item.casino_slug}`}
                                            className="item-loyaltie-programs__image loyalty-img-custom"
                                            style={{ position: 'relative' }}
                                        >
                                            <Image src={item?.casino_image || '/img/no-results.svg'} fill alt={item.casino_slug} />
                                        </Link>
                                    </div>
                                    <div className="item-loyaltie-programs__content content-item-loyaltie-programs">
                                        <div className="content-item-loyaltie-programs__top top-content-item-loyaltie-programs">
                                            <h2 className="top-content-item-loyaltie-programs__name">{item.casino_name}</h2>
                                            <div className="info-casino-card__stake-rating">
                                                <span className="info-casino-card__stake-rating-icon">
                                                    <Image src={'/img/icons/star.svg'} alt="star" width={20} height={20} />
                                                </span>
                                                <span className="info-casino-card__stake__rating-number">{item.casino_rank}</span>
                                            </div>
                                        </div>
                                        <div className="content-item-loyaltie-programs__features features-essential-programs-gamble">
                                            {item.loyalty_program.loyalty_keypoint.map((keypoint, kIndex) => (
                                                <div key={kIndex} className="features-essential-programs-gamble__column">
                                                    <div className="features-essential-programs-gamble__item">
                                                        <div className="features-essential-programs-gamble__icon" style={{ position: 'relative' }}>
                                                            <Image src={keypoint?.image || '/img/no-results.svg'} fill alt={'loyalty_keypoint'} />
                                                        </div>
                                                        <div className="features-essential-programs-gamble__info">
                                                            <div className="features-essential-programs-gamble__name">{keypoint.text_1}</div>
                                                            <div className="features-essential-programs-gamble__text">{keypoint.text_2}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="features-essential-programs-gamble__column features-essential-programs-gamble__column_rating">
                                                <div className="features-essential-programs-gamble__item features-essential-programs-gamble__item_rating">
                                                    <div className="item-essential-programs-gamble__rating">
                                                        <div className="item-essential-programs-gamble__rating-number">
                                                            {parseInt(String(item?.loyalty_program?.loyalty_rank), 10)}/10
                                                        </div>
                                                        <div className="item-essential-programs-gamble__rating-body">
                                                            <div className="item-essential-programs-gamble__rating-items items-rating-essential-programs-gamble">
                                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                                                                    <div
                                                                        key={level}
                                                                        className={`items-rating-essential-programs-gamble__item items-rating-essential-programs-gamble__item_${level} ${
                                                                            level <= (Number(item?.loyalty_program?.loyalty_rank) || 10) && 'full'
                                                                        }`}
                                                                    ></div>
                                                                ))}
                                                            </div>
                                                            <div className="item-essential-programs-gamble__rating-text">
                                                                {item?.loyalty_program?.loyalty_level_description || 'Excellent'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-item-loyaltie-programs__bottom bottom-content-item-loyaltie-programs">
                                            <div className="bottom-content-item-loyaltie-programs__btns">
                                                <CloakingButton
                                                    casinoName={item?.casino_name}
                                                    affiliateLink={item?.casino_affiliate_link}
                                                    urlCasino={item?.url_casino || ''}
                                                />
                                                <Link
                                                    href={`/casino/${item.loyalty_program.loyalty_slug}/loyalty`}
                                                    className="bottom-content-item-loyaltie-programs__btn-more"
                                                    prefetch={false} // Вимкнення предзавантаження для мобільних
                                                >
                                                    Read More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
            
            // Додаємо нові елементи до списку
            setMobileContent(prev => [...prev, newContent]);
            setLoadedPages(prev => [...prev, nextPage]);
            setHighestLoadedPage(nextPage);
            
            // Оновлюємо загальну кількість сторінок, якщо вона змінилася
            if (data.total_pages) {
                setApiTotalPages(data.total_pages);
            }
            
            // Оновлюємо URL без повного перезавантаження
            const link = loyaltie_slug ? `/all-loyalties/${loyaltie_slug}/${nextPage}` : `/all-loyalties/${nextPage}`;
            window.history.pushState({}, '', link);
        } catch (error) {
            console.error('Error loading more items:', error);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <main className="gamble__loyaltie-programs main-gamble loyaltie-programs loyaltie-filtered__main">
            <div className="main-gamble__body">
                <Categories type_category={DataHomeItemsBlockEnumCategory.loyaltie_category} />
                <BreadCrumb
                    path={
                        loyaltie_slug
                            ? [
                                  ...pathBreadCrumb,
                                  {
                                      name: LOYALTIECATEGORYIES.find((item) => item.slug === loyaltie_slug)?.name || 'Loyalty Programs',
                                      link: `/all-bonuses/${loyaltie_slug}`,
                                  },
                              ]
                            : pathBreadCrumb
                    }
                />
                <section className="loyaltie-programs__main main-loyaltie-programs">
                    <div className="main-loyaltie-programs__container container">
                        <div className="main-loyaltie-programs__top top">
                            <div className="top__row">
                                <div className="top__column">
                                    <div className="top__title-block">
                                        <h2 className="top__title">
                                            {loyaltie_slug
                                                ? LOYALTIECATEGORYIES.find((item) => item.slug === loyaltie_slug)?.name
                                                : 'Essential VIP Loyalty Programs'}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Для мобільних пристроїв відображаємо всі завантажені елементи */}
                        {isMobile ? (
                            <>
                                {mobileContent.map((content, index) => (
                                    <div key={`mobile-content-${index}`} className="mobile-loaded-content">
                                        {content}
                                    </div>
                                ))}
                            </>
                        ) : (
                            // Для десктопів стандартна поведінка
                            children
                        )}
                        
                        <PaginationPage
                            countElem={apiTotalPages}
                            currentPage={isMobile ? highestLoadedPage : Number(currentPage || 1)}
                            countPageElem={1}
                            onShowMore={isMobile ? loadMoreItems : null}
                            isLoading={isLoading}
                            setCurrentPage={(page) => {
                                if (isMobile && page === highestLoadedPage + 1) {
                                    // Для мобільних завантажуємо додаткові елементи
                                    // Ця логіка тепер в onShowMore
                                    return;
                                }
                                
                                // Для всіх інших випадків - стандартна навігація
                                const link = loyaltie_slug ? `/all-loyalties/${loyaltie_slug}/${page}` : `/all-loyalties/${page}`;
                                router?.push(link);
                            }}
                        />
                    </div>
                </section>
                <CheckMoreWhatSuitsYouBest />
                <SubscribeForm />
                <BottomInfo />
            </div>
        </main>
    )
}

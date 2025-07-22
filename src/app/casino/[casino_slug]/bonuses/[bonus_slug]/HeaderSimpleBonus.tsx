import { GeoLocationAllowdType, GetDataBonusResponse, WageringBonusPlusDepositType } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { cloacingFetch, sanitizeNumberLike } from '@/helper'
import { useFilterContext } from '@/context/FilterContext'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'
import { useResponsive } from '@/hooks/useResponsive'
import { useSafeCloacingLink } from '@/hooks/useSafeCloacingLink'

const color_label = ['tags-casino-card__item_green', 'tags-casino-card__item_blue', 'tags-casino-card__item_purple', 'tags-casino-card__item_grass', 'tags-casino-card__item_orange']

const subtitleLabelWager: Record<keyof WageringBonusPlusDepositType, string> = {
    bonus_only: 'Bonus Only',
    bonus_plus_deposit: 'Bonus + Deposit',
    deposit_only: 'Deposit Only',
    winnings_only: 'Winnings Only',
}

export const WagerPrettier = (wager: WageringBonusPlusDepositType | undefined): null | { label: string; value: string } => {
    let res: null | { label: string; value: string } = null
    if (!wager) {
        return res
    }

    for (const key in wager) {
        if (typeof wager[key as keyof WageringBonusPlusDepositType] === 'number') {
            res = { label: subtitleLabelWager[key as keyof WageringBonusPlusDepositType], value: wager[key as keyof WageringBonusPlusDepositType] + 'x' }
            break
        }
    }

    return res
}

export const HeaderSimpleBonus = ({ data, geoLocation }: { data?: GetDataBonusResponse | undefined; geoLocation: GeoLocationAllowdType }) => {
    // ✅ ЗМІНА: Використовуємо безпечний hook замість прямого доступу до window
    const { isMobile: isSmallScreen } = useResponsive(1023.98, false)

    const { setCasinoFilters } = useFilterContext()

    // Безпечний cloaking link який уникає hydration errors
    const safeCloacingHref = useSafeCloacingLink(data?.casino_name)

    // ❌ ВИДАЛЕНО: Старий код з прямим доступом до window
    // const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth <= 1023.98)
    // const handleResize = (): void => {
    //     setIsSmallScreen(window.innerWidth <= 1023.98)
    // }
    // useEffect(() => {
    //     window.addEventListener('resize', handleResize)
    //     return () => {
    //         window.removeEventListener('resize', handleResize)
    //     }
    // }, [])

    const wagerValue = WagerPrettier(data?.wagering_bonus_plus_deposit)



    return (
        <section className={`simple-bonus__casino-info casino-info ${!geoLocation?.isAllowed && 'casino-info_not-available'} `}>
            <div className="casino-info__container container">
                <div className="casino-info__body">
                    <div className="casino-info__row">
                        <div className="casino-info__main main-casino-info">
                            <div className="main-casino-info__image-block">
                                <div className="main-casino-info__image ibg--custom">
                                <LazyCardImg img={data?.bonus_image || ''} imgLoading={'eager'} height="100%" width="100%" />
                                </div>
                            </div>
                            {!isSmallScreen ? (
                                <div className="main-casino-info__name name-main-casino-info">
                                    <Link className="name-main-casino-info__logo" href={`/casino/${data?.casino_slug}`} prefetch={false}>
                                    <LazyCardImg img={data?.casino_logo || ''} />
                                    </Link>
                                    <div className="name-main-casino-info__content">
                                        <Link href={`/casino/${data?.casino_slug}`} rel="noopener noreferrer" className="name-main-casino-info__title" prefetch={false}>
                                            {data?.casino_name}
                                        </Link>
                                        <div className="info-casino-card__stake-rating name-main-casino-info__stake-rating">
                                            <span className="info-casino-card__stake-rating-icon">
                                                <Image src="/img/icons/star.svg" alt="star" width={16} height={16} />
                                            </span>
                                            <span className="info-casino-card__stake__rating-number">{data?.bonus_rank || '4.8'}</span>
                                        </div>
                                        <div className="info-casino-card__likes name-main-casino-info__likes">
                                            <span className="info-casino-card__likes-icon">
                                                <Image src="/img/icons/like.svg" alt="like" width={16} height={16} />
                                            </span>
                                            <span className="info-casino-card__likes-number">{sanitizeNumberLike(data?.likes)}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="main-casino-info__name name-main-casino-info">
                                    <div className="info-casino-card__stake-rating name-main-casino-info__stake-rating">
                                        <span className="info-casino-card__stake-rating-icon">
                                            <Image src="/img/icons/star.svg" alt="star" width={16} height={16} />
                                        </span>
                                        <span className="info-casino-card__stake__rating-number">{data?.bonus_rank || '4.8'}</span>
                                    </div>
                                    <Link
                                        className="name-main-casino-info__logo"
                                        href={`/casino/${data?.casino_slug}`}
                                        prefetch={false}
                                    >
                                        <Image 
                                            src={data?.casino_logo || ''} 
                                            alt={`${data?.casino_name} logo`} 
                                            width={60} 
                                            height={60} 
                                            priority
                                        />
                                    </Link>
                                    <div className="info-casino-card__likes name-main-casino-info__likes">
                                        <span className="info-casino-card__likes-icon">
                                            <Image src="/img/icons/like.svg" alt="like" width={16} height={16} />
                                        </span>
                                        <span className="info-casino-card__likes-number">{sanitizeNumberLike(data?.likes)}</span>
                                    </div>
                                    <div className="name-main-casino-info__content">
                                        <Link href={`/casino/${data?.casino_slug}`} rel="noopener noreferrer" className="name-main-casino-info__title" prefetch={false}>
                                            {data?.casino_name}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="casino-info__content content-casino-info">
                            <div className="content-casino-info__main">
                                <div className="content-casino-info__top">
                                    <h2 className="content-casino-info__title">{data?.name}</h2>

                                    <div className="content-casino-info__subtitle">{data?.bonus_type}</div>
                                </div>
                                <div className="casino-card__tags tags-casino-card">
                                    {data?.labels.map((item, index) => (
                                        <div key={`bonus-label-${index}-${item?.name}`} className={`tags-casino-card__item ${color_label[index]}`}>
                                            <span className="tags-casino-card__item-label"></span>
                                            <span className="tags-casino-card__item-value">{item?.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="content-casino-info__country country-content-casino-info">
                                    <div className="country-content-casino-info__info">
                                        {geoLocation?.countryImg && (
                                            <div className="country-content-casino-info__icon">
                                                <Image src={geoLocation?.countryImg || ''} alt={geoLocation?.countryName || 'country'} width={24} height={24} loading="lazy" />
                                            </div>
                                        )}
                                        <div className={`country-content-casino-info__text `}>{`${geoLocation?.isAllowed ? 'Accepts players from' : 'Doesn’t accept players from'} ${geoLocation?.countryName}`}</div>
                                    </div>
                                    <span className="main-get-bonus__btn main-get-bonus__btn_apply">T&C Apply</span>
                                </div>
                                {geoLocation?.isAllowed ? (
                                    <a
                                        href={safeCloacingHref}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            cloacingFetch(data?.casino_affiliate_link)
                                            window.open(data?.casino_affiliate_link || data?.url_casino, '_blank', 'noopener,noreferrer')
                                        }}
                                        aria-label="Put your description here."
                                        className="main-get-bonus__btn main-get-bonus__btn_bonus"
                                    >
                                        <span>
                                            <Image src="/img/icons/gift.svg" alt="gift" width={20} height={20} />
                                        </span>
                                        Get Bonus and Play
                                    </a>
                                ) : (
                                    <Link
                                        href={'/filter-casinos'}
                                        onClick={() => {
                                            setCasinoFilters((s) => ({ ...s, selected_countries: [geoLocation?.idCountry as number] }))
                                        }}
                                        aria-label="Put your description here."
                                        className="main-get-bonus__btn main-get-bonus__btn_bonus"
                                    >
                                        <span>
                                            <Image src="/img/icons/gift.svg" alt="gift" width={20} height={20} />
                                        </span>
                                        Browse Recommended Bonuses
                                    </Link>
                                )}
                            </div>
                            <div className="content-casino-info__features features-content-casino-info">
                                <div className="features-content-casino-info__row">
                                    <div className="features-content-casino-info__column">
                                        <div className="features-content-casino-info__item item-features-content-casino-info item-features-content-casino-info_border">
                                            <div className="item-features-content-casino-info__top">
                                                <div className="item-features-content-casino-info__label">Bonus Rank</div>
                                            </div>
                                            <div className="item-features-content-casino-info__body">
                                                <div className="item-features-content-casino-info__number">{data?.bonus_rank || 0}</div>
                                                <div className="item-features-content-casino-info__rating">
                                                    <div className="item-features-content-casino-info__star">
                                                        <Image src="/img/icons/star.svg" alt="star" width={16} height={16} />
                                                    </div>
                                                    <div className="item-features-content-casino-info__star">
                                                        <Image src="/img/icons/star.svg" alt="star" width={16} height={16} />
                                                    </div>
                                                    <div className="item-features-content-casino-info__star">
                                                        <Image src="/img/icons/star.svg" alt="star" width={16} height={16} />
                                                    </div>
                                                    <div className="item-features-content-casino-info__star">
                                                        <Image src="/img/icons/star.svg" alt="star" width={16} height={16} />
                                                    </div>
                                                    <div className="item-features-content-casino-info__star">
                                                        <Image src="/img/icons/star.svg" alt="star" width={16} height={16} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="features-content-casino-info__column">
                                        <div className="features-content-casino-info__item item-features-content-casino-info">
                                            <div className="item-features-content-casino-info__top">
                                                <div className="item-features-content-casino-info__label">Wager</div>
                                            </div>
                                            <div className="item-features-content-casino-info__body">
                                                <div className="item-features-content-casino-info__number">{wagerValue?.value ? wagerValue?.value : '-'}</div>
                                                <div className="item-features-content-casino-info__value">{wagerValue?.label || ''}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="features-content-casino-info__column">
                                        <div className="features-content-casino-info__item item-features-content-casino-info">
                                            <div className="item-features-content-casino-info__top">
                                                <div className="item-features-content-casino-info__label">Min Dep</div>
                                            </div>
                                            <div className="item-features-content-casino-info__body">
                                                <div className="item-features-content-casino-info__number">{data?.bonus_min_dep?.[0]?.min_value ? data?.bonus_min_dep?.[0]?.min_value + '$' : '-'}</div>
                                                <div className="item-features-content-casino-info__value">To Activate</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="features-content-casino-info__column">
                                        <div className="features-content-casino-info__item item-features-content-casino-info">
                                            <div className="item-features-content-casino-info__top">
                                                <div className="item-features-content-casino-info__label">Max Bet</div>
                                            </div>
                                            <div className="item-features-content-casino-info__body">
                                                <div className="item-features-content-casino-info__number">{data?.max_bet?.[0]?.value ? data?.max_bet?.[0]?.value + '$' : '-'}</div>
                                                <div className="item-features-content-casino-info__value">Per Spin</div>
                                            </div>
                                        </div>
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

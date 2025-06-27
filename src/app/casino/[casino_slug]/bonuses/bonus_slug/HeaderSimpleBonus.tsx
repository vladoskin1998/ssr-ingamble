import starIcon from '../../assets/img/icons/star.svg'
import likeIcon from '../../assets/img/icons/like.svg'

import { GeoLocationAllowdType, GetDataBonusResponse, WageringBonusPlusDepositType } from '../../types'

import giftIcon from '../../assets/img/icons/gift.svg'
import { useState, useEffect } from 'react'
import { LazyCardImg } from '../../components/lazy-img/LazyCardImg'
import { Link } from 'react-router-dom'
import { cloacingFetch, cloacingLink, sanitizeNumberLike } from '../../helper'
import { useFilterContext } from '../../context/FilterContext'

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
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth <= 1023.98)

    const { setCasinoFilters } = useFilterContext()

    const handleResize = (): void => {
        setIsSmallScreen(window.innerWidth <= 1023.98)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

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
                                    {/* <img
                                        src={data?.bonus_image || mainImg}
                                        alt="main-img"
                                    /> */}
                                </div>
                            </div>
                            {!isSmallScreen ? (
                                <div className="main-casino-info__name name-main-casino-info">
                                    <Link className="name-main-casino-info__logo" to={`/casino/${data?.casino_slug}`}>
                                        <LazyCardImg img={data?.casino_logo || ''} />
                                    </Link>
                                    <div className="name-main-casino-info__content">
                                        <Link to={`/casino/${data?.casino_slug}`} rel="noopener noreferrer" className="name-main-casino-info__title">
                                            {data?.casino_name}
                                        </Link>
                                        <div className="info-casino-card__stake-rating name-main-casino-info__stake-rating">
                                            <span className="info-casino-card__stake-rating-icon">
                                                <img src={starIcon} alt="star" />
                                            </span>
                                            <span className="info-casino-card__stake__rating-number">{data?.bonus_rank || '4.8'}</span>
                                        </div>
                                        <div className="info-casino-card__likes name-main-casino-info__likes">
                                            <span className="info-casino-card__likes-icon">
                                                <img src={likeIcon} alt="like" />
                                            </span>
                                            <span className="info-casino-card__likes-number">{sanitizeNumberLike(data?.likes)}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="main-casino-info__name name-main-casino-info">
                                    <div className="info-casino-card__stake-rating name-main-casino-info__stake-rating">
                                        <span className="info-casino-card__stake-rating-icon">
                                            <img src={starIcon} alt="star" />
                                        </span>
                                        <span className="info-casino-card__stake__rating-number">{data?.bonus_rank || '4.8'}</span>
                                    </div>
                                    <Link className="name-main-casino-info__logo" to={`/casino/${data?.casino_slug}`}>
                                        <img src={data?.casino_logo} alt="stake" />
                                    </Link>
                                    <div className="info-casino-card__likes name-main-casino-info__likes">
                                        <span className="info-casino-card__likes-icon">
                                            <img src={likeIcon} alt="like" />
                                        </span>
                                        <span className="info-casino-card__likes-number">{sanitizeNumberLike(data?.likes)}</span>
                                    </div>
                                    <div className="name-main-casino-info__content">
                                        <Link to={`/casino/${data?.casino_slug}`} rel="noopener noreferrer" className="name-main-casino-info__title">
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
                                        <div key={index} className={`tags-casino-card__item ${color_label[index]}`}>
                                            <span className="tags-casino-card__item-label"></span>
                                            <span className="tags-casino-card__item-value">{item?.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="content-casino-info__country country-content-casino-info">
                                    <div className="country-content-casino-info__info">
                                        {geoLocation?.countryImg && (
                                            <div className="country-content-casino-info__icon">
                                                <img src={geoLocation?.countryImg} alt={geoLocation?.countryImg} />
                                            </div>
                                        )}
                                        <div className={`country-content-casino-info__text `}>{`${geoLocation?.isAllowed ? 'Accepts players from' : 'Doesn’t accept players from'} ${geoLocation?.countryName}`}</div>
                                    </div>
                                    <span className="main-get-bonus__btn main-get-bonus__btn_apply">T&C Apply</span>
                                </div>
                                {geoLocation?.isAllowed ? (
                                    <a
                                        href={cloacingLink(data?.casino_name)}
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
                                            <img loading="lazy" src={giftIcon} alt="gift" />
                                        </span>
                                        Get Bonus and Play
                                    </a>
                                ) : (
                                    <Link
                                        to={'/filter-casinos'}
                                        onClick={() => {
                                            setCasinoFilters((s) => ({ ...s, selected_countries: [geoLocation?.idCountry as number] }))
                                        }}
                                        aria-label="Put your description here."
                                        className="main-get-bonus__btn main-get-bonus__btn_bonus"
                                    >
                                        <span>
                                            <img loading="lazy" src={giftIcon} alt="gift" />
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
                                                        <img loading="lazy" src={starIcon} alt="star" />
                                                    </div>
                                                    <div className="item-features-content-casino-info__star">
                                                        <img loading="lazy" src={starIcon} alt="star" />
                                                    </div>
                                                    <div className="item-features-content-casino-info__star">
                                                        <img loading="lazy" src={starIcon} alt="star" />
                                                    </div>
                                                    <div className="item-features-content-casino-info__star">
                                                        <img loading="lazy" src={starIcon} alt="star" />
                                                    </div>
                                                    <div className="item-features-content-casino-info__star">
                                                        <img loading="lazy" src={starIcon} alt="star" />
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

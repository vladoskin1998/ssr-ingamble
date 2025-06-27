import { useEffect, useRef, useState } from 'react'

import arrowYellowIcon from '../../assets/img/icons/arrow-yellow.svg'
import closeIcon from '../../assets/img/icons/close.svg'
import slotsIcon from '../../assets/img/games/01.svg'
import { GetDataBonusResponse } from '../../types'
import { AccordionItem } from '../../components/acordion/Acordion'
import { WagerPrettier } from './HeaderSimpleBonus'

export const BonusInformation = ({ data }: { data: GetDataBonusResponse | undefined }) => {
    const [BonusInfoIsOpen, setIsBonusInfoOpen] = useState({
        Restrictions: true,
        WageringInfo: true,
    })

    const [overflow, setOverflow] = useState({
        Restrictions: true,
        WageringInfo: true,
    })

    const [openModal, setOpenModal] = useState({
        BonusRestrictionGames: false,
        ProviderRestrictions: false,
        CountryRestrictions: false,
    })

    // Рефы для модалок
    const modalRefs = {
        BonusRestrictionGames: useRef<HTMLDivElement | null>(null),
        ProviderRestrictions: useRef<HTMLDivElement | null>(null),
        CountryRestrictions: useRef<HTMLDivElement | null>(null),
    }

    const handleClickOutside = (event: MouseEvent): void => {
        Object.keys(modalRefs).forEach((key) => {
            //@ts-ignore
            const ref = modalRefs[key as keyof ModalState]?.current as any
            if (ref && !ref.contains(event.target as Node)) {
                setOpenModal((prevState) => ({
                    ...prevState,
                    [key]: false,
                }))
            }
        })
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (BonusInfoIsOpen.Restrictions) {
            setTimeout(() => {
                setOverflow((s) => ({ ...s, Restrictions: true }))
            }, 1300)
        } else {
            setOverflow((s) => ({ ...s, Restrictions: false }))
        }

        if (BonusInfoIsOpen.WageringInfo) {
            setTimeout(() => {
                setOverflow((s) => ({ ...s, WageringInfo: true }))
            }, 1300)
        } else {
            setOverflow((s) => ({ ...s, WageringInfo: false }))
        }
    }, [BonusInfoIsOpen])

    const wagerValue = WagerPrettier(data?.wagering_bonus_plus_deposit)

    return (
        <div className="bonus-information__body">
            <div className="bonus-information__row">
                <div className="bonus-information__column">
                    <div className="bonus-information__item item-bonus-information item-bonus-information_bonus-general-info">
                        <AccordionItem
                            defaultOpen
                            heading={
                                <div className={`item-bonus-information__top top-item-bonus-information accordion--title--element`}>
                                    <div className="top-item-bonus-information__title">Bonus General Info</div>
                                    <div className="top-item-bonus-information__icon">
                                        <img src={arrowYellowIcon} alt="arrowYellowIcon" />
                                    </div>
                                </div>
                            }
                            content={
                                <div style={{ paddingBottom: '20px' }} className={`content-bonus-information  `}>
                                    <div className="content-bonus-information__items">
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">Total Bonus amount:</div>
                                            <div className="item-content-bonus-information__value">
                                                {data?.bonus_amount?.[0]?.value || data?.bonus_amount?.[0]?.unlimited ? `${data?.bonus_amount?.[0]?.unlimited ? 'Unlimited' : data?.bonus_amount?.[0]?.value + '$'}` : '-'}
                                            </div>
                                        </div>
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">Max bet:</div>
                                            <div className="item-content-bonus-information__value">
                                                {data?.max_bet?.[0]?.value || data?.max_bet?.[0]?.unlimited ? `${data?.max_bet?.[0]?.unlimited ? 'Unlimited' : data?.max_bet?.[0]?.value + '$'}` : '-'}
                                            </div>
                                        </div>
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">Min dep:</div>
                                            <div className="item-content-bonus-information__value">{data?.bonus_min_dep?.[0]?.min_value ? `${data?.bonus_min_dep?.[0]?.min_value}$` : '-'}</div>
                                        </div>
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">
                                                Bonus Max win:
                                                <span className="item-content-bonus-information__info">
                                                    <span className="item-content-bonus-information__info-icon info-icon">
                                                        <svg>
                                                            <use xlinkHref="#info"></use>
                                                        </svg>
                                                    </span>
                                                    <span className="item-content-bonus-information__info-text">
                                                        <span>The maximum amount</span> a player can win
                                                        <br /> when using this bonus.
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="item-content-bonus-information__value">
                                                {data?.bonus_max_win?.[0]?.max_value || data?.bonus_max_win?.[0]?.unlimited ? `${data?.bonus_max_win?.[0]?.unlimited ? 'Unlimited' : data?.bonus_max_win?.[0]?.max_value + '$'}` : '-'}
                                            </div>
                                        </div>
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">Daily availability:</div>
                                            <div className="item-content-bonus-information__value" style={{ textAlign: 'right' }}>
                                                {data?.day_of_week.length ? data?.day_of_week.reduce((prev, state) => prev + ', ' + state.day, '').slice(2) : '-'}
                                            </div>
                                        </div>
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">
                                                Bonus expiration:
                                                <span className="item-content-bonus-information__info">
                                                    <span className="item-content-bonus-information__info-icon info-icon">
                                                        <svg>
                                                            <use xlinkHref="#info"></use>
                                                        </svg>
                                                    </span>
                                                    <span className="item-content-bonus-information__info-text">
                                                        <span>The time limit to use the bonus</span> <br /> before it expires and becomes invalid
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="item-content-bonus-information__value">{!data?.bonus_expiration?.days ? '-' : data?.bonus_expiration?.days === 1 ? '1 day' : `${data?.bonus_expiration?.days} days`}</div>
                                        </div>
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">Bonus period:</div>
                                            <div className="item-content-bonus-information__value">
                                                {data?.promotion_period?.start_date && data?.promotion_period?.end_date
                                                    ? `${new Date(data.promotion_period.start_date).toLocaleDateString('ru-RU')} - ${new Date(data.promotion_period.end_date).toLocaleDateString('ru-RU')}`
                                                    : '-'}
                                            </div>
                                        </div>
                                        {data?.bonus_type?.toLocaleLowerCase() !== 'Cashback bonus'.toLocaleLowerCase() && (
                                            <div className="content-bonus-information__item item-content-bonus-information">
                                                <div className="item-content-bonus-information__label">Sticky:</div>
                                                <div className="item-content-bonus-information__value">{data?.sticky ? 'Yes' : 'No'}</div>
                                            </div>
                                        )}

                                        {/* <div className="content-bonus-information__item item-content-bonus-information ''">
                                            <div className="item-content-bonus-information__label">
                                                Bonus Terms:
                                            </div>
                                            <div className="item-content-bonus-information__value">
                                                <a
                                                    rel="nofollow noopener"
                                                    href=""
                                                    target="_blank"
                                                    aria-label="Put your description here."
                                                    className="item-content-bonus-information__link"
                                                >
                                                    Casino bonus terms
                                                </a>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            }
                        />
                    </div>
                    <div className="bonus-information__item  item-bonus-information item-bonus-information_wagering-info">
                        <AccordionItem
                            defaultOpen
                            heading={
                                <div className={`item-bonus-information__top top-item-bonus-information accordion--title--element `}>
                                    <div className="top-item-bonus-information__title">Wagering Info</div>
                                    <div className="top-item-bonus-information__icon">
                                        <img src={arrowYellowIcon} alt="arrowYellowIcon" />
                                    </div>
                                </div>
                            }
                            content={
                                <div style={{ paddingBottom: '20px' }} className={`content-bonus-information   ${overflow.WageringInfo && 'visiable'}`}>
                                    <div className="content-bonus-information__items">
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">
                                                Wagering:
                                                {/* <span className="item-content-bonus-information__info">
                                                    <span className="item-content-bonus-information__info-icon info-icon">
                                                        <svg>
                                                            <use xlinkHref="#info"></use>
                                                        </svg>
                                                    </span>
                                                    <span
                                                        className="item-content-bonus-information__info-text"
                                                        style={{ zIndex: 10 }}
                                                    >
                                                        Text field,{" "}
                                                        <span>
                                                            with poyasnenie
                                                        </span>
                                                        <br />
                                                        what is it, kogda
                                                        navodish
                                                        <br />
                                                        mishkoy.
                                                    </span>
                                                </span> */}
                                            </div>
                                            <div className="item-content-bonus-information__value">{wagerValue ? `${wagerValue.value} ${wagerValue.label}` : '-'}</div>
                                        </div>
                                        {data?.wagering?.wagering_difficulty === 'easy' && (
                                            <div className="content-bonus-information__item item-content-bonus-information">
                                                <div className="item-content-bonus-information__label">Bonus Max win:</div>
                                                <div className="item-content-bonus-information__value">
                                                    <div className="item-content-bonus-information__status status-item-content-bonus-information status-item-content-bonus-information_low">
                                                        <span className="status-item-content-bonus-information__label">Easy</span>
                                                        <span className="status-item-content-bonus-information__panel"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {data?.wagering?.wagering_difficulty === 'medium' && (
                                            <div className="content-bonus-information__item item-content-bonus-information">
                                                <div className="item-content-bonus-information__label">Bonus Max win:</div>
                                                <div className="item-content-bonus-information__value">
                                                    <div className="item-content-bonus-information__status status-item-content-bonus-information status-item-content-bonus-information_medium">
                                                        <span className="status-item-content-bonus-information__label">Medium</span>
                                                        <span className="status-item-content-bonus-information__panel"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {data?.wagering?.wagering_difficulty === 'hard' && (
                                            <div className="item-content-bonus-information-wrap ''">
                                                <div className="content-bonus-information__item item-content-bonus-information">
                                                    <div className="item-content-bonus-information__label">Bonus Max win:</div>
                                                    <div className="item-content-bonus-information__value">
                                                        <div className="item-content-bonus-information__status status-item-content-bonus-information status-item-content-bonus-information_quick">
                                                            <span className="status-item-content-bonus-information__label">Hard</span>
                                                            <span className="status-item-content-bonus-information__panel"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            }
                        />
                    </div>
                    <div className="bonus-information__item  item-bonus-information item-bonus-information_wagering-contribution">
                        <AccordionItem
                            defaultOpen
                            heading={
                                <div className={`item-bonus-information__top top-item-bonus-information accordion--title--element`}>
                                    <div className="top-item-bonus-information__title">Wagering Contribution</div>
                                    <div className="top-item-bonus-information__icon">
                                        <img src={arrowYellowIcon} alt="arrowYellowIcon" />
                                    </div>
                                </div>
                            }
                            content={
                                <div style={{ paddingBottom: '20px' }} className={`content-bonus-information .accordion--title--element`}>
                                    <div className="content-bonus-information__items">
                                        {data?.wagering_contribution
                                            ?.sort((a, b) => b.value - a.value)
                                            ?.map((item, index) => (
                                                <div key={index} className={`content-bonus-information__item item-content-bonus-information ${index + 1 === data?.wagering_contribution?.length && "''"}`}>
                                                    {item?.description ? (
                                                        <>
                                                            <div className="item-content-bonus-information__label">{item?.description}</div>
                                                            <div className="item-content-bonus-information__value">{typeof item?.value === 'number' || typeof item?.value === 'string' ? item?.value + '%' : '-'}</div>
                                                        </>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            }
                        />
                    </div>
                    {data?.special_note?.description && (
                        <div className="bonus-information__item  item-bonus-information item-bonus-information_special-notes">
                            <AccordionItem
                                defaultOpen
                                heading={
                                    <div className={`item-bonus-information__top top-item-bonus-information accordion--title--element`}>
                                        <div className="top-item-bonus-information__title">Special Notes</div>
                                        <div className="top-item-bonus-information__icon">
                                            <img src={arrowYellowIcon} alt="arrowYellowIcon" />
                                        </div>
                                    </div>
                                }
                                content={
                                    <div style={{ paddingBottom: '20px' }} className={`content-bonus-information `}>
                                        <div className="content-bonus-information__items">
                                            <div className="content-bonus-information__item item-content-bonus-information ''">
                                                <div className="item-content-bonus-information__text">
                                                    <p>{data?.special_note?.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    )}
                </div>
                <div className="bonus-information__column">
                    <div className="bonus-information__item  item-bonus-information item-bonus-information_free-spins">
                        <AccordionItem
                            defaultOpen
                            heading={
                                <div className={`item-bonus-information__top top-item-bonus-information accordion--title--element`}>
                                    <div className="top-item-bonus-information__title">Free Spins</div>
                                    <div className="top-item-bonus-information__icon">
                                        <img src={arrowYellowIcon} alt="arrowYellowIcon" />
                                    </div>
                                </div>
                            }
                            content={
                                <div style={{ paddingBottom: '20px' }} className={`content-bonus-information`}>
                                    <div className="content-bonus-information__items">
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">
                                                Free spin amount:
                                                <span className="item-content-bonus-information__info">
                                                    <span className="item-content-bonus-information__info-icon info-icon">
                                                        <svg>
                                                            <use xlinkHref="#info"></use>
                                                        </svg>
                                                    </span>
                                                    <span className="item-content-bonus-information__info-text" style={{ zIndex: 10 }}>
                                                        <span>The number of free spins</span> <br /> granted in addition to the bonus.
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="item-content-bonus-information__value">{data?.free_spin_amount?.value ? `${data?.free_spin_amount?.value}` : '-'}</div>
                                        </div>
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">Spin value:</div>
                                            <div className="item-content-bonus-information__value">{data?.one_spin?.value ? `$ ${data?.one_spin?.value}` : '-'}</div>
                                        </div>
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">Bonus slot:</div>
                                            <div className="item-content-bonus-information__value">{data?.bonus_slot?.game?.[0]?.name ? `${data?.bonus_slot?.game?.[0]?.name}` : '-'}</div>
                                        </div>
                                        <div className="content-bonus-information__item item-content-bonus-information ''">
                                            <div className="item-content-bonus-information__label">Wager for free spins:</div>
                                            <div className="item-content-bonus-information__value">{typeof data?.wager?.value === 'number' ? `${data?.wager?.value}x` : '-'}</div>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                    <div className="bonus-information__item  item-bonus-information item-bonus-information_restrictions">
                        <AccordionItem
                            defaultOpen
                            heading={
                                <div
                                    className={`item-bonus-information__top top-item-bonus-information accordion--title--element`}
                                    onClick={() =>
                                        setIsBonusInfoOpen((s) => ({
                                            ...s,
                                            Restrictions: !s.Restrictions,
                                        }))
                                    }
                                >
                                    <div className="top-item-bonus-information__title">Restrictions</div>
                                    <div className="top-item-bonus-information__icon">
                                        <img src={arrowYellowIcon} alt="arrowYellowIcon" />
                                    </div>
                                </div>
                            }
                            content={
                                <div style={{ paddingBottom: '20px' }} className={` content-bonus-information   ${overflow.Restrictions && 'visiable'}`}>
                                    <div className="content-bonus-information__items">
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">Bonus restriction games:</div>

                                            <div className="item-content-bonus-information__value">
                                                {data?.restriction_game?.game.length ? (
                                                    <>
                                                        {data?.restriction_game?.game?.reduce((prev, state) => prev + ', ' + state.name, '').slice(2, 20)} ...
                                                        <button
                                                            onClick={() =>
                                                                setOpenModal((s) => ({
                                                                    ...s,
                                                                    BonusRestrictionGames: true,
                                                                }))
                                                            }
                                                            aria-label="Put your description here."
                                                            className="item-content-bonus-information__link info-popup-open"
                                                        >
                                                            See all
                                                        </button>
                                                        <div
                                                            className={`item-content-bonus-information__popup popup-item-content-bonus-information accordion--title--element ${openModal.BonusRestrictionGames && 'active'}`}
                                                            ref={modalRefs.BonusRestrictionGames}
                                                        >
                                                            <div className="popup-item-content-bonus-information__body">
                                                                <div className="popup-item-content-bonus-information__top top-popup-item-content-bonus-information">
                                                                    <div className="top-popup-item-content-bonus-information__title">
                                                                        All Bonus Restriction Games
                                                                        <div className="top-popup-item-content-bonus-information__number">{`(${data?.restriction_game?.game?.length || 0})`}</div>
                                                                    </div>
                                                                    <button
                                                                        onClick={() =>
                                                                            setOpenModal((s) => ({
                                                                                ...s,
                                                                                BonusRestrictionGames: false,
                                                                            }))
                                                                        }
                                                                        aria-label="Put your description here."
                                                                        className="top-popup-item-content-bonus-information__btn-close info-popup-close"
                                                                    >
                                                                        <img src={closeIcon} alt="close" />
                                                                    </button>
                                                                </div>
                                                                <div className="popup-item-content-bonus-information__content">
                                                                    <div className="popup-item-content-bonus-information__lits-block">
                                                                        <ul className="popup-item-content-bonus-information__list">
                                                                            {data?.restriction_game?.game?.map((item, index) => (
                                                                                <li key={index} className="popup-item-content-bonus-information__list-item">
                                                                                    <span className="popup-item-content-bonus-information__list-link">{item.name || 'slot'}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    '-'
                                                )}
                                            </div>
                                        </div>
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">Provider restrictions:</div>
                                            <div className="item-content-bonus-information__value">
                                                {data?.game_providers.length ? (
                                                    <>
                                                        {data?.game_providers?.reduce((prev, state) => prev + ', ' + state.name, '').slice(2, 20)} ...
                                                        <button
                                                            onClick={() =>
                                                                setOpenModal((s) => ({
                                                                    ...s,
                                                                    ProviderRestrictions: true,
                                                                }))
                                                            }
                                                            aria-label="Put your description here."
                                                            className="item-content-bonus-information__link info-popup-open"
                                                        >
                                                            See all
                                                        </button>
                                                        <div className={`item-content-bonus-information__popup popup-item-content-bonus-information ${openModal.ProviderRestrictions && 'active'}`} ref={modalRefs.ProviderRestrictions}>
                                                            <div className="popup-item-content-bonus-information__body">
                                                                <div className="popup-item-content-bonus-information__top top-popup-item-content-bonus-information">
                                                                    <div className="top-popup-item-content-bonus-information__title">
                                                                        All Provider Restrictions
                                                                        <div className="top-popup-item-content-bonus-information__number">{`(${data?.game_providers?.length || 0})`}</div>
                                                                    </div>
                                                                    <button
                                                                        onClick={() =>
                                                                            setOpenModal((s) => ({
                                                                                ...s,
                                                                                ProviderRestrictions: false,
                                                                            }))
                                                                        }
                                                                        aria-label="Put your description here."
                                                                        className="top-popup-item-content-bonus-information__btn-close info-popup-close"
                                                                    >
                                                                        <img src={closeIcon} alt="close" />
                                                                    </button>
                                                                </div>
                                                                <div className="popup-item-content-bonus-information__content">
                                                                    <div className="popup-item-content-bonus-information__row">
                                                                        {data?.game_providers?.map((item) => (
                                                                            <a
                                                                                aria-label="Put your description here."
                                                                                className="popup-item-content-bonus-information__game game-popup-item-content-bonus-information popup-item-content-bonus-information__column"
                                                                            >
                                                                                <span className="game-popup-item-content-bonus-information__icon">
                                                                                    <img loading="lazy" src={item?.image || slotsIcon} alt="Slots" />
                                                                                </span>
                                                                                <span className="game-popup-item-content-bonus-information__name">{item.name || 'slot'}</span>
                                                                            </a>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    '-'
                                                )}
                                            </div>
                                        </div>
                                        <div className="content-bonus-information__item item-content-bonus-information">
                                            <div className="item-content-bonus-information__label">Country restrictions:</div>
                                            <div className="item-content-bonus-information__value">
                                                {data?.bonus_blocked_countries?.length ? (
                                                    <>
                                                        {data?.bonus_blocked_countries?.reduce((prev, state) => prev + ', ' + state.name, '').slice(2, 20)} ...
                                                        <button
                                                            onClick={() =>
                                                                setOpenModal((s) => ({
                                                                    ...s,
                                                                    CountryRestrictions: true,
                                                                }))
                                                            }
                                                            aria-label="Put your description here."
                                                            className="item-content-bonus-information__link info-popup-open"
                                                        >
                                                            See all
                                                        </button>
                                                        <div className={`item-content-bonus-information__popup popup-item-content-bonus-information ${openModal?.CountryRestrictions && 'active'}`} ref={modalRefs?.CountryRestrictions}>
                                                            <div className="popup-item-content-bonus-information__body">
                                                                <div className="popup-item-content-bonus-information__top top-popup-item-content-bonus-information">
                                                                    <div className="top-popup-item-content-bonus-information__title">
                                                                        All Country Restrictions
                                                                        <div className="top-popup-item-content-bonus-information__number">{`(${data?.bonus_blocked_countries?.length || 0})`}</div>
                                                                    </div>
                                                                    <button
                                                                        onClick={() =>
                                                                            setOpenModal((s) => ({
                                                                                ...s,
                                                                                CountryRestrictions: false,
                                                                            }))
                                                                        }
                                                                        aria-label="Put your description here."
                                                                        className="top-popup-item-content-bonus-information__btn-close info-popup-close"
                                                                    >
                                                                        <img src={closeIcon} alt="close" />
                                                                    </button>
                                                                </div>
                                                                <div className="popup-item-content-bonus-information__content">
                                                                    <div className="popup-item-content-bonus-information__lits-block">
                                                                        <ul className="popup-item-content-bonus-information__list">
                                                                            {data?.blocked_countries?.map((item, index) => (
                                                                                <li key={index} className="popup-item-content-bonus-information__list-item">
                                                                                    <span className="popup-item-content-bonus-information__list-link">{item.name || 'Country'}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    '-'
                                                )}
                                            </div>
                                        </div>
                                        <div className="item-content-bonus-information-wrap ">
                                            <div className="content-bonus-information__item item-content-bonus-information">
                                                <div className="item-content-bonus-information__label">
                                                    RTP restriction:
                                                    <span className="item-content-bonus-information__info">
                                                        <span className="item-content-bonus-information__info-icon info-icon">
                                                            <svg>
                                                                <use xlinkHref="#info"></use>
                                                            </svg>
                                                        </span>
                                                        <span className="item-content-bonus-information__info-text" style={{ zIndex: 10 }}>
                                                            Meaning <span> the player is restricted </span>
                                                            <br /> from playing games <br /> with an RTP higher than the specified limit.
                                                            {/* Text field,{" "}
                                                        <span>
                                                            with poyasnenie
                                                        </span>
                                                        <br />
                                                        what is it, kogda
                                                        navodish
                                                        <br />
                                                        mishkoy. */}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="item-content-bonus-information__value">{data?.restriction_rtp_game ? `${data?.restriction_rtp_game}%` : '-'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                    <div className="bonus-information__item  item-bonus-information item-bonus-information_stake-casino-reload-bonus">
                        <AccordionItem
                            defaultOpen
                            heading={
                                <div className={`item-bonus-information__top top-item-bonus-information accordion--title--element`}>
                                    <div className="top-item-bonus-information__title">Description</div>
                                    <div className="top-item-bonus-information__icon">
                                        <img src={arrowYellowIcon} alt="arrowYellowIcon" />
                                    </div>
                                </div>
                            }
                            content={
                                <div className={`content-bonus-information  `} style={{ paddingBottom: '20px' }}>
                                    <div className="content-bonus-information__items">
                                        <div className="content-bonus-information__item item-content-bonus-information ">
                                            <div className="item-content-bonus-information__text">{data?.description}</div>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

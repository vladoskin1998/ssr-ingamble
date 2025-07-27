/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { LoyaltieProgramDataResponse } from '@/types'
import { useAdaptiveBehavior } from '@/context/AppContext'

// ✅ ЗМІНА 1: Видалено проблемний імпорт ReactSVG
// Було: import { ReactSVG } from 'react-svg'
// Стало: import Image from 'next/image'

import { AccordionItem } from '@/components/acordion/Acordion'
import Image from 'next/image'

// ✅ КОНСТАНТИ ДЛЯ КОЛЬОРІВ
const colors1 = ['amateur', 'hustler', 'semi-pro', 'professional', 'expert', 'veteran', 'master', 'grand-master', 'ace']
const colors2 = ['veteran', 'master', 'grand-master', 'ace', 'amateur', 'hustler', 'semi-pro', 'professional', 'expert']

// ✅ ЗМІНА 2: Створено helper компонент для уникнення дублювання коду
const LoyaltyLevelItem = ({ 
    item, 
    index, 
    colors, 
    isFirstColumn = false 
}: { 
    item: any
    index: number
    colors: string[]
    isFirstColumn?: boolean
}) => (
    <div className="information-loyaltie__item">
        <div
            className={`inner-information-loyaltie__item item-inner-information-loyaltie item-inner-information-loyaltie_only 
                item-inner-information-loyaltie_${colors[index % (colors.length - 1)]}`}
        >
            <AccordionItem
                defaultOpen={isFirstColumn && !index}  // ✅ Тільки перший елемент першої колонки відкритий
                heading={
                    <div className="accordion--title--element item-inner-information-loyaltie__top top-item-inner-information-loyaltie">
                        <div className="top-item-inner-information-loyaltie__column">
                            <div className="top-item-inner-information-loyaltie__icon">
                                <svg>
                                    <use xlinkHref="#loyalty-information-1"></use>
                                </svg>
                            </div>
                            <h3 className="top-item-inner-information-loyaltie__level">Level {item?.level}</h3>
                        </div>
                        <div className="top-item-inner-information-loyaltie__column">

                            <div className="top-item-inner-information-loyaltie__arrow">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                }
                content={
                    <div className="item-inner-information-loyaltie__body">
                        <div className="item-inner-information-loyaltie__wrapper">
                            <div className="item-inner-information-loyaltie__row">
                                
                                {/* ✅ ПЕРША КОЛОНКА КОНТЕНТУ */}
                                <div className="item-inner-information-loyaltie__column">
                                    
                                    {/* Point accumulation */}
                                    {item?.point_accumulation?.value && (
                                        <div className="item-inner-information-loyaltie__element element-item-inner-information-loyaltie">
                                            <div className="element-item-inner-information-loyaltie__label">Point accumulation:</div>
                                            <div className="element-item-inner-information-loyaltie__value">{item?.point_accumulation?.point} points</div>
                                        </div>
                                    )}
                                    
                                    {/* Cashback */}
                                    {item?.cashback?.cashback_period && item?.cashback?.percentage && (
                                        <div className="item-inner-information-loyaltie__element element-item-inner-information-loyaltie">
                                            <div className="element-item-inner-information-loyaltie__label">{item?.cashback?.cashback_period} Cashback:</div>
                                            <div className="element-item-inner-information-loyaltie__value">{item?.cashback?.percentage}%</div>
                                        </div>
                                    )}
                                    
                                    {/* VIP Manager Access */}
                                    {item?.vip_manager_access !== undefined && (
                                        <div className="item-inner-information-loyaltie__element element-item-inner-information-loyaltie">
                                            <div className="element-item-inner-information-loyaltie__label">VIP Manager Access:</div>
                                            <div className="element-item-inner-information-loyaltie__value">
                                                {typeof item?.vip_manager_access === 'boolean' 
                                                    ? (item?.vip_manager_access ? 'Available' : 'Not Available') 
                                                    : item?.vip_manager_access}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Level-up Bonus */}
                                    {item?.level_up_bonus && (item?.level_up_bonus.bonus || item?.level_up_bonus.wager || item?.level_up_bonus.freespins) && (
                                        <div className="item-inner-information-loyaltie__element element-item-inner-information-loyaltie">
                                            <div className="element-item-inner-information-loyaltie__label">Level-Up Bonus:</div>
                                            <div className="element-item-inner-information-loyaltie__value">
                                                {item.level_up_bonus.bonus && <div className="element-item-inner-information-loyaltie__bonus">Bonus: {item?.level_up_bonus.bonus}</div>}
                                                {item.level_up_bonus.wager !== null && <div className="element-item-inner-information-loyaltie__wager">Wager: {item?.level_up_bonus.wager}</div>}
                                                {item.level_up_bonus.freespins !== null && <div className="element-item-inner-information-loyaltie__freespins">Freespins: {item?.level_up_bonus.freespins}</div>}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Gifts */}
                                    {item?.gifts && (item?.gifts?.birthday || item?.gifts?.holiday || item?.gifts?.offline || item?.gifts?.personalized || item?.gifts?.exclusive) && (
                                        <div className="item-inner-information-loyaltie__element element-item-inner-information-loyaltie">
                                            <div className="element-item-inner-information-loyaltie__label">Gifts:</div>
                                            <div className="element-item-inner-information-loyaltie__value">
                                                <ul>
                                                    {item?.gifts?.birthday && <li>Birthday: {item?.gifts?.birthday}</li>}
                                                    {item?.gifts?.holiday && <li>Holiday: {item?.gifts?.holiday}</li>}
                                                    {item?.gifts?.offline && <li>Offline: {item?.gifts?.offline}</li>}
                                                    {item?.gifts?.personalized && <li>Personalized: {item?.gifts?.personalized}</li>}
                                                    {item?.gifts?.exclusive && <li>Exclusive: {item?.gifts?.exclusive}</li>}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    
                                </div>
                                
                                {/* ✅ ДРУГА КОЛОНКА КОНТЕНТУ */}
                                <div className="item-inner-information-loyaltie__column">
                                    
                                    {/* Withdrawals */}
                                    {item?.withdrawals && (item?.withdrawals?.faster_withdrawal || item?.withdrawals?.withdrawal_limits) && (
                                        <div className="item-inner-information-loyaltie__element element-item-inner-information-loyaltie">
                                            <div className="element-item-inner-information-loyaltie__label">Withdrawals:</div>
                                            <div className="element-item-inner-information-loyaltie__value">
                                                {item?.withdrawals?.faster_withdrawal && <div>Faster Withdrawal: {item?.withdrawals?.faster_withdrawal}</div>}
                                                {item?.withdrawals?.withdrawal_limits && <div>Limits: {item?.withdrawals?.withdrawal_limits}</div>}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Special Prizes */}
                                    {item?.special_prize && (item?.special_prize?.freespins || item?.special_prize?.free_bet || item?.special_prize?.other) && (
                                        <div className="item-inner-information-loyaltie__element element-item-inner-information-loyaltie">
                                            <div className="element-item-inner-information-loyaltie__label">Special Prizes:</div>
                                            <ul className="element-item-inner-information-loyaltie__value">
                                                {item?.special_prize?.freespins && <li>Freespins: {item?.special_prize?.freespins}</li>}
                                                {item?.special_prize?.free_bet && <li>Free Bet: {item?.special_prize?.free_bet}</li>}
                                                {item?.special_prize?.other && <li>Other: {item?.special_prize?.other}</li>}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    {/* Loyalty Level Bonuses */}
                                    {item?.loyalty_level_bonuses && (item?.loyalty_level_bonuses?.customized || item?.loyalty_level_bonuses?.monthly || item?.loyalty_level_bonuses?.real_money || item?.loyalty_level_bonuses?.weekly) && (
                                        <div className="item-inner-information-loyaltie__element element-item-inner-information-loyaltie">
                                            <div className="element-item-inner-information-loyaltie__label">Loyalty Level Bonuses:</div>
                                            <ul className="element-item-inner-information-loyaltie__value">
                                                {item?.loyalty_level_bonuses?.customized && <li>Customized: {item?.loyalty_level_bonuses?.customized}</li>}
                                                {item?.loyalty_level_bonuses?.real_money && <li>Real Money: {item?.loyalty_level_bonuses?.real_money}</li>}
                                                {item?.loyalty_level_bonuses?.weekly && <li>Weekly: {item?.loyalty_level_bonuses?.weekly}</li>}
                                                {item?.loyalty_level_bonuses?.monthly && <li>Monthly: {item?.loyalty_level_bonuses?.monthly}</li>}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    {/* Special Notes */}
                                    {item?.special_notes && (
                                        <div className="item-inner-information-loyaltie__element element-item-inner-information-loyaltie">
                                            <div className="element-item-inner-information-loyaltie__label">Special Notes:</div>
                                            <div className="element-item-inner-information-loyaltie__value">{item?.special_notes}</div>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    </div>
)

// ✅ ОСНОВНИЙ КОМПОНЕНТ
export const LoyaltyAcordeon = ({ data }: { data: LoyaltieProgramDataResponse | undefined }) => {
    const { lastUpdate } = useAdaptiveBehavior()

    if (!data?.level_loyalty?.length) {
        return null
    }

    // ✅ ЗМІНА 4: Оптимізоване розділення на колонки
    const midpoint = Math.ceil(data.level_loyalty.length / 2)
    const firstColumnItems = data.level_loyalty.slice(0, midpoint)
    const secondColumnItems = data.level_loyalty.slice(midpoint)

    return (
        <section className="loyaltie__information information-loyaltie">
            <div className="information-loyaltie__container container">
                
                {/* ✅ ЗАГОЛОВОК СЕКЦІЇ */}
                <div className="information-loyaltie__top top-information-loyaltie">
                    <h2 className="top-information-loyaltie__title">Loyalty Information</h2>
                    <div className="information-loyaltie__date date-top-information-loyaltie">
                        <div className="date-top-information-loyaltie__label">Last update:</div>
                        <div className="date-top-information-loyaltie__value">{lastUpdate}</div>
                    </div>
                </div>
                
                {/* ✅ КОНТЕНТ В ДВІ КОЛОНКИ */}
                <div className="information-loyaltie__row">
                    
                    {/* ✅ ПЕРША КОЛОНКА */}
                    <div className="information-loyaltie__column">
                        {firstColumnItems.map((item, index) => (
                            <LoyaltyLevelItem
                                key={`first-col-${item?.level || index}`}
                                item={item}
                                index={index}
                                colors={colors1}
                                isFirstColumn={true}
                            />
                        ))}
                    </div>
                    
                    {/* ✅ ДРУГА КОЛОНКА */}
                    <div className="information-loyaltie__column">
                        {secondColumnItems.map((item, index) => (
                            <LoyaltyLevelItem
                                key={`second-col-${item?.level || index}`}
                                item={item}
                                index={index}
                                colors={colors2}
                                isFirstColumn={false}
                            />
                        ))}
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
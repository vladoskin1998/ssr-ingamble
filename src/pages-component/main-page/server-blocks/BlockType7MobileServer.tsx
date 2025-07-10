import { DataHomeItemsBlock, HomeDataBlock } from '@/types'
import { getTagColorByindex } from '@/helper'
import Link from 'next/link'
import Image from 'next/image'

export default function BlockType7MobileServer({
    data,
}: {
    data: HomeDataBlock<DataHomeItemsBlock>
}) {
    const {
        block_title,
        subtitle,
        title_image,
        data_cards,
        category
    } = data.items_block

    return (
        <section
            aria-label="BlockType7Mobile Server"
            className="main-gamble__no-deposit-bonuses no-deposit-bonuses-gamble"
        >
            <div className="no-deposit-bonuses-gamble__container container">
                <div className="no-deposit-bonuses-gamble__top top">
                    <div className="top__row">
                        <div className="top__column">
                            <div className="top__title-block">
                                {title_image && (
                                    <div className="top__title-icon">
                                        <Image
                                            src={title_image}
                                            alt="Title icon"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                )}
                                <h2 className="top__title">
                                    {block_title}
                                </h2>
                            </div>
                            {subtitle && (
                                <div className="top__subtitle">
                                    {subtitle}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="no-deposit-bonuses-gamble__body">
                    <div className="no-deposit-bonuses-gamble__list">
                        {data_cards.slice(0, 6).map((card) => (
                            <div
                                key={`${card.casino_info.casino_id}-${card.bonus_info.bonus_id}`}
                                className="no-deposit-bonuses-gamble__item"
                            >
                                <div className="item-no-deposit-bonus">
                                    <div className="item-no-deposit-bonus__top">
                                        <div className="item-no-deposit-bonus__casino">
                                            <div className="item-no-deposit-bonus__logo">
                                                <Image
                                                    src={card.casino_info.casino_image || '/img/casino-logo/default.png'}
                                                    alt={card.casino_info.casino_name}
                                                    width={80}
                                                    height={50}
                                                />
                                            </div>
                                            <div className="item-no-deposit-bonus__info">
                                                <div className="item-no-deposit-bonus__name">
                                                    {card.casino_info.casino_name}
                                                </div>
                                                <div className="item-no-deposit-bonus__rank">
                                                    Rank #{card.casino_info.casino_rank}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-no-deposit-bonus__likes">
                                            {card.bonus_info.bonus_likes}
                                        </div>
                                    </div>
                                    <div className="item-no-deposit-bonus__content">
                                        <div className="item-no-deposit-bonus__bonus">
                                            {card.bonus_info.bonus_name}
                                        </div>
                                        {card.bonus_info.labels && (
                                            <div className="item-no-deposit-bonus__labels">
                                                {card.bonus_info.labels.slice(0, 3).map((label, labelIndex) => (
                                                    <span
                                                        key={labelIndex}
                                                        className={`item-no-deposit-bonus__label ${getTagColorByindex(labelIndex)}`}
                                                    >
                                                        {label}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="item-no-deposit-bonus__actions">
                                        <Link
                                            href={`/bonuses/${card.bonus_info.bonus_slug}`}
                                            className="item-no-deposit-bonus__button btn btn-primary"
                                            prefetch={false} 
                                        >
                                            Claim Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="no-deposit-bonuses-gamble__bottom">
                        <Link
                            href={`/bonuses/${category.slug}`}
                            className="no-deposit-bonuses-gamble__btn btn btn-secondary"
                            prefetch={false} 
                        >
                            See All {category.name}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

import { DataHomeItemsBlock, HomeDataBlock } from '@/types'
import { getTagColorByindex } from '@/helper'
import Link from 'next/link'
import Image from 'next/image'

export default function BlockType10MobileServer({
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
            aria-label="BlockType10Mobile Server"
            className="main-gamble__slots-rating slots-rating-gamble"
        >
            <div className="slots-rating-gamble__container container">
                <div className="slots-rating-gamble__top top">
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
                <div className="slots-rating-gamble__slider">
                    <div className="slots-rating-gamble__wrapper">
                        {data_cards.slice(0, 6).map((card) => (
                            <div
                                key={`${card.casino_info.casino_id}-${card.bonus_info.bonus_id}`}
                                className="slots-rating-gamble__slide"
                            >
                                <div className="slide-slots-rating">
                                    <div className="slide-slots-rating__image">
                                        <Image
                                            src={card.casino_info.casino_image || '/img/casino-logo/default.png'}
                                            alt={card.casino_info.casino_name}
                                            width={140}
                                            height={140}
                                            className="slide-slots-rating__logo"
                                        />
                                    </div>
                                    <div className="slide-slots-rating__content">
                                        <div className="slide-slots-rating__header">
                                            <h3 className="slide-slots-rating__name">
                                                {card.casino_info.casino_name}
                                            </h3>
                                            <div className="slide-slots-rating__rank">
                                                #{card.casino_info.casino_rank}
                                            </div>
                                        </div>
                                        <div className="slide-slots-rating__bonus">
                                            {card.bonus_info.bonus_name}
                                        </div>
                                        {card.bonus_info.labels && (
                                            <div className="slide-slots-rating__labels">
                                                {card.bonus_info.labels.slice(0, 2).map((label, labelIndex) => (
                                                    <span
                                                        key={labelIndex}
                                                        className={`slide-slots-rating__label ${getTagColorByindex(labelIndex)}`}
                                                    >
                                                        {label}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="slide-slots-rating__likes">
                                            Likes: {card.bonus_info.bonus_likes}
                                        </div>
                                    </div>
                                    <div className="slide-slots-rating__actions">
                                        <Link
                                            href={`/bonuses/${card.bonus_info.bonus_slug}`}
                                            className="slide-slots-rating__button btn btn-primary"
                                        >
                                            Play Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="slots-rating-gamble__bottom">
                    <Link
                        href={`/bonuses/${category.slug}`}
                        className="slots-rating-gamble__btn btn btn-secondary"
                    >
                        See All {category.name}
                    </Link>
                </div>
            </div>
        </section>
    )
}

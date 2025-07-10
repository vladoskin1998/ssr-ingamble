import { DataHomeItemsBlock, HomeDataBlock } from '@/types'
import { getTagColorByindex } from '@/helper'
import Link from 'next/link'
import Image from 'next/image'

export default function BlockType5MobileServer({
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
            aria-label="BlockType5Mobile Server"
            className="main-gamble__crypto-casinos crypto-casinos-gamble"
        >
            <div className="crypto-casinos-gamble__container container">
                <div className="crypto-casinos-gamble__top top">
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
                <div className="crypto-casinos-gamble__slider">
                    <div className="crypto-casinos-gamble__wrapper">
                        {data_cards.slice(0, 4).map((card) => (
                            <div
                                key={`${card.casino_info.casino_id}-${card.bonus_info.bonus_id}`}
                                className="crypto-casinos-gamble__slide"
                            >
                                <div className="card-casino-crypto">
                                    <div className="card-casino-crypto__header">
                                        <div className="card-casino-crypto__rank">
                                            #{card.casino_info.casino_rank}
                                        </div>
                                        <div className="card-casino-crypto__likes">
                                            {card.bonus_info.bonus_likes}
                                        </div>
                                    </div>
                                    <div className="card-casino-crypto__logo">
                                        <Image
                                            src={card.casino_info.casino_image || '/img/casino-logo/default.png'}
                                            alt={card.casino_info.casino_name}
                                            width={100}
                                            height={60}
                                        />
                                    </div>
                                    <div className="card-casino-crypto__content">
                                        <h3 className="card-casino-crypto__name">
                                            {card.casino_info.casino_name}
                                        </h3>
                                        <div className="card-casino-crypto__bonus">
                                            {card.bonus_info.bonus_name}
                                        </div>
                                        {card.bonus_info.labels && (
                                            <div className="card-casino-crypto__labels">
                                                {card.bonus_info.labels.slice(0, 3).map((label, labelIndex) => (
                                                    <span
                                                        key={labelIndex}
                                                        className={`card-casino-crypto__label ${getTagColorByindex(labelIndex)}`}
                                                    >
                                                        {label}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-casino-crypto__actions">
                                        <Link
                                            href={`/bonuses/${card.bonus_info.bonus_slug}`}
                                            className="card-casino-crypto__button btn btn-primary"
                                            prefetch={false} 
                                        >
                                            Get Bonus
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="crypto-casinos-gamble__bottom">
                    <Link
                        href={`/bonuses/${category.slug}`}
                        className="crypto-casinos-gamble__btn btn btn-secondary"
                        prefetch={false} 
                    >
                        See All {category.name}
                    </Link>
                </div>
            </div>
        </section>
    )
}

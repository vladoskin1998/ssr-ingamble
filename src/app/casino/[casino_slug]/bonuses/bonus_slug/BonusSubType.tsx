const color_gifts = ['item-deposits_grass', 'item-deposits_ocean', 'item-deposits_purple', 'item-deposits_green']

export const BonusSubType = ({ bonus_subtype }: { bonus_subtype: { name: string }[] }) => {
    const blockWidth = (l: number) => {
        switch (l) {
            case 2:
                return 'deposits__column_big'
            case 4:
                return 'deposits__column_small'
            default:
                return 'deposits__column_medium'
        }
    }

    console.log('bonus_subtype', bonus_subtype)
    
    if (!bonus_subtype?.length) return <></>

    return (
        <section className="simple-bonus__deposits deposits">
            <div className="deposits__container container">
                <div className="deposits__body">
                    <div className="deposits__block">
                        <div className="deposits__row">
                            {(bonus_subtype || []).sort((a,b) => a?.name.localeCompare(b?.name)).map((item, index) => {
                                const [part1, part2] = item.name.split('|').map((s) => s.trim())

                                return (
                                    <div key={index} className={`deposits__column ${blockWidth(bonus_subtype.length)}`}>
                                        <div className={`deposits__item item-deposits ${color_gifts[index % 4]}`}>
                                            <div className="item-deposits__icon icon-item-deposits">
                                                <div className="icon-item-deposits__img">
                                                    <svg>
                                                        <use xlinkHref="#gift"></use>
                                                    </svg>
                                                </div>
                                                <div className="icon-item-deposits__number">
                                                    <div className="icon-item-deposits__number-border">
                                                        <span>{index + 1}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-deposits__info info-item-deposits">
                                                <div className="info-item-deposits__label">{part1}</div>
                                                <div className="info-item-deposits__value">{part2}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

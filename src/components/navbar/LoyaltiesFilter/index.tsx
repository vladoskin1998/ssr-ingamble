

import { useFilterContext } from "@/context/FilterContext"
import { AccordionItem } from "../../acordion/Acordion"
import { RangeSlider } from "../../filter-components/RangeSlider"
import { YesNoDoubleCheckbox } from "../../filter-components/YesNoDoubleCheckbox"

export default function LoyaltiesFilter  ()  {
    const { loyaltiesFilters, setLoyaltiesFilters } = useFilterContext()
    return (
        <div
            className={`item-form-filters__body custom-item-form-filters__body`}
        >
            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Loyalty Rank</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <RangeSlider
                            initState={loyaltiesFilters.loyalty_rank}
                            field="loyalty_rank"
                            minmax={[1, 10]}
                            setLocalFilters={setLoyaltiesFilters}
                        />
                    }
                />
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Loyalty Levels Count</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <RangeSlider
                            initState={loyaltiesFilters.loyalty_level_count}
                            field="loyalty_level_count"
                            minmax={[1,50]}
                            setLocalFilters={setLoyaltiesFilters}
                        />
                    }
                />

                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>VIP Manager</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <YesNoDoubleCheckbox
                            initState={loyaltiesFilters.vip_manager}
                            field="vip_manager"
                            setLocalCasinoFilters={setLoyaltiesFilters}
                        />
                    }
                />

                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Level Up Bonus</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <YesNoDoubleCheckbox
                            initState={loyaltiesFilters.level_up_bonus}
                            field="level_up_bonus"
                            setLocalCasinoFilters={setLoyaltiesFilters}
                        />
                    }
                />

                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Increased Withdrawal Limits</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <YesNoDoubleCheckbox
                            initState={loyaltiesFilters.withdrawals}
                            field="withdrawals"
                            setLocalCasinoFilters={setLoyaltiesFilters}
                        />
                    }
                />

                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Special Prizes</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <YesNoDoubleCheckbox
                            initState={loyaltiesFilters.special_prizes}
                            field="special_prizes"
                            setLocalCasinoFilters={setLoyaltiesFilters}
                        />
                    }
                />

                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Gifts</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <YesNoDoubleCheckbox
                            initState={loyaltiesFilters.gifts}
                            field="gifts"
                            setLocalCasinoFilters={setLoyaltiesFilters}
                        />
                    }
                />
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Bonuses</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <YesNoDoubleCheckbox
                            initState={loyaltiesFilters.bonuses}
                            field="bonuses"
                            setLocalCasinoFilters={setLoyaltiesFilters}
                        />
                    }
                />
            </div>
        </div>
    )
}

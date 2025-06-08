import { useFilterContext } from "../../../context/FilterContext"
import { getFilterContentHeight } from "../../../helper"
import { BonusFilterDataType, GeneralFilterDataType } from "../../../types"
import { AccordionItem } from "../../acordion/Acordion"
import { ListCheckBox } from "../../filter-components/ListCheckBox"
import { RangeSlider } from "../../filter-components/RangeSlider"
import { UnlimitedCheckBox } from "../../filter-components/UnlimitedCheckBox"
import { YesNoDoubleCheckbox } from "../../filter-components/YesNoDoubleCheckbox"
import { Wagering } from "./Wagering"

//@ts-ignore
const DataWageringDifficulty = ["Easy", "Medium", "Hard"]

export default function BonusFilter ({
    datasFilterBonus,
}: {
    datasFilterBonus: (GeneralFilterDataType & BonusFilterDataType) | undefined
})  {
    const { bonusFilters, setBonusFilters } = useFilterContext()

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
                            <span>Bonus Rank</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <RangeSlider
                            initState={bonusFilters.bonus_rank}
                            field="bonus_rank"
                            minmax={[1, 10]}
                            setLocalFilters={setBonusFilters}
                        />
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Bonus Community Likes</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <RangeSlider
                            initState={bonusFilters.bonus_likes}
                            field="bonus_likes"
                            minmax={[1, 1000000]}
                            setLocalFilters={setBonusFilters}
                        />
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Minimum Deposit</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <RangeSlider
                            initState={bonusFilters.bonus_min_dep}
                            field="bonus_min_dep"
                            minmax={[1, 10000]}
                            setLocalFilters={setBonusFilters}
                        />
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Maximum Bet</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <div>
                            <RangeSlider
                                initState={bonusFilters.bonus_max_bet}
                                field="bonus_max_bet"
                                minmax={[1, 30]}
                                setLocalFilters={setBonusFilters}
                                unlimitedInitStateField="unlimited_bonus_max_bet"
                            />
                            <UnlimitedCheckBox
                                initState={bonusFilters.unlimited_bonus_max_bet}
                                field="unlimited_bonus_max_bet"
                                setLocalFilters={setBonusFilters}
                                clearFieldsInitState={() =>
                                    setBonusFilters((s) => ({
                                        ...s,
                                        bonus_max_bet: null,
                                    }))
                                }
                            />
                        </div>
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Free Spin Amount</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <RangeSlider
                            initState={bonusFilters.free_spin_amount}
                            field="free_spin_amount"
                            minmax={[
                                1,
                                datasFilterBonus?.max_free_spin_amount_value ||
                                    100000,
                            ]}
                            setLocalFilters={setBonusFilters}
                        />
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Bonus Value (%)</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <RangeSlider
                            initState={bonusFilters.bonus_value}
                            field="bonus_value"
                            minmax={[1, 1000]}
                            setLocalFilters={setBonusFilters}
                        />
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Bonus Amount</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <div>
                            <RangeSlider
                                initState={bonusFilters.bonus_amount}
                                field="bonus_amount"
                                minmax={[
                                    1,
                                    datasFilterBonus?.max_bonus_amount_value ||
                                        1000000,
                                ]}
                                setLocalFilters={setBonusFilters}
                                unlimitedInitStateField="unlimited_bonus_amount"
                            />
                            <UnlimitedCheckBox
                                initState={bonusFilters.unlimited_bonus_amount}
                                field="unlimited_bonus_amount"
                                setLocalFilters={setBonusFilters}
                                clearFieldsInitState={() =>
                                    setBonusFilters((s) => ({
                                        ...s,
                                        bonus_amount: null,
                                    }))
                                }
                            />
                        </div>
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Bonus Maximum Win</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <div>
                            <RangeSlider
                                initState={bonusFilters.bonus_max_win}
                                field="bonus_max_win"
                                minmax={[
                                    1,
                                    datasFilterBonus?.max_bonus_max_win_value ||
                                        1000000,
                                ]}
                                setLocalFilters={setBonusFilters}
                                unlimitedInitStateField="unlimited_bonus_max_win"
                            />
                            <UnlimitedCheckBox
                                initState={bonusFilters.unlimited_bonus_max_win}
                                field="unlimited_bonus_max_win"
                                setLocalFilters={setBonusFilters}
                                clearFieldsInitState={() =>
                                    setBonusFilters((s) => ({
                                        ...s,
                                        bonus_max_win: null,
                                    }))
                                }
                            />
                        </div>
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Bonus Type</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            placeholder="Search (Bonus Type)"
                            initState={bonusFilters?.bonus_type}
                            height={getFilterContentHeight(
                                datasFilterBonus?.bonus_type?.length
                            )}
                            list={datasFilterBonus?.bonus_type}
                            field="bonus_type"
                            setLocalFilters={setBonusFilters}
                        />
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Daily Availability</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={bonusFilters?.daily_availability}
                            height={getFilterContentHeight(
                                datasFilterBonus?.daily_availability?.length
                            )}
                            list={datasFilterBonus?.daily_availability.map(
                                (item) => ({ id: item.id, name: item.day })
                            )}
                            field="daily_availability"
                            setLocalFilters={setBonusFilters}
                        />
                    }
                />
            </div>

            {/* <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Wagering Difficulty</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={bonusFilters?.wagering_difficulty}
                            height={getFilterContentHeight(
                                DataWageringDifficulty.length
                            )}
                            list={DataWageringDifficulty.map((item) => ({
                                id: item.toLocaleLowerCase(),
                                name: item,
                            }))}
                            field="wagering_difficulty"
                            setLocalFilters={setBonusFilters}
                        />
                    }
                />
            </div> */}

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Selected Countries</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            keyType="bonus_selected_countries"
                            initState={bonusFilters.selected_countries}
                            field="selected_countries"
                            placeholder="Search (Country)"
                            list={datasFilterBonus?.countries}
                            setLocalFilters={setBonusFilters}
                            height={getFilterContentHeight(
                                datasFilterBonus?.countries?.length
                            )}
                        />
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Selected Games</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={bonusFilters.selected_games}
                            field="selected_games"
                            placeholder="Search (Game)"
                            list={datasFilterBonus?.games}
                            setLocalFilters={setBonusFilters}
                            height={getFilterContentHeight(
                                datasFilterBonus?.games?.length
                            )}
                        />
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Selected Providers</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                        isImageShow={false}
                            initState={bonusFilters.selected_providers}
                            field="selected_providers"
                            placeholder="Search (Providers)"
                            list={datasFilterBonus?.game_providers}
                            setLocalFilters={setBonusFilters}
                            height={getFilterContentHeight(
                                datasFilterBonus?.game_providers?.length
                            )}
                        />
                    }
                />
            </div>
            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Sticky</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <YesNoDoubleCheckbox
                            initState={bonusFilters.sticky}
                            field="sticky"
                            setLocalCasinoFilters={setBonusFilters}
                        />
                    }
                />
            </div>

            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Wagering</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={
                        <Wagering
                            initState={{
                                deposit_only: bonusFilters.deposit_only,
                                winnings_only: bonusFilters.winnings_only,
                                bonus_plus_deposit:
                                    bonusFilters.bonus_plus_deposit,
                                bonus_only: bonusFilters.bonus_only,
                            }}
                            setLocalFilters={setBonusFilters}
                        />
                    }
                />
            </div>
        </div>
    )
}

import { CasinoFilterDataType, GeneralFilterDataType } from "../../../types"
import { AccordionItem } from "../../acordion/Acordion"
import "rc-slider/assets/index.css"
import { useFilterContext } from "../../../context/FilterContext"
//@ts-ignore
import { CasinoPlayersFromContent } from "./CasinoPlayersFromContent"
//@ts-ignore
import { ByLicenses } from "./ByLicenses"
import { RangeSlider } from "../../filter-components/RangeSlider"

import { YesNoDoubleCheckbox } from "../../filter-components/YesNoDoubleCheckbox"
import { ListCheckBox } from "../../filter-components/ListCheckBox"
import { WithdrawalLimits } from "./WithdrawalLimits"
import { MinimumDeposit } from "./MinimumDeposit"
import { getFilterContentHeight } from "../../../helper"
import { UnlimitedCheckBox } from "../../filter-components/UnlimitedCheckBox"

export default function CasinoFilterContent ({
    datasFilterCasino,
}: {
    datasFilterCasino:
        | (GeneralFilterDataType & CasinoFilterDataType)
        | undefined
})  {
    const { casinoFilters, setCasinoFilters } = useFilterContext()

    return (
        <div className={`item-form-filters__body custom-item-form-filters__body`}>
            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    defaultOpen
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Allowed Countries</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={casinoFilters.selected_countries}
                            field="selected_countries"
                            placeholder="Search (Country)"
                            list={datasFilterCasino?.countries}
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(datasFilterCasino?.countries?.length)}
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
                            <span>Casino Rank</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={<RangeSlider initState={casinoFilters.casino_rank} field="casino_rank" minmax={[1, 10]} setLocalFilters={setCasinoFilters} />}
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
                            <span>Casino Likes</span>
                            <span className="title-form-filter__count">1</span>
                        </h3>
                    }
                    content={<RangeSlider initState={casinoFilters.casino_likes} field="casino_likes" minmax={[1, 10000]} setLocalFilters={setCasinoFilters} />}
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
                            <span>By Year of Establishment</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={<RangeSlider initState={casinoFilters.established} field="established" minmax={[new Date().getFullYear() - 10, new Date().getFullYear()]} setLocalFilters={setCasinoFilters} />}
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
                            <span>By Licenses</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            isImageShow={false}
                            initState={casinoFilters.licenses}
                            field="licenses"
                            placeholder="Search (License )"
                            list={datasFilterCasino?.licenses}
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(datasFilterCasino?.licenses?.length)}
                        />

                        // <ByLicenses
                        //     licenses={datasFilterCasino?.licenses}
                        //     setLocalCasinoFilters={setCasinoFilters}
                        // />
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
                            <span>VPN Allowed</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={<YesNoDoubleCheckbox initState={casinoFilters.vpn_usage} field="vpn_usage" setLocalCasinoFilters={setCasinoFilters} nameFiled={['Allowed', 'Not Allowed']} />}
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
                            <span>Providers</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            isImageShow={false}
                            initState={casinoFilters.game_providers}
                            field="game_providers"
                            placeholder="Search (Game Providers)"
                            list={datasFilterCasino?.game_providers}
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(datasFilterCasino?.game_providers?.length)}
                        />
                    }
                />
            </div>
            <div className="item-form-filters__filter form-filter">
                <AccordionItem
                    // maxHg="260px"
                    heading={
                        <h3 className="form-filter__title title-form-filter accordion--title--element">
                            <span className="title-form-filter__icon">
                                <svg>
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </span>
                            <span>Game Types</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={casinoFilters.game_types}
                            field="game_types"
                            placeholder="Search (Game Types)"
                            list={datasFilterCasino?.game_types}
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(datasFilterCasino?.game_types?.length)}
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
                            <span>Games</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={casinoFilters.games}
                            field="games"
                            placeholder="Search (Game)"
                            list={datasFilterCasino?.games}
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(datasFilterCasino?.games?.length)}
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
                            <span>Tournaments</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={<YesNoDoubleCheckbox initState={casinoFilters.tournaments} field="tournaments" setLocalCasinoFilters={setCasinoFilters} />}
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
                            <span>Sportsbook</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={<YesNoDoubleCheckbox initState={casinoFilters.sportsbook} field="sportsbook" setLocalCasinoFilters={setCasinoFilters} />}
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
                            <span>Language (Website)</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={casinoFilters.language_website}
                            list={datasFilterCasino?.language}
                            field="language_website"
                            placeholder="Search (Language)"
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(datasFilterCasino?.language?.length)}
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
                            <span>Language (Live chat)</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={casinoFilters.language_live_chat}
                            list={datasFilterCasino?.language}
                            field="language_live_chat"
                            placeholder="Search (Language)"
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(
                                datasFilterCasino?.language?.length
                            )}
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
                            <span>Payment Methods</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            isImageShow={false}
                            initState={casinoFilters.payment_methods}
                            list={datasFilterCasino?.payment_methods}
                            field="payment_methods"
                            placeholder="Search (Payment Methods)"
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(datasFilterCasino?.payment_methods?.length)}
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
                            <span>Currencies</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={casinoFilters.accepted_currencies}
                            list={datasFilterCasino?.classic_currency}
                            field="accepted_currencies"
                            placeholder="Search (Currencies)"
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(datasFilterCasino?.classic_currency?.length)}
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
                            <span>Crypto Currencies</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={casinoFilters.accepted_currencies}
                            list={datasFilterCasino?.crypto_currencies}
                            field="accepted_currencies"
                            placeholder="Search (Crypto Currencies)"
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(datasFilterCasino?.crypto_currencies?.length)}
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
                            <span>Casino Owner</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={casinoFilters.casino_owner}
                            list={datasFilterCasino?.casino_owner.map((item) => ({
                                id: item as string,
                                name: item,
                            }))}
                            field="casino_owner"
                            placeholder="Search (Casino Owner)"
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(datasFilterCasino?.casino_owner?.length)}
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
                            <span>Responsible Gambling</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={casinoFilters?.responsible_gambling}
                            list={datasFilterCasino?.responsible_gambling.map((item) => ({
                                id: item?.value as any,
                                name: item?.label,
                            }))}
                            field="responsible_gambling"
                            placeholder="Search (Responsible Gambling)"
                            setLocalFilters={setCasinoFilters}
                            height={getFilterContentHeight(datasFilterCasino?.responsible_gambling?.length)}
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
                            <span>Withdrawal Limits</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={<WithdrawalLimits initState={casinoFilters.withdrawal_limits} setLocalCasinoFilters={setCasinoFilters} />}
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
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <div>
                            <MinimumDeposit
                                initState={casinoFilters.min_deposit}
                                label="Minimum Deposit"
                                field="min_deposit"
                                max={datasFilterCasino?.max_min_deposit_value || 2222}
                                setLocalCasinoFilters={setCasinoFilters}
                                unlimitedInitStateField="unlimited_min_deposit"
                            />
                            <UnlimitedCheckBox
                                initState={casinoFilters.unlimited_min_deposit}
                                field="unlimited_min_deposit"
                                setLocalFilters={setCasinoFilters}
                                clearFieldsInitState={() =>
                                    setCasinoFilters((s) => ({
                                        ...s,
                                        min_deposit: null,
                                    }))
                                }
                            />
                        </div>
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
                            <span>Payout Speed</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={
                        <ListCheckBox
                            initState={casinoFilters.payout_speed}
                            height={getFilterContentHeight(
                                datasFilterCasino?.payout_speed?.length
                            )}
                            list={datasFilterCasino?.payout_speed}
                            field="payout_speed"
                            setLocalFilters={setCasinoFilters}
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
                            <span>Minimum Wagering</span>
                            <span className="title-form-filter__count">1</span>
                            <a rel="nofollow noopener" href="" aria-label="Put your description here." className="title-form-filter__info-icon info-info">
                                <svg>
                                    <use xlinkHref="#info"></use>
                                </svg>
                            </a>
                        </h3>
                    }
                    content={
                        <div>
                            <MinimumDeposit
                                initState={casinoFilters.min_wager}
                                label="Minimum Wagering"
                                field="min_wager"
                                max={datasFilterCasino?.max_min_wagering_value || 100000}
                                setLocalCasinoFilters={setCasinoFilters}
                                keyToValue={'X'}
                                unlimitedInitStateField="unlimited_min_wager"
                            />

                            <UnlimitedCheckBox
                                initState={casinoFilters.unlimited_min_wager}
                                field="unlimited_min_wager"
                                setLocalFilters={setCasinoFilters}
                                clearFieldsInitState={() =>
                                    setCasinoFilters((s) => ({
                                        ...s,
                                        min_wager: null,
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
                            <span>Bonus Hunt w. Active Bonus</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={<YesNoDoubleCheckbox initState={casinoFilters.bonus_hunt_with_active_bonus} field="bonus_hunt_with_active_bonus" setLocalCasinoFilters={setCasinoFilters} />}
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
                            <span>Casinos w. Social Bonuses</span>
                            <span className="title-form-filter__count"></span>
                        </h3>
                    }
                    content={<YesNoDoubleCheckbox initState={casinoFilters.social_bonus} field="social_bonus" setLocalCasinoFilters={setCasinoFilters} />}
                />
            </div>
        </div>
    )
}

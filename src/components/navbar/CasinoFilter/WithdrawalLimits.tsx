import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { CasinoFilterBodyType } from "../../../types"

const initStateWithdrawalLimitsMax = {
    daily: 10000,
    weekly: 100000,
    monthly: 100000000,
}

const renderLimit = (
    label: string,
    value: number | null,
    min: number,
    max: number,
    onChange: (value: number) => void
) => (
    <div className="form-filter__range range-form-filter range-form-filter_only">
        <div className="range-form-filter__label">{label}</div>
        <div className="range-form-filter__top">
            <div className="range-form-filter__field field">
                <input
                    className="field__input field__input_only"
                    type="number"
                    
                    value={value || ""}
                    onChange={(e) => onChange(Number(e.target.value))}
                />
                <span className="field__icon">$</span>
            </div>
        </div>
        <div className="range-form-filter__input input-range input-style-range">
            <Slider
                className="input-style-range"
                min={min}
                max={max}
                value={value || 0}
                onChange={(v) => onChange(Number(v))}
            />
        </div>
        <div className="range-form-filter__min-max">
            <span className="range-form-filter__min">$ 1</span>
            <span className="range-form-filter__max">
                $ {max.toLocaleString("en-US")}
            </span>
        </div>
    </div>
)

export const WithdrawalLimits = ({
    initState,
    setLocalCasinoFilters,
}: {
    initState: {
        daily: number | null
        weekly: number | null
        monthly: number | null
        unlimited: boolean | undefined
    }
    setLocalCasinoFilters: React.Dispatch<
        React.SetStateAction<CasinoFilterBodyType>
    >
}) => {
    const handleLimitChange = (
        value: number | boolean,
        limitType: "daily" | "weekly" | "monthly" | "unlimited"
    ) => {
        if (typeof value === "number" || typeof value === "string") {
            const maxLimit =
                initStateWithdrawalLimitsMax[
                    limitType as keyof typeof initStateWithdrawalLimitsMax
                ]
            const newValue = Math.min(value, maxLimit as number)

            value = newValue

            setLocalCasinoFilters((s) => ({
                ...s,
                withdrawal_limits: {
                    ...s.withdrawal_limits,
                    unlimited: undefined,
                    [limitType]: value || null,
                },
            }))
        } else {
            setLocalCasinoFilters((s) => ({
                ...s,
                withdrawal_limits: {
                    daily: null,
                    weekly: null,
                    monthly: null,
                    unlimited: !s.withdrawal_limits.unlimited
                        ? true
                        : undefined,
                },
            }))
        }
    }

    return (
        <div className="form-filter__body input-style-range">
            {renderLimit(
                "Daily Limits",
                initState?.daily,
                0,
                initStateWithdrawalLimitsMax.daily,
                (value) => handleLimitChange(value, "daily")
            )}
            {renderLimit(
                "Weekly Limits",
                initState?.weekly,
                0,
                initStateWithdrawalLimitsMax.weekly,
                (value) => handleLimitChange(value, "weekly")
            )}
            {renderLimit(
                "Monthly Limits",
                initState?.monthly,
                0,
                initStateWithdrawalLimitsMax.monthly,
                (value) => handleLimitChange(value, "monthly")
            )}
            <div>
                <input
                    id={`formFilterPlayersFromWithdrawalLimits`}
                    type="checkbox"
                    checked={initState?.unlimited ?? false}
                    className="radio-form-filter__input form-filter__input"
                    onChange={() =>
                        handleLimitChange(!initState?.unlimited, "unlimited")
                    }
                />
                <label
                    htmlFor={`formFilterPlayersFromWithdrawalLimits`}
                    className="radio-form-filter__label"
                >
                    <span>Unlimited</span>
                </label>
            </div>
        </div>
    )
}

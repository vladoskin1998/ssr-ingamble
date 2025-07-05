'use client'

import Slider from "rc-slider"
import { useEffect, useState } from "react"
import { BonusFilterBodyType, CasinoFilterBodyType, LoyaltiesFilterBodyType } from "@/types"

export const RangeSlider = <T extends CasinoFilterBodyType | BonusFilterBodyType | LoyaltiesFilterBodyType>({
    initState,
    field,
    minmax,
    unlimitedInitStateField,
    setLocalFilters,
}: {
    initState: { min: number; max: number } | null
    field: string
    minmax: number[] 
    unlimitedInitStateField?: string
    setLocalFilters: React.Dispatch<
        React.SetStateAction<T>
    >
}) => {
    const [localRange, setLocalRange] = useState(minmax)


    const handleRangeChange = (n: number[]) => {
        const [minValue, maxValue] = n
        const clampedMin = Math.max(0, Math.min(minValue, minmax[1]))
        const clampedMax = Math.max(0, Math.min(maxValue, minmax[1]))
        setLocalRange([clampedMin, clampedMax])
            if(!clampedMin && !clampedMax){
                setLocalFilters((s) => ({
                    ...s,
                    [field]: undefined,
                    [unlimitedInitStateField as keyof T]: undefined
                }))
                return
            }
        setLocalFilters((s) => ({
            ...s,
            [field]: {
                min: isNaN(clampedMin)  ? 0 : clampedMin,
                max:  isNaN(clampedMax)  ? 0 : clampedMax,
            },
            [unlimitedInitStateField as keyof T]: undefined
        }))
    }

    useEffect(() => {
        if (initState) setLocalRange([initState.min, initState.max])
        else {
            setLocalRange([minmax[0], minmax[1]])
        }
    }, [initState, minmax])
    return (
        <div className="form-filter__body">
            <div className="form-filter__range range-form-filter range-form-filter_few">
                <div className="range-form-filter__top">
                    <div className="range-form-filter__field field">
                        <input
                            type="number"
                            className="field__input field__input_min"
                            value={localRange[0] || ''}
                            onChange={(v) =>
                                handleRangeChange([
                                    Number(v.target.value),
                                    localRange?.[1],
                                ])
                            }
                        />
                    </div>
                    <div className="range-form-filter__separetor">to</div>
                    <div className="range-form-filter__field field">
                        <input
                            type="number"
                            className="field__input field__input_max"
                            value={localRange[1]  || ''}
                            onChange={(v) =>
                                handleRangeChange([
                                    localRange?.[0],
                                    Number(v.target.value),
                                ])
                            }
                        />
                    </div>
                </div>
                <Slider
                    range
                    className="input-style-range"
                    min={minmax[0]}
                    max={minmax[1]}
                    value={localRange}
                    onChange={(v) => handleRangeChange(v as number[])}
                />
            </div>
        </div>
    )
}

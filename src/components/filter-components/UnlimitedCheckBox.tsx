import React from "react"
import { BonusFilterBodyType, CasinoFilterBodyType } from "../../types"

export const UnlimitedCheckBox = <
    M extends CasinoFilterBodyType | BonusFilterBodyType
>({
    initState,
    field,
    setLocalFilters,
    clearFieldsInitState = () => {},
}: {
    initState: boolean | undefined
    field: string
    setLocalFilters: React.Dispatch<React.SetStateAction<M>>
    clearFieldsInitState?: () => void
}) => {
    const handleYesNoChange = () => {
        if( !initState ){
            clearFieldsInitState()
        }
       
        setLocalFilters((prevFilters) => ({
            ...prevFilters,
            [field]:
                prevFilters?.[field as keyof M] === undefined
                    ? true
                    : undefined,
        }))
    }

    return (
        <div className="" style={{ margin: "0px 12px 16px 12px" }}>
            <input
                id={`formFilterPlayersFrom${field}`}
                type="checkbox"
                checked={initState ?? false}
                className="radio-form-filter__input form-filter__input"
                onChange={handleYesNoChange}
            />
            <label
                htmlFor={`formFilterPlayersFrom${field}`}
                className="radio-form-filter__label"
            >
                <span>Unlimited</span>
            </label>
        </div>
    )
}

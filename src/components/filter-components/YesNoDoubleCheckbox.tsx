import { BonusFilterBodyType, CasinoFilterBodyType, LoyaltiesFilterBodyType } from '../../types'

export const YesNoDoubleCheckbox = <T extends CasinoFilterBodyType | BonusFilterBodyType | LoyaltiesFilterBodyType>({
    initState,
    field,
    setLocalCasinoFilters,
    nameFiled = ['Yes', 'No'],
}: {
    initState: boolean | undefined
    field: string
    setLocalCasinoFilters: React.Dispatch<React.SetStateAction<T>>
    nameFiled?: [string, string]
}) => {
    const handleYesNoChange = (isAllowed: boolean) => {
        setLocalCasinoFilters((prevFilters) => ({
            ...prevFilters,
            [field]: prevFilters?.[field as keyof T] === isAllowed ? undefined : isAllowed,
        }))
    }

    return (
        <div className="form-filter__body">
            <div className="form-filter__radio radio-form-filter">
                <div className="radio-form-filter__items">
                    <div className="radio-form-filter__item" onClick={() => handleYesNoChange(true)}>
                        <input type="checkbox" className="radio-form-filter__input form-filter__input" checked={initState === true} onChange={() => {}} />
                        <label className="radio-form-filter__label">
                            <span>{nameFiled[0]}</span>
                        </label>
                    </div>
                    <div className="radio-form-filter__item" onClick={() => handleYesNoChange(false)}>
                        <input onChange={() => {}} type="checkbox" className="radio-form-filter__input form-filter__input" checked={initState === false} />
                        <label className="radio-form-filter__label">
                            <span>{nameFiled[1]}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

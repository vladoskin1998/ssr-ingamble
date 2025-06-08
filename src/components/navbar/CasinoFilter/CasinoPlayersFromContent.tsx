import { useState, useMemo, memo, useEffect } from 'react'
import { FixedSizeList as List } from 'react-window'
import { CasinoFilterBodyType } from '../../../types'

type ListCasinoPlayersFromContentType = { id: number; name: string; name2: string | null; code: string; image: string | null }[]

export const CasinoPlayersFromContent = memo(
    ({ initState, countries, setLocalCasinoFilters }: { initState: number[]; countries: ListCasinoPlayersFromContentType | undefined; setLocalCasinoFilters: React.Dispatch<React.SetStateAction<CasinoFilterBodyType>> }) => {
        const [searchText, setSearchText] = useState('')

        const [localSelectedCountries, setLocalSelectedCountries] = useState<number[]>([])

        const checkboxItem = (id: number) => {
            setLocalCasinoFilters((prevFilters) => {
                const isSelected = prevFilters?.selected_countries?.includes(id)
                return {
                    ...prevFilters,
                    selected_countries: isSelected ? prevFilters?.selected_countries?.filter((item) => item !== id) : [...prevFilters?.selected_countries, id],
                }
            })
            setLocalSelectedCountries((prevFilters) => {
                const isSelected = prevFilters.includes(id)
                if (isSelected) {
                    return prevFilters.filter((item) => item !== id)
                }
                return [...prevFilters, id]
            })
        }

        const filteredCountries = useMemo(() => {
            return countries?.filter((country) => country.name.toLowerCase().includes(searchText.toLowerCase()))
        }, [countries, searchText])

        useEffect(() => {
            if (!initState.length) {
                setLocalSelectedCountries([])
            }
        }, [initState])

        return (
            <div className="form-filter__body">
                <div className="form-filter__checkbox checkbox-form-filter">
                    {/* <div className="form-filter__your-country your-country-form-filter">
                    <div className="your-country-form-filter__text">
                        Is this your country of residence?
                    </div>
                    <div className="your-country-form-filter__row">
                        <div className="your-country-form-filter__country">
                            <span className="flag">
                                <LazyLoadImage
                                    alt="ukraine"
                                    src={ukraine}
                                    width={20}
                                    height={20}
                                />
                            </span>
                            <span>Ukraine</span>
                        </div>
                        <a
                            rel="nofollow noopener"
                            href=""
                            aria-label="Put your description here."
                            className="your-country-form-filter__btn"
                        >
                            Change
                        </a>
                    </div>
                </div> */}
                    <div className="form-filter__search-block">
                        <span className="form-filter__search-icon">
                            <svg>
                                <use xlinkHref="#search"></use>
                            </svg>
                        </span>
                        <input placeholder="Search (Country)" type="text" className="form-filter__search-input" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                    <div className="form-filter__radio radio-form-filter">
                        <List className="radio-form-filter__items radio-form-filter__items_flags" itemCount={filteredCountries?.length || 0} height={260} width={'auto'} itemSize={40}>
                            {({ index, style }) => {
                                const country = filteredCountries?.[index]
                                const isChecked = localSelectedCountries?.includes(country?.id || 0)
                                return (
                                    <div className="radio-form-filter__item" style={style}>
                                        <input id={`formFilterPlayersFrom${country?.name}`} type="checkbox" checked={isChecked} className="radio-form-filter__input form-filter__input" onChange={() => checkboxItem(country?.id || 0)} />
                                        <label htmlFor={`formFilterPlayersFrom${country?.name}`} className="radio-form-filter__label">
                                            <span className="flag">
                                                <img loading="lazy" alt={country?.name} src={country?.image || ''} width={20} height={20} />
                                            </span>
                                            <span>{country?.name}</span>
                                        </label>
                                        <span className="number">{country?.id}</span>
                                    </div>
                                )
                            }}
                        </List>
                    </div>
                </div>
            </div>
        )
    },
)

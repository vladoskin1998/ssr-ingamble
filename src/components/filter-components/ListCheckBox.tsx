'use client'

import { useState, useMemo, useEffect, memo } from "react"
import { FixedSizeList as List } from "react-window"
import { BonusFilterBodyType, CasinoFilterBodyType } from "@/types"
import Image from "next/image"

// Типизация для ключей, которые содержат массивы чисел
// type NumberArrayKeys<T> = {
//   [K in keyof T]: T[K] extends number[] ? K : never
// }[keyof T]

const maxHeight = 260

const ListCheck = <M extends CasinoFilterBodyType | BonusFilterBodyType>({
    initState,
    list,
    isImageShow = true,
    setLocalFilters,
    placeholder,
    field,
    height = 240,
    keyType,
}: {
    initState: (number | string)[] | undefined
    isImageShow?: boolean,
    list:
        | {
              id: number | string
              name: string
              image?: string | null
              flag_image?: string | null
              symbol?: string
              name2?: string | null
              allowed_casinos_count?: number | null
          }[]
        | undefined
    setLocalFilters: React.Dispatch<React.SetStateAction<M>>
    placeholder?: string
    field: string
    height?: number
    keyType?: string
}) => {
    const [searchText, setSearchText] = useState("")
    const [localFilterItems, setLocalFilterItems] = useState<(number | string)[]>([])

    const checkboxItem = (id: number | string) => {
        setLocalFilters((prevFilters) => {
            const currentValues = prevFilters[field as keyof M] as (number | string)[]
            const isSelected = currentValues.includes(id)
            return {
                ...prevFilters,
                [field]: isSelected
                    ? currentValues.filter((item) => item !== id)
                    : [...currentValues, id],
            }
        })
        setLocalFilterItems((prevFilters) => {
            const isSelected = prevFilters.includes(id)
            if (isSelected) {
                return prevFilters.filter((item) => item !== id)
            }
            return [...prevFilters, id]
        })
    }

    const filteredCountries = useMemo(() => {
        return list?.filter((country) =>
            country.name.toLowerCase().includes(searchText.toLowerCase())
        )
    }, [list, searchText])

  
    useEffect(() => {
        setLocalFilterItems(initState || [])
    }, [initState])

    return (
        <div className="form-filter__body">
            <div className="form-filter__checkbox checkbox-form-filter">
                {placeholder && (
                    <div className="form-filter__search-block">
                        <span className="form-filter__search-icon">
                            <svg>
                                <use xlinkHref="#search"></use>
                            </svg>
                        </span>
                        <input
                            placeholder={placeholder}
                            type="text"
                            className="form-filter__search-input"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                )}

                <div className="form-filter__radio radio-form-filter">
                    <List
                        className="radio-form-filter__items radio-form-filter__items_flags"
                        itemCount={filteredCountries?.length || 0}
                        height={height > maxHeight ? maxHeight : height}
                        width={"auto"}
                        itemSize={40}
                    >
                        {({ index, style }) => {
                            const itemFilter = filteredCountries?.[index]
                            const isChecked = localFilterItems?.includes(
                                itemFilter?.id || 0
                            )
                            return (
                                <div className="radio-form-filter__item" style={style}>
                                    <input
                                        id={`${keyType}${field}formFilterPlayersFrom${itemFilter?.name}`}
                                        type="checkbox"
                                        checked={isChecked ?? false}
                                        className="radio-form-filter__input form-filter__input"
                                        onChange={() => checkboxItem(itemFilter?.id || 0)}
                                    />
                                    <label
                                        htmlFor={`${keyType}${field}formFilterPlayersFrom${itemFilter?.name}`}
                                        className="radio-form-filter__label"
                                    >
                                        {isImageShow && (itemFilter?.image || itemFilter?.flag_image) && (
                                            <span className="flag">
                                                <Image
                                                    loading="lazy"
                                                    alt={itemFilter?.name || 'Filter item'}
                                                    src={itemFilter?.image || itemFilter?.flag_image || '/img/no-results.svg'}
                                                    width={20}
                                                    height={20}
                                                />
                                            </span>
                                        )}
                                        <span>{itemFilter?.name}</span>
                                    </label>
                                    {itemFilter?.allowed_casinos_count && (
                                        <span className="number">{itemFilter?.allowed_casinos_count}</span>
                                    )}
                                </div>
                            )
                        }}
                    </List>
                </div>
            </div>
        </div>
    )
}

export const ListCheckBox = memo(ListCheck) as typeof ListCheck

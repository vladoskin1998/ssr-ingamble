const OFFSET = 127397
export const getCountryFlagEmoji = (countryCode: string) => {
    //@ts-ignore
    return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + OFFSET))
}

export const CountryFlagEmoji = ({ code }: { code: string }) => {
    const title = code

    return (
        <span role="img" aria-labelledby={title} title={title} className="emoji">
            {code ? getCountryFlagEmoji(code) : '🏳'}
        </span>
    )
}

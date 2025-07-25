import { MakeListFilterHeaderType, makeListFilterHeader } from "../components/filter-components/FilterHeaderList"
import $api from "../http"
import { RouteToNextFilter } from '../context/FilterContext'
import { CasinoFilterBodyType, BonusFilterBodyType, LoyaltiesFilterBodyType } from '../types'

export const baseURL = 'https://ig-api-prod.incasinowetrust.com/api/v1/';

export const euroToDolar = (s?: string) => {

    if (s === "EUR" || s === "Euro" || !s) {
        return '$'
    }
    return s
}

export const CURRENTYEAR = new Date().getFullYear()

export const COLORS_TAGS = [
    "tags-casino-card__item_blue",
    "tags-casino-card__item_green",
    "tags-casino-card__item_purple",
    "tags-casino-card__item_grass",
    "tags-casino-card__item_orange",
]

export const getTagColorByindex = (id:number) => {
    return COLORS_TAGS[id % 5]
}



export const LOYALTIECATEGORYIES = [
    {
        name: 'Top Ranked Loyalties',
        slug: 'loyalty-rank',
    },
    {
        name: 'Access to VIP Manager',
        slug: 'vip-manager',
    },
    {
        name: 'Level-Up Rewards',
        slug: 'level-up-bonus',
    },
    {
        name: 'Unlimited Cashouts',
        slug: 'withdrawals',
    },
    {
        name: 'Exclusive Gifts & Prizes ',
        slug: 'special-prizes',
    },
    {
        name: 'Birthday Gifts',
        slug: 'gifts',
    },
]


export const NumberAssociaty = (n: number | string) => {
    if (typeof n === "string") return n
    const s = String(n)
    if (n >= 1000000) {
        return s.replace(/000000$/ig, "M")
    }
    else if (n >= 1000) {
        return s.replace(/000$/ig, "K")
    }
    else return n
}



export const getFilterContentHeight = (s: number | undefined) => {
    if (!s) return
    return s * 40 > 240 ? 240 : s * 40
}

export const sliceString = (s: string | undefined, l: number) => {
    if (!s) return ''
    return s.length > l ? `${s.slice(0, l)}...` : s
}

export const filterEmptyValues = <T>(body: T): Partial<T> => {
    const isEmptyObject = (value: unknown): boolean => {
        if (typeof value !== "object" || value === null) return false;

        const obj = value as Record<string, unknown>;
        return Object.values(obj).every(
            (val) =>
                val === null ||
                val === undefined ||
                (Array.isArray(val) && val.length === 0) ||
                (typeof val === "object" && val !== null && isEmptyObject(val))
        );
    };

    return Object.fromEntries(
        Object.entries(body as Record<string, unknown>).filter(([, value]) => {
            if (value === null || value === undefined) return false;
            if (Array.isArray(value) && value.length === 0) return false;
            if (typeof value === "object" && value !== null && isEmptyObject(value)) return false;
            return true;
        })
    ) as Partial<T>;
};

export function shuffleArray<T>(array: T[] | undefined): T[] {
    if (!array) {
        return []
    }
    // Створюємо копію масиву, щоб не модифікувати оригінал
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


export const sanitizeMaxInput = (value: string, max: number): number => {
    // Удаляем начальные нули, если они есть
    let sanitized = value.replace(/^0+(?=\d)/, "");

    // Если значение пустое или равно "0", заменяем его на "1"
    if (sanitized === "0") {
        sanitized = "1";
    }


    if (max < 10) {
        sanitized = sanitized[sanitized.length - 1];
    }
    return Math.min(Number(sanitized), max);
};


export const sanitizeLink = (s: string | undefined) => {
    if (!s) {
        return ''
    }

    return s.toLocaleLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

}

export const cloacingLink = (s: string | undefined): string => {
    if (typeof window === 'undefined') {
        // SSR: повертаємо статичний URL для уникнення hydration mismatch
        return `https://ingamble.com/go`
    }
    if (!s) {
        return `https://${window.location.host}`;
    }

    // Клієнт: генеруємо динамічний URL на основі назви казино
    const domen = s.toLocaleLowerCase().replace(/\s/gm, '-')
    return `https://${window.location.host}${domen && '/' + sanitizeLink(domen)}/go`;
};

export const cloacingFetch = async (link: string | undefined | null) => {
    if (!link || link === 'undefined undefined' || link === 'undefined') {
        return
    }
    try {
        $api.post('/track_link_click/', {
            link
        })
    } catch (error) {
        throw error

    }

}



export const sanitizeNumberLike = (n: number | string | undefined): string | number => {
    if (!n) {
        return '';
    }
    if (Number(n) < 1000) {
        return n;
    }
    return (Number(n) / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
};

export const saveLikesToStorage = (
    type: 'bonus_like' | 'casino_like' | 'loyalty_like',
    id: number,
    likeType: 'like' | 'dislike' | ''
): void => {
    // SSR safe check
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return;
    }
    
    try {
        const storedData = JSON.parse(localStorage.getItem('likesData') || '{}');

        // Проверка структуры данных
        if (typeof storedData !== 'object' || storedData === null) {
            localStorage.setItem('likesData', JSON.stringify({}));
            return;
        }

        // Убедимся, что секция для типа существует
        if (!storedData[type]) {
            storedData[type] = {};
        }

        // Проверка текущего состояния
        if (storedData[type][id] === likeType) {
            // Если событие совпадает, удаляем элемент
            delete storedData[type][id];
        } else if (likeType === '') {
            // Если новое событие пустое, удаляем элемент
            delete storedData[type][id];
        } else {
            // Иначе обновляем данные
            storedData[type][id] = likeType;
        }

        // Сохраняем обновленные данные
        localStorage.setItem('likesData', JSON.stringify(storedData));
    } catch {
        // Ignore storage errors
    }
};


export const getLikeByIdAndType = (type: 'bonus_like' | 'casino_like' | 'loyalty_like', id: number): 'like' | 'dislike' | null => {
    // SSR safe check
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return null;
    }
    
    const likesData = JSON.parse(localStorage.getItem('likesData') || '{}');

    // Проверяем наличие типа и ID в данных
    return likesData[type]?.[id] || null;
};




export const getTitleFilterCategories = ({
    slug,
    item,
}: {
    slug?: string;
    item?: MakeListFilterHeaderType[];
}): string => {
    if (!slug || !item || item.length !== 1) {
        return '';
    }

    const { field } = item[0];

    const categories: Record<string, string> = {
        'vpn-friendly-casinos': field === 'vpn_usage' ? 'VPN Allowed Casinos' : '',
        'unlimited-max-bet-bonuses': field === 'unlimited_bonus_max_bet' ? 'Unlimited Max Bet Bonuses' : '',
        'non-sticky-bonuses': field === 'sticky' ? "Non Sticky Bonuses" :' ',
        'newly-opened-casinos': field === 'established' ? 'Newly Opened Casinos' : ' ',
        'top-ranked-casinos': field === 'casino_rank' ? 'Top Ranked Casinos' : ' ',
    };

    return categories[slug] || '';
};

export const LengthApplyFilter = ({
    currentRouteFilter,
    casinoFilters,
    bonusFilters,
    loyaltiesFilters,
}: {
    currentRouteFilter: RouteToNextFilter
    casinoFilters: CasinoFilterBodyType
    bonusFilters: BonusFilterBodyType
    loyaltiesFilters: LoyaltiesFilterBodyType
}) => {
    if (currentRouteFilter === RouteToNextFilter.BONUS) {
        const bl = makeListFilterHeader(bonusFilters).length
        return bl ? `(${bl})` : ''
    }

    if (currentRouteFilter === RouteToNextFilter.CASINOS) {
        const cl = makeListFilterHeader(casinoFilters).length
        return cl ? `(${cl})` : ''
    }

    if (currentRouteFilter === RouteToNextFilter.LOYALTIES) {
        const ll = makeListFilterHeader(loyaltiesFilters).length
        return ll ? `(${ll})` : ''
    }

    return ''
}


interface MinimumDeposit {
    value: number;
    unlimited: boolean;
    symbol: {
        symbol: string;
        name: string;
    };
}

export interface SiblingBonuses {
    id: number;
    slug2: string;
    name: string;
    likes: number;
    bonus_image: string;
    labels: { name: string }[];
}

type BlockCountryType = {
    id: number,
    slug: string,
    name: string,
    name2: null,
    name3: null,
    flag_image: string,
    code: string,
}

export type WageringBonusPlusDepositType = {
    bonus_only: number | null,
    bonus_plus_deposit: number | null,
    deposit_only: number | null,
    winnings_only: number | null,
}

export type BonusMinDepType = {
    min_value: number;
    symbol: {
        symbol: string;
        name: string;
    };
}

export interface GetDataBonusResponse {
    id: number,
    blocked_countries: BlockCountryType[]
    bonus_blocked_countries: BlockCountryType[]
    sibling_bonuses: SiblingBonuses[]
    link_tc: string;
    casino_name: string;
    casino_logo: string;
    casino_rank: string;
    casino_affiliate_link: string;
    url_casino: string;
    casino_id: number,
    casino_slug: string,
    bonus_slug: string,
    name: string;
    likes: number;
    bonus_rank: string;
    bonus_image: string | null;
    bonus_value?: number;
    category:
    {
        id: number,
        slug: string,
        name: string
    }[]
    ,
    bonus_type: string;
    bonus_type_slug: string;
    bonus_subtype?: { name: string }[];
    labels: { name: string }[];
    bonus_amount: MinimumDeposit[];
    link?: string;
    restriction_rtp_game: number;
    max_bet_automatic?: boolean;
    game_providers: {
        name: string;
        image: string | null;
    }[];
    sticky: boolean;
    turnover_bonus?: boolean;
    buy_feature?: boolean;
    promotion_period: {
        start_date: string;
        end_date: string;
    };
    bonus_expiration: {
        days: number;
    };
    wagering_bonus_plus_deposit: WageringBonusPlusDepositType;
    bonus_only?: null;
    bonus_plus_freespins_value?: number;
    bonus_plus_deposit?: number;
    calculation_bonus_deposit?: number;
    calculation_bonus_only?: null;
    special_promo_category?: boolean;
    special_side_bar?: boolean;
    bonus_min_dep: BonusMinDepType[];
    day_of_week: { day: string }[];
    special_note?: {
        description: string;
    };
    max_bet: MinimumDeposit[];
    // restriction_country: {
    //     country: {
    //         name: string;
    //         code: string;
    //     }[];
    // };
    restriction_game: {
        game: {
            name: string;
        }[];
    };
    bonus_slot: {
        game: {
            name: string;
        }[];
    };
    wagering_contribution: {
        description: string;
        value: number;
    }[];
    slots_wagering?: {
        slot: {
            name: string;
        }[];
        value: number;
    }[];
    wagering?: {
        tbwr: string;
        tbwe: string;
        wagering_difficulty: "easy" | "medium" | "hard" | "";
    };
    wager: {
        value: number;
    };
    one_spin: {
        value: number;
    };
    free_spin_amount: {
        value: number;
    };
    bonus_max_win: {
        max_value: number;
        unlimited: boolean;
        symbol: {
            symbol: string;
            name: string;
        };
    }[];
    description: string;
}

export type GeoLocationAllowdType = {
    countryCode: string;
    countryName: string;
    isAllowed: boolean;
    isLoadedGeo: boolean;
    countryImg: string | undefined | null;
    idCountry: number | null | undefined
}


export enum BlockTypeNumber {
    BlockType1 = "type_1",
    BlockType2 = "type_2",
    BlockType3 = "type_3",
    BlockType4 = "type_4",
    BlockType5 = "type_5",
    BlockType6 = "type_6",
    BlockType6c = "type_6c",
    BlockType7 = "type_7",
    BlockType8 = "type_8",
    BlockType9 = "type_9",
    BlockType10 = "type_10",
    BlockType11 = "type_11",
    BlockType2M = "type_2m",
    BlockType3M = "type_3m",
}
export interface HomeAdditionalCasinoParams {
    [key: string]: string;
}

export interface HomeCasinoInfo {
    casino_id: number;
    casino_name: string;
    casino_rank: string;
    casino_image: string | null;
    casino_affiliate_link?: string;
    additional_casino_params: string[];
    url_casino: string;
    casino_slug: string;
}

export interface HomeBonusInfo {
    bonus_id: string;
    bonus_name: string;
    bonus_likes: number;
    bonus_image: string | null;
    labels: string[] | null;
    bonus_slug: string;
    bonus_min_dep?: BonusMinDepType[],
    wr?: number,
}

export interface HomeDataCard {
    order: number;
    big_card: boolean;
    casino_info: HomeCasinoInfo;
    bonus_info: HomeBonusInfo;
}

export interface EssentialKeypoint {
    image: string;
    text_1: string;
    text_2: string;
}

interface EssentialCard {
    stars: number[];
    card_logo: string | null;
    casino_id: number;
    keypoints: EssentialKeypoint[];
    card_number: string;
    casino_name: string;
    casino_rank: string;
    casino_slug: string;
    loyalty_rank: string;
    loyalty_likes: number;
    loyalty_count_levels: number;
    casino_affiliate_link: string;
    url_casino?: string;
    loyalty_level_description: string;
    loyalty_id?: number;
    loyalty_slug?: string;
}

export enum DataHomeItemsBlockEnumCategory {
    bonus_category = "bonus_category",
    casino_category = "casino_category",
    loyaltie_category = "loyaltie_category",
    all_category = "all"
}

export type DataHomeItemsBlockCategoryType = keyof typeof DataHomeItemsBlockEnumCategory;


export interface DataHomeItemsBlock {
    type_category: DataHomeItemsBlockCategoryType,
    category: { id: number, name: string, slug: string }
    block_title: string;
    subtitle: string | null;
    title_image: string | null;
    total_casinos_by_filter?: number,
    country_code?: string,
    country_name?: string,
    type_block: BlockTypeNumber.BlockType1 | BlockTypeNumber.BlockType2 | BlockTypeNumber.BlockType6 | BlockTypeNumber.BlockType6c | BlockTypeNumber.BlockType4 | BlockTypeNumber.BlockType7 | BlockTypeNumber.BlockType5 | BlockTypeNumber.BlockType3 | BlockTypeNumber.BlockType8 | BlockTypeNumber.BlockType3M | BlockTypeNumber.BlockType2M | BlockTypeNumber.BlockType10 | BlockTypeNumber.BlockType11;
    data_cards: (HomeDataCard)[];

}



export interface EssentialItemsBlock {
    block_title: string;
    subtitle: string | null;
    title_image: string | null;
    type_block: BlockTypeNumber.BlockType9;
    data_cards: (EssentialCard)[];
}

export interface HomeDataBlock<T = DataHomeItemsBlock | EssentialItemsBlock> {
    blocks_sequence_number: number;
    items_block: T;
}

export interface HomeDataBlockMobile {
    blocks_sequence_number: number;
    items_block: DataHomeItemsBlock
}


export type SeeAllBonusResponse = {
    type_category: string;
    category_id: number;
    category_name: string;
    bonuses: {
        count: number
        next: string
        previous: string
        results: SeeAllBonus[]
    };
};

export type SeeAllBonus = {
    bonus_id: number;
    bonus_slug: string;
    casino_slug: string;
    bonus_name: string;
    bonus_image: string;
    casino_rank: string;
    bonus_likes: number;
    labels: string[] | { name: string }[];
    casino_affiliate_link: string;
    casino_name: string;
    casino_id?: string;
    url_casino: string
};



export interface SeeAllEssentialLoyaltyKeypoint {
    image: string | null;
    text_1: string;
    text_2: string;
}

export interface SeeAllEssentialLoyaltyProgram {
    id?: number;
    loyalty_slug: string;
    count_levels?: number;
    loyalty_level_description?: string;
    loyalty_keypoint: SeeAllEssentialLoyaltyKeypoint[];
    loyalty_rank?: number;
    stars: number;
}

export interface SeeAllEssentialLoyaltyCasino {
    casino_id: number;
    casino_slug: string;
    casino_name: string;
    casino_rank: string;
    casino_image?: string;
    casino_affiliate_link: string;
    loyalty_program: SeeAllEssentialLoyaltyProgram;
    casino_likes: string | number | undefined
    url_casino?: string
}

export interface SeeAllEssentialCasinoResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: SeeAllEssentialLoyaltyCasino[];
}

export interface SeeAllCasinosLoyaltyKeyPoint extends SeeAllEssentialLoyaltyKeypoint { }

export interface SeeAllCasinosLoyaltyProgram {
    id: number
    loyalty_keypoint: SeeAllCasinosLoyaltyKeyPoint[];
}

export enum PAYOUTSPEED {
    Medium = "Medium",
    High = "High",
    Low = "Low"
}

interface WithdrawalLimit {
    daily: number | null;
    weekly: number | null;
    monthly: number | null;
}


export interface SeeAllCasinosType {
    casino_id: number;
    casino_slug: string;
    casino_name: string;
    casino_rank: string;
    bonuses: { bonus_id: number, labels: { name: string }[] }[],

    likes: number;
    vpn_usage: boolean;
    casino_image: string;
    casino_affiliate_link: string;
    url_casino?: string;
    additional_casino_params: string[];
    min_dep: MinimumDeposit[];
    licenses: {
        name: string;
        image: string | null;
        country_code: string;
    }[];

    payout_speed: PAYOUTSPEED;
    withdrawal_limit: WithdrawalLimit;
    loyalty_program: SeeAllCasinosLoyaltyProgram;
}


export interface SeeAllCasinosCategoryResponse {
    type_category: string;
    category_id: number;
    category_name: string;
    casino: {
        count: number
        next: string
        previous: string
        results: SeeAllCasinosType[]
    };
}



export type AllCategoriesHomeBonusCategory = {
    id: number;
    name: string;
    slug: string
};

export type AllCategoriesHomeCasinoCategory = {
    id: number;
    name: string;
    slug: string
};

export type AllCategoriesHomeDataResponse = {
    bonus_categories: AllCategoriesHomeBonusCategory[];
    casino_categories: AllCategoriesHomeCasinoCategory[];
};

export type GeneralFilterDataType = {
    countries: {
        id: number;
        name: string;
        name2: string | null;
        code: string;
        allowed_casinos_count?: number | null;
        flag_image: string | null;
        emoji_flag: string;
    }[];
    game_providers: {
        id: number;
        name: string;
        image: string | null;
    }[];
    games: {
        id: number;
        name: string;
    }[];
}

export type CasinoFilterDataType = {
    max_min_deposit_value: number;
    max_min_wagering_value: number;
    live_chat_competence: {
        value: string;
        label: string;
    }[];
    responsible_gambling: {
        value: string;
        label: string;
    }[];
    licenses: {
        id: number;
        name: string;
        image: string | null;
    }[];
    game_types: {
        id: number;
        name: string;
        image: string | null;
    }[];
    payment_methods: {
        id: number;
        name: string;
        image: string | null;
    }[];
    classic_currency: {
        id: number;
        symbol: string;
        name: string;
        name2: string | null;
    }[];
    crypto_currencies: {
        id: number;
        symbol: string;
        name: string;
        name2: string | null;
        flag_image: string | null;
    }[];
    payout_speed: {
        id: number;
        name: string;
    }[];
    language: {
        id: number;
        name: string;
        image: string | null;
    }[];
    casino_owner: string[]
};

export type BonusFilterDataType = {
    bonus_type: { id: number, name: string }[];
    daily_availability: { id: number, day: string }[];
    max_bonus_amount_value: number
    max_bonus_max_win_value: number
    max_free_spin_amount_value: number
};

export type GetFilterDataTypeResponse = {
    general: GeneralFilterDataType;
    casino: CasinoFilterDataType;
    bonus: BonusFilterDataType;
};


export type FilterCasinoPostResponse = {
    count: number,
    next: string | null
    previous: string | null
    results: SeeAllCasinosType[]
    total_pages: number
}

export interface CasinoFilterBodyType {
    payout_speed: number[];
    casino_rank: { min: number; max: number } | null;
    casino_likes: { min: number; max: number } | null;
    sportsbook: boolean | undefined;
    tournaments: boolean | undefined;
    vpn_usage: boolean | undefined;
    bonus_hunt_with_active_bonus: boolean | undefined;
    social_bonus: boolean | undefined;
    established: { min: number; max: number } | null;
    casino_owner: string[];
    withdrawal_limits: {
        daily: number | null;
        weekly: number | null;
        monthly: number | null;
        unlimited: boolean | undefined
    };
    min_wager: number | null;
    min_deposit: number | null;
    selected_countries: number[];
    accepted_currencies: number[];
    payment_methods: number[];
    language_live_chat: number[];
    language_website: number[];
    game_providers: number[];
    game_types: number[];
    licenses: number[];
    games: number[];
    live_chat_competence: string[];
    responsible_gambling: [],
    unlimited_min_wager: boolean | undefined,
    unlimited_min_deposit: boolean | undefined,
    casino_name: string | undefined,
};


export type BonusFilterBodyType = {
    bonus_rank: { min: number; max: number } | null;
    bonus_likes: { min: number; max: number } | null;
    bonus_min_dep: { min: number; max: number } | null;
    bonus_max_bet: { min: number; max: number } | null;
    free_spin_amount: { min: number; max: number } | null;
    bonus_value: { min: number; max: number } | null;
    bonus_amount: { min: number; max: number } | null;
    bonus_max_win: { min: number; max: number } | null;
    bonus_type: number[];
    daily_availability: number[];
    wagering_difficulty: ("easy" | "medium" | "hard")[];
    selected_countries: number[];
    selected_games: number[];
    selected_providers: number[];
    sticky: boolean | undefined;

    bonus_plus_deposit: number | null,
    bonus_only: number | null,
    deposit_only: number | null,
    winnings_only: number | null,


    unlimited_bonus_max_bet: boolean | undefined,
    unlimited_bonus_amount: boolean | undefined,
    unlimited_bonus_max_win: boolean | undefined,
};


export type FilterBonusPostResponse = {
    count: number,
    next: string | null
    previous: string | null
    results: SeeAllBonus[]
    total_pages: number
}


export type LoyaltiesFilterBodyType = {
    loyalty_rank: { min: number; max: number } | null;
    loyalty_level_count: { min: number; max: number } | null;
    vip_manager: boolean | undefined,
    level_up_bonus: boolean | undefined,
    withdrawals: boolean | undefined,
    special_prizes: boolean | undefined,
    gifts: boolean | undefined,
    bonuses: boolean | undefined,

};


export type FilterLoyaltiesPostResponse = {
    count: number,
    next: string | null
    previous: string | null
    results: SeeAllEssentialLoyaltyCasino[]
    total_pages: number
}



export interface RewievCasinoDataResponse {
    id: number;
    casino_affiliate_link: string
    casino_slug: string;
    link_tc: null | string;
    loyaltie_id: number | string;
    loyalty_slug?: string;
    loyalty_program: {
        loyalty_keypoint: SeeAllEssentialLoyaltyKeypoint[];
    };
    bonuses: Array<{
        id: number;
        slug: string;
        name: string;
        labels: Array<{ name: string }>;
        bonus_type: { name: string };
        bonus_slug?: string;
        bonus_subtype: Array<{ name: string }>;
        special_promo_category: boolean;
        special_side_bar: boolean;
        bonus_image: string | null;
    }>;
    withdrawal_limit: {
        daily: number;
        weekly: number;
        monthly: number;
        unlimited: boolean;
    };
    min_wagering: {
        min_value: number;
    };
    min_dep: Array<{
        min_value: number;
        symbol: {
            symbol: string;
            name: string;
        };
    }>;
    images: string[];
    social_bonuses: {
        choice: boolean;
    };
    casino_category: string[];
    payment_methods: Array<{
        id: number;
        name: string;
        image: null | string;
    }>;
    crypto_currencies: Array<{
        id: number;
        symbol: string;
        name: string;
        name2: null | string;
    }>;
    classic_currency: Array<{
        id: number;
        symbol: string;
        name: string;
        name2: null | string;
    }>;
    games: string[];
    game_providers: Array<{
        id: number;
        name: string;
        image: null | string;
    }>;
    game_types: Array<{
        id: number;
        slug: string;
        name: string;
        image: null | string;
    }>;
    licenses: Array<{
        country_code: string;
        id: number;
        slug: string;
        image: null | string;
        name: string;
        validator_url: null | string;
    }>;

    language_live_chat: Array<{
        id: number;
        slug: string;
        name: string;
        image: null | string;
    }>;
    language_website: Array<{
        id: number;
        slug: string;
        name: string;
        image: null | string;
    }>;
    sisters_casinos: Array<{
        id: number;
        name: string;
    }>;
    payout_speed: string;
    do_not_send_to_client: boolean;
    rating_level: string;
    stars: number;
    review: string;
    what_we_dont_like: string;
    what_we_like: string;
    image: string;
    image_loyalty: string;
    slug: string;
    name: string;
    casino_rank: string;
    likes: number;
    vpn_usage: boolean;
    sportsbook: boolean;
    url: string;
    owner: string;
    established: number;
    wager_limit: boolean;
    loss_limit: boolean;
    session_limit: boolean;
    self_exclusion: boolean;
    cool_off: boolean;
    reality_check: boolean;
    self_assessment: boolean;
    withdrawal_lock: boolean;
    deposit_limit: boolean;
    gamstop_self_exclusion: boolean;
    bonus_hunt_with_active_bonus: boolean;
    tournaments: boolean;
    special_notes: string;
    live_chat_competence: string;
    additional_casino_params: number[];
    blocked_countries: BlockCountryType[]

}



export interface LoyaltieProgramDataResponse {
    id: number;
    casino_name: string;
    casino_image: string;
    casino_id: number;
    casino_slug: string;
    link_tc: string | null;
    casino_affiliate_link: string;
    loyalty_keypoint: SeeAllEssentialLoyaltyKeypoint[];
    loyalty_parameter: { text_1: string, text_2: string }[];
    sibling_bonuses: SiblingBonuses[],
    casino_rank: string,
    level_loyalty: Array<{
        level: string;
        vip_manager_access: boolean;
        special_notes: string;
        point_accumulation: {
            point: number;
            value: number | null;
            next_lvl: number | null;
            level_value: number | null;
        } | null;
        cashback: {
            cashback_period: string
            cashback_type: "Cashback"
            percentage: number
            wager: number

        } | null;
        level_up_bonus: {
            bonus: string;
            wager: number | null;
            freespins: number | null;
        } | null;
        withdrawals: {
            faster_withdrawal: string | null;
            withdrawal_limits: string | null;

        }
        special_prize: {
            free_bet: string | null;
            freespins: string | null;
            other: string | null;
        }

        gifts: {
            birthday: string | null;
            exclusive: string | null;
            holiday: string | null;
            offline: string | null;
            personalized: string | null;
        }
        loyalty_level_bonuses: {
            customized?: string
            monthly?: string
            real_money?: string
            weekly?: string
        } | null;
        images: Array<{
            image: string;
        }>;
    }>;
    count_levels?: number;
    level_description: string;
    do_not_send_to_client: boolean;
    likes: number;
    stars: number;
    link: string;
    loyalty_understandable: string;
    description: string;
    vip_manager: string;
    url_casino?: string;
    loyalty_rank: string;
    casino: number;
    blocked_countries: BlockCountryType[]
}


export interface СasinosInRankRangeResponse {
    casino_affiliate_link: string;
    casino_slug: string;
    casino_rank: string;
    id: number;
    image: string;
    labels: string[];
    likes: number;
    name: string;
    additional_casino_params: string[];
}

export interface BonusInRankRangeResponse {
    bonus_id: number;
    bonus_slug: string;
    bonus_name: string;
    bonus_image: string;
    bonus_type: { name: string } | null;
    casino_id: number;
    casino_slug: string;
    casino_name: string;
    casino_rank: string;
    bonus_rank: string;
    bonus_likes: number;
    labels: { name: string }[];
    casino_affiliate_link: string;
    url_casino: string;
}

export interface LoyaltyInRankRangeResponse {
    loyalty_id: number;
    loyalty_slug: string;
    loyalty_rank: string;
    loyalty_likes: number;
    loyalty_count_levels: number;
    keypoints: EssentialKeypoint[];
    loyalty_level_description: string | null;
    card_logo: string | null;
    stars: number[];
    casino_id: number;
    casino_slug: string;
    casino_name: string;
    casino_rank: string;
    casino_affiliate_link: string;
    url_casino: string;
}


export type LikeFieldType = 'bonus_like' | 'casino_like' | 'loyalty_like'

export interface FooCategorySanitazeLinkPropType {
    type_category: DataHomeItemsBlockCategoryType
    slug: string
}


export interface FooCategorySanitazeLinkReturnType {
    seeAllLink: string
    seeAllFoo?: () => void
}

export type FormatedCategoryType = {  name: string; categoryType: DataHomeItemsBlockCategoryType; slug: string; callback?: () => void }


export interface NAMETITLECATEGORYSLUGType {
    [key: string]: {
        key: string
        value: boolean | { min: number; max: number }
    }
}
import '../../../styles/style.css'

// import { useAdaptiveBehavior } from '../../context/AppContext'
import { Categories } from '@/components/categories/Categories'

//@ts-ignore

import $api from '@/http'

import {
    DataHomeItemsBlockCategoryType,
    DataHomeItemsBlockEnumCategory,
    HomeDataBlock,
    BlockTypeNumber,
    HomeDataBlockMobile,
} from '@/types'
import { BlockFooter } from '@/components/home/BlockFooter'
import BlockMType2M from '@/components/home/BlockMType2M'
import BlockMType3M from '@/components/home/BlockMType3M'
import BlockType1 from '@/components/home/BlockType1'
import BlockType10 from '@/components/home/BlockType10'
import BlockType10Mobile from '@/components/home/BlockType10Mobile'
import BlockType11 from '@/components/home/BlockType11'
import BlockType2 from '@/components/home/BlockType2'
import BlockType2Mobile from '@/components/home/BlockType2Mobile'
import BlockType3 from '@/components/home/BlockType3'
import BlockType3Mobile from '@/components/home/BlockType3Mobile'
import BlockType4 from '@/components/home/BlockType4'
import BlockType4Mobile from '@/components/home/BlockType4Mobile'
import BlockType5 from '@/components/home/BlockType5'
import BlockType5Mobile from '@/components/home/BlockType5Mobile'
import BlockType6 from '@/components/home/BlockType6'
import BlockType7 from '@/components/home/BlockType7'
import BlockType7Mobile from '@/components/home/BlockType7Mobile'
import BlockType9 from '@/components/home/BlockType9'

export type LazyImgHomeType = 'lazy' | 'eager' | undefined

const categoriesTypeBySrc = (
    src: string,
): {
    type_category: DataHomeItemsBlockCategoryType
    blocks_sequence_number: number
} => {
    switch (src) {
        case 'get-data-hub-page-casino/':
            return {
                type_category: DataHomeItemsBlockEnumCategory.casino_category as DataHomeItemsBlockCategoryType,
                blocks_sequence_number: 3.5,
            }
        case 'get-data-hub-page-bonus/':
            return {
                type_category: DataHomeItemsBlockEnumCategory.bonus_category as DataHomeItemsBlockCategoryType,
                blocks_sequence_number: 2.5,
            }
        default:
            return {
                type_category: DataHomeItemsBlockEnumCategory.all_category as DataHomeItemsBlockCategoryType,
                blocks_sequence_number: 7.5,
            }
    }
}

const getHomeDataFetch = async (src: string) => {
    const response = await $api.get(src)
    const headers = response.headers

    return {
        dataHome: response?.data?.data_blocks,
        dataHomeMobile: response?.data?.data_blocks_m,
        headers,
    }
}

const getBlockByCountry = async (): Promise<HomeDataBlock> => {
    let response = await $api.get('get-block-by-country/')

    return response.data
}

const renderBlock = (block: any, index: number) => {
    const isAutoPlay = !index

    switch (block?.items_block?.type_block) {
        case BlockTypeNumber.BlockType1:
            return <BlockType1 data={block} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType9:
            return <BlockType9 data={block} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType2M:
            return <BlockMType2M data={block} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType3M:
            return <BlockMType3M data={block} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType6:
            return <BlockType6 data={block} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType6c:
            return <BlockType6 data={block} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType8:
            return <BlockType1 data={block} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType2:
            return (
                <>
                    <BlockType2Mobile data={block} isAutoPlay={isAutoPlay} />
                    <BlockType2 data={block} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType3:
            return (
                <>
                    <BlockType3Mobile data={block} isAutoPlay={isAutoPlay} />
                    <BlockType3 data={block} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType4:
            return (
                <>
                    <BlockType4Mobile data={block} isAutoPlay={isAutoPlay} />
                    <BlockType4 data={block} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType7:
            return (
                <>
                    <BlockType7Mobile data={block} isAutoPlay={isAutoPlay} />
                    <BlockType7 data={block} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType5:
            return (
                <>
                    <BlockType5Mobile data={block} isAutoPlay={isAutoPlay} />
                    <BlockType5 data={block} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType10:
            return (
                <>
                    <BlockType10Mobile data={block} isAutoPlay={isAutoPlay} />
                    <BlockType10 data={block} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType11:
            return <BlockType11 data={block} />
        default:
            return <BlockFooter />
    }
}

export default async function Bonuses() {

    const src = 'get-data-hub-page-bonus/'

    const data: { dataHome: HomeDataBlock[]; dataHomeMobile: HomeDataBlockMobile[]; headers: any } = await getHomeDataFetch(src)

    let blockByCountry: HomeDataBlock = await getBlockByCountry()

    const { blocks_sequence_number } = categoriesTypeBySrc(src)
    if (blockByCountry) {
        blockByCountry = {
            ...blockByCountry,
            blocks_sequence_number: blocks_sequence_number,
        }
    }

    const blocksToRender = [...(data?.dataHome || []), blockByCountry, { blocks_sequence_number: Number(data?.dataHome?.length) + 10 }]
        .filter(Boolean)
        .sort((a, b) => (a?.blocks_sequence_number || 0) - (b?.blocks_sequence_number || 0))

    return (
        <main className="gamble__main main-gamble">
            <div className="main-gamble__body">
                {/* <Categories type_category={categoriesTypeBySrc(src).type_category} /> */}
                {blocksToRender.map((block, index) => (
                    <div key={index}>{renderBlock(block, index)}</div>
                ))}
            </div>
        </main>
    )
}

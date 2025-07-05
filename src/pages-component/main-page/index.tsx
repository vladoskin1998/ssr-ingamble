import '../../../styles/style.css'
import { Suspense } from 'react'
import $api from '@/http'
import { headers } from 'next/headers'
import {
    DataHomeItemsBlockCategoryType,
    DataHomeItemsBlockEnumCategory,
    HomeDataBlock,
    BlockTypeNumber,
    DataHomeItemsBlock,
    EssentialItemsBlock,
} from '@/types'

import { Categories } from '@/components/categories/Categories'
import BlockFooterWrapper from '@/components/client-wrappers/BlockFooterWrapper'
import BlockMType2M from './BlockMType2M'
import BlockMType3M from './BlockMType3M'
import BlockType1 from './BlockType1'
import BlockType10 from './BlockType10'
import BlockType10Mobile from './BlockType10Mobile'
import BlockType11 from './BlockType11'
import BlockType2 from './BlockType2'
import BlockType2Mobile from './BlockType2Mobile'
import BlockType3 from './BlockType3'
import BlockType3Mobile from './BlockType3Mobile'
import BlockType4 from './BlockType4'
import BlockType4Mobile from './BlockType4Mobile'
import BlockType5 from './BlockType5'
import BlockType5Mobile from './BlockType5Mobile'
import BlockType6 from './BlockType6'
import BlockType7 from './BlockType7'
import BlockType7Mobile from './BlockType7Mobile'
import BlockType9 from './BlockType9'


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
    try {
        const response = await $api.get(src)
        
        return {
            dataHome: response.data?.data_blocks || [],
            dataHomeMobile: response.data?.data_blocks_m || [],
            headers: response.headers,
        }
    } catch {
        return {
            dataHome: [],
            dataHomeMobile: [],
            headers: {},
        }
    }
}


const getBlockByCountry = async (): Promise<HomeDataBlock | null> => {
    try {
        const response = await $api.get('get-block-by-country/')
        return response.data
    } catch {
        return null
    }
}

const renderBlock = (block: HomeDataBlock<DataHomeItemsBlock | EssentialItemsBlock>, index: number, src: string) => {
    const isAutoPlay = !index

    switch (block?.items_block?.type_block) {
        case BlockTypeNumber.BlockType1:
            return <BlockType1 data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType9:
            return <BlockType9 data={block as HomeDataBlock<EssentialItemsBlock>} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType2M:
            return <BlockMType2M data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType3M:
            return <BlockMType3M data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType6:
            return <BlockType6 data={block as HomeDataBlock<DataHomeItemsBlock>} src={src} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType6c:
            return <BlockType6 data={block as HomeDataBlock<DataHomeItemsBlock>} src={src} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType8:
            return <BlockType1 data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
        case BlockTypeNumber.BlockType2:
            return (
                <>
                    <BlockType2Mobile data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                    <BlockType2 data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType3:
            return (
                <>
                    <BlockType3Mobile data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                    <BlockType3 data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType4:
            return (
                <>
                    <BlockType4Mobile data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                    <BlockType4 data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType7:
            return (
                <>
                    <BlockType7Mobile data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                    <BlockType7 data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType5:
            return (
                <>
                    <BlockType5Mobile data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                    <BlockType5 data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType10:
            return (
                <>
                    <BlockType10Mobile data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                    <BlockType10 data={block as HomeDataBlock<DataHomeItemsBlock>} isAutoPlay={isAutoPlay} />
                </>
            )
        case BlockTypeNumber.BlockType11:
            return <BlockType11 data={block as HomeDataBlock<DataHomeItemsBlock>} />
        default:
            return (
                <div style={{ padding: '20px', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px', margin: '10px 0' }}>
                    <h3>Невідомий тип блоку</h3>
                    <p>Блок #{index + 1} не може бути відображений</p>
                </div>
            )
    }
}

export default async function MainPage({ src }: { src: string }) {
    try {
        const userAgent = (await headers()).get('user-agent') || ''
        const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent)

        // Load data from API
        const data = await getHomeDataFetch(src)
        let blockByCountry: HomeDataBlock | null = await getBlockByCountry()

        const { blocks_sequence_number } = categoriesTypeBySrc(src)
        if (blockByCountry) {
            blockByCountry = {
                ...blockByCountry,
                blocks_sequence_number: blocks_sequence_number,
            }
        }

        const blocksToRender = [
            ...(isMobile ? data.dataHomeMobile : data?.dataHome || []),
            ...(blockByCountry ? [blockByCountry] : []),
            {
                blocks_sequence_number: Number(data?.dataHome?.length) + 10,
                items_block: {} as DataHomeItemsBlock,
            },
        ]
            .filter(Boolean)
            .sort((a, b) => (a?.blocks_sequence_number || 0) - (b?.blocks_sequence_number || 0))

        return (
            <main className="gamble__main main-gamble">
                <div className="main-gamble__body">
                    <Categories type_category={categoriesTypeBySrc(src).type_category} />
                    {blocksToRender.map((block, index) => (
                        <div key={`block-${block?.blocks_sequence_number || index}`}>
                            {renderBlock(block, index, src)}
                        </div>
                    ))}
                    <Suspense>
                        <BlockFooterWrapper />
                    </Suspense>
                </div>
            </main>
        )
    } catch {
        return (
            <main className="gamble__main main-gamble">
                <div className="main-gamble__body">
                    <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '8px', margin: '20px' }}>
                        <h2>Помилка завантаження сторінки</h2>
                        <p>Виникла помилка при завантаженні даних. Спробуйте оновити сторінку.</p>
                    </div>
                </div>
            </main>
        )
    }
}

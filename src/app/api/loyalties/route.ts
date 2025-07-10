import { NextResponse } from 'next/server';
import $api from '@/http';
import { filterEmptyValues } from '@/helper';
import { NAMETITLECATEGORYSLUGType } from '@/types';

const NAMETITLECATEGORYSLUG: NAMETITLECATEGORYSLUGType = {
    'loyalty-rank': { key: 'loyalty_rank', value: { min: 8, max: 10 } },
    'vip-manager': { key: 'vip_manager', value: true },
    'level-up-bonus': { key: 'level_up_bonus', value: true },
    withdrawals: { key: 'withdrawals', value: true },
    'special-prizes': { key: 'special_prizes', value: true },
    gifts: { key: 'gifts', value: true },
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const slug = searchParams.get('slug');
    
    try {
        const pageData = await getLoyaltiesPageData({
            page: Number(page),
            slug: slug || undefined,
        });
        
        return NextResponse.json(pageData);
    } catch (error) {
        console.error('Error fetching loyalties data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}

// Функція для отримання даних сторінки з вашого API
async function getLoyaltiesPageData({ page, slug }: { page: number; slug?: string }) {
    let payload = {};
    
    if (slug && NAMETITLECATEGORYSLUG[slug]) {
        payload = {
            [NAMETITLECATEGORYSLUG[slug].key]: NAMETITLECATEGORYSLUG[slug].value,
        };
    }
    
    const body = filterEmptyValues(payload);
    
    try {
        const response = await $api.post(`filter/loyalty/?page=${page}&page_size=10`, body);
        const data = response.data;
        
        // Make sure we're returning both count and calculated total_pages
        return {
            ...data,
            total_pages: Math.ceil(data.count / 10) // Calculate total_pages if not provided by API
        };
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to fetch loyalty data from API');
    }
}

import $api from '@/http'

export default async function ApiTest() {
    let homeApiStatus = 'Не перевірено'
    let bonusApiStatus = 'Не перевірено'
    let homeData: any = null
    let bonusData: any = null

    // Тест home API
    try {
        const response = await $api.get('get-data-home-page/')
        homeData = response.data
        homeApiStatus = `✅ Працює (${homeData?.data_blocks?.length || 0} блоків)`
    } catch (error) {
        homeApiStatus = `❌ Помилка: ${error instanceof Error ? error.message : 'Невідома помилка'}`
    }

    // Тест bonus API
    try {
        const response = await $api.get('get-data-hub-page-bonus/')
        bonusData = response.data
        bonusApiStatus = `✅ Працює (${bonusData?.data_blocks?.length || 0} блоків)`
    } catch (error) {
        bonusApiStatus = `❌ Помилка: ${error instanceof Error ? error.message : 'Невідома помилка'}`
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>API Test Results</h1>
            
            <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h2>API Endpoints Status</h2>
                <p><strong>Home API:</strong> {homeApiStatus}</p>
                <p><strong>Bonus API:</strong> {bonusApiStatus}</p>
            </div>

            {homeData && (
                <div style={{ marginBottom: '20px' }}>
                    <h3>Home Data Sample</h3>
                    <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '5px' }}>
                        <p>Blocks count: {homeData.data_blocks?.length || 0}</p>
                        <p>Mobile blocks count: {homeData.data_blocks_m?.length || 0}</p>
                        {homeData.data_blocks?.[0] && (
                            <details>
                                <summary>First block details</summary>
                                <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '200px' }}>
                                    {JSON.stringify(homeData.data_blocks[0], null, 2)}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            )}

            {bonusData && (
                <div style={{ marginBottom: '20px' }}>
                    <h3>Bonus Data Sample</h3>
                    <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '5px' }}>
                        <p>Blocks count: {bonusData.data_blocks?.length || 0}</p>
                        <p>Mobile blocks count: {bonusData.data_blocks_m?.length || 0}</p>
                        {bonusData.data_blocks?.[0] && (
                            <details>
                                <summary>First block details</summary>
                                <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '200px' }}>
                                    {JSON.stringify(bonusData.data_blocks[0], null, 2)}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

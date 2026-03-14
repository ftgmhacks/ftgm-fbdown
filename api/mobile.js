export default async function handler(req, res) {
    // 1. Set CORS headers to allow ALL origins and methods
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows anyone to call
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle Vercel's preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Extract the query from the URL (e.g., api/mobile?q=iphone)
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({
            error: "Missing query parameter 'q'",
            credits: {
                whatsapp: "https://wa.me/923104882921",
                website: "https://ftgmtools.pages.dev"
            }
        });
    }

    try {
        // 3. Fetch data from the source API
        const response = await fetch(`https://api.siputzx.my.id/api/s/gsmarena?query=${encodeURIComponent(q)}`);
        const data = await response.json();

        // 4. Return the data with your credits
        res.status(200).json({
            status: true,
            developer_credits: {
                whatsapp: "https://wa.me/your-number-here",
                website: "https://ftgmtools.pages.dev"
            },
            results: data
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data", message: error.message });
    }
}

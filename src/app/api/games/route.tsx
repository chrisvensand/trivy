import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server'; 


export async function GET(req: NextRequest, res: NextResponse) {
    // Get the query parameters
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '400', 10);
    const search = searchParams.get('search');
    const category = searchParams.get('category'); // Get the category query parameter
    const games = await fetchGamesFromDatabase(page, pageSize, search, category);

    return NextResponse.json(
        { body: games },
        { status: 200}
    );
}

async function fetchGamesFromDatabase(page: number, pageSize: number, search: string | null, category: string | null) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri || '');

    try {
        await client.connect();

        const collection = client.db('triviaGames').collection('games');

        // Calculate the number of items to skip
        const skip = (page - 1) * pageSize;

        // Build the query and sort options based on the type
        let query = {};

        if (search) {
            query = { ...query, title: { $regex: new RegExp(search, 'i') } };
        }

        if (category) {
            query = { ...query, category: category };
        }

        // Fetch the games
        const games = await collection.find(
            query, { projection: { category: 1, title: 1, slug: 1 } }
        ).sort({ plays: -1, _id: 1 }).skip(skip).limit(pageSize).toArray();

        return games;
    } finally {
        await client.close();
    }
}
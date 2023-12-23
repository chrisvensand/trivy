import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server'; 


export async function GET(req: NextRequest, res: NextResponse) {
    // Get the query parameters
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    // Validate the parameters
    if (!type) {
        return NextResponse.json(
            { error: 'Missing required parameter: type' },
            { status: 400 }
        );
    }

    if (type !== 'new' && type !== 'popular') {
        return NextResponse.json(
            { error: 'Invalid type parameter. Must be "new" or "popular".' },
            { status: 400 }
        );
    }

    const games = await fetchGamesFromDatabase(type, page, pageSize);

    return NextResponse.json(
        { body: games },
        { status: 200}
    );
}

async function fetchGamesFromDatabase(type: string | string[], page: number, pageSize: number) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri || '');

    try {
        await client.connect();

        const collection = client.db('triviaGames').collection('games');

        // Calculate the number of items to skip
        const skip = (page - 1) * pageSize;

        // Build the query and sort options based on the type
        let query = {};
        let sort = {};
        if (type === 'new') {
            sort = { createdAt: -1 }; // sort by createdAt in descending order for new games
        } else if (type === 'popular') {
            sort = { plays: -1 }; // sort by plays in descending order for popular games
        }

        // Fetch the games
        const games = await collection.find(
            query, { projection: { topic: 1, slug: 1, createdBy: 1 } }
        ).sort(sort).skip(skip).limit(pageSize).toArray();

        return games;
    } finally {
        await client.close();
    }
}
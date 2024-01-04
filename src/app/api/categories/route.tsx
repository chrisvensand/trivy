import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server'; 

export async function GET(req: NextRequest) {
    const categories = await fetchCategoriesFromDatabase();

    return NextResponse.json(
        { body: categories },
        { status: 200}
    );
}

async function fetchCategoriesFromDatabase() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri || '');

    try {
        await client.connect();

        const collection = client.db('triviaGames').collection('games');

        // Fetch the categories
        const categories = await collection.distinct('category');

        return categories;
    } finally {
        await client.close();
    }
}
import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server'; 


export async function GET(req: NextRequest, res: NextResponse) {
    // Get the query parameters
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    const numQuestions = parseInt(searchParams.get('numQuestions') || '10');

    // Validate the parameters
    if (!slug) {
        return NextResponse.json(
            { error: 'Missing required parameter: slug' },
            { status: 400 }
        );
    }

    const game = await fetchGameFromDatabase(slug, numQuestions);

    return NextResponse.json(
        { body: game },
        { status: 200}
    );
}

async function fetchGameFromDatabase(slug: string, numQuestions: number) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri || '');

    try {
        await client.connect();

        const collection = client.db('triviaGames').collection('games');

        // Find the game with the given slug
        const game = await collection.findOne({ slug });

        // Increment the plays value
        await collection.updateOne({ slug }, { $inc: { plays: 1 } });

        // Shuffle and limit the number of questions if numQuestions is greater than 0
        if (numQuestions > 0 && game && game.questions) {
            game.questions = shuffleArray(game.questions).slice(0, numQuestions);
        }

        return game;
    } finally {
        await client.close();
    }
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
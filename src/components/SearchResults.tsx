import Link from 'next/link';

interface GameInfo {
    _id: string;
    category: string;
    title: string;
    slug: string;
}

interface SearchResultsProps {
    games: GameInfo[];
    mouseDownOnResult: React.MutableRefObject<boolean>;
}

const categoryColors: { [key: string]: string } = {
    'General Knowledge': 'bg-blue-500',
    'History': 'bg-red-500',
    'Science & Nature': 'bg-green-500',
    'Geography': 'bg-yellow-500',
    'Music': 'bg-indigo-500',
    'Movies': 'bg-purple-500',
    'Literature': 'bg-pink-500',
    'Sports': 'bg-blue-400',
    'Television': 'bg-red-400',
    'Art & Culture': 'bg-green-400',
    'Food & Drink': 'bg-yellow-400',
    'Technology & Innovation': 'bg-indigo-400',
    'Pop Culture': 'bg-purple-400',
    'Animals & Wildlife': 'bg-pink-400',
    'Mythology & Folklore': 'bg-blue-300',
    'Politics & Government': 'bg-red-300',
    'Mathematics & Numbers': 'bg-green-300',
    'Fashion & Design': 'bg-yellow-300',
    'Languages & Linguistics': 'bg-indigo-300',
    'Astronomy & Space': 'bg-purple-300',
};

export default function SearchResults({ games, mouseDownOnResult }: SearchResultsProps) {
    return (
        <div className="bg-white border border-gray-300 rounded shadow-md mt-2 overflow-y-auto max-h-60 absolute w-full z-10">
            {games.map(game => (
                <Link key={game._id} href={`/games/${game.slug}`}>
                    <div 
                        onMouseDown={() => mouseDownOnResult.current = true}
                        className="block w-full text-left p-2 hover:bg-gray-200 cursor-pointer dark:text-black flex justify-between items-center"
                    >
                        <span>{game.title}</span>
                        <div className={`text-white px-2 py-1 rounded ${categoryColors[game.category] || 'bg-gray-500'}`}>
                            {game.category}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
import Link from 'next/link';

export default function SearchResults({ games, mouseDownOnResult }: { games: string[], mouseDownOnResult: React.MutableRefObject<boolean> }) {
    return (
        <div className="bg-white border border-gray-300 rounded shadow-md mt-2 overflow-y-auto max-h-60 absolute w-full z-10">
            {games.map(game => (
                <Link key={game} href={`/game/${game}`}>
                    <div 
                        onMouseDown={() => mouseDownOnResult.current = true}
                        className="block w-full text-left p-2 hover:bg-gray-200 cursor-pointer dark:text-black"
                    >
                        {game}
                    </div>
                </Link>
            ))}
        </div>
    );
}
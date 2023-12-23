'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function GameGrid() {
    console.log('ClientComponent is being rendered');
    const [games, setGames] = useState([]);
    const hasMounted = useRef(false);

    const fetchPopularGames = async () => {
        const response = await fetch(`/api/games?type=popular&pageSize=20`);
        const data = await response.json();
        setGames(oldGames => [...oldGames, ...data.body]);
    };

    useEffect(() => {
        // Only fetch games if the component has mounted
        if (hasMounted.current) {
            fetchPopularGames();
        } else {
            hasMounted.current = true;
        }
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-4 gap-8 pt-8">
                {games.map(game => (
                    <Link href={`/games/${game.slug}`} key={game.slug} passHref>
                        <button 
                            className="p-8 text-lg shadow-md rounded transition duration-300 ease-in-out w-full h-full"
                        >
                            {game.topic}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}
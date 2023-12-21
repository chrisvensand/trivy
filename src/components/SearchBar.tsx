'use client';

const games = ['Harry Potter', 'NBA', 'Politics', 'France Trivia', 'Soccer', 'Hardcore Music', 'Cats'];

import { useState, useEffect, useRef } from 'react';
import SearchResults from './SearchResults';

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [filteredGames, setFilteredGames] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const mouseDownOnResult = useRef(false);

    useEffect(() => {
        setFilteredGames(
            games.filter(game =>
                game.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search]);

    return (
        <div className="flex justify-center w-1/2">
            <div className="relative w-3/4">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        if (!mouseDownOnResult.current) {
                            setIsFocused(false);
                        }
                        mouseDownOnResult.current = false;
                    }}
                    placeholder="Search Trivy"
                    className="px-3 py-2 w-full text-black bg-white border-2 border-gray-500 rounded"
                />
                {isFocused && <SearchResults games={filteredGames} mouseDownOnResult={mouseDownOnResult} />}
            </div>
        </div>
    );
}
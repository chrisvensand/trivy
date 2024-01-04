'use client';

import { useState, useEffect, useRef } from 'react';
import SearchResults from './SearchResults';

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [games, setGames] = useState<any[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 50;
    const mouseDownOnResult = useRef(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            const res = await fetch(`/api/games?search=${encodeURIComponent(search)}&page=${page}&pageSize=${pageSize}`);
            if (!res.ok) {
                console.error('Failed to fetch games:', res.status, res.statusText);
                setLoading(false);
                return;
            }
            const data = await res.json();
            if (!Array.isArray(data.body)) {
                console.error('Invalid data from API:', data);
                setLoading(false);
                return;
            }
            setGames(prevGames => page === 1 ? data.body : [...prevGames, ...data.body]);
            setLoading(false);
        };
        fetchGames();
    }, [search, page]);

    useEffect(() => {
        setPage(1);
    }, [search]);
    
    useEffect(() => {
        const handleScroll = () => {
            if (!loading && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                setPage(prevPage => prevPage + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

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
                {isFocused && <SearchResults games={games} mouseDownOnResult={mouseDownOnResult} />}
            </div>
        </div>
    );
}
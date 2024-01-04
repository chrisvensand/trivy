'use client';

import { useState, useEffect } from 'react';
import GameButton from './GameButton';

export default function CategoryGameComponent() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [games, setGames] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingGames, setLoadingGames] = useState(false);
  
  useEffect(() => {
    setLoadingCategories(true);
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data.body);
        setLoadingCategories(false);
      });
  }, []);
  
  useEffect(() => {
    setLoadingGames(true);
    let url = '/api/games';
    if (selectedCategory) {
      url += `?category=${encodeURIComponent(selectedCategory)}`;
    }
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setGames(data.body);
        setLoadingGames(false);
      });
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto flex mt-8">
      <div className="w-1/4 p-4 overflow-auto">
        {loadingCategories ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader"></div>
          </div>
        ) : (
          categories && categories.map((category, index) => (
            <button
              key={index}
              className={`w-full mb-2 p-2 rounded ${selectedCategory === category ? 'bg-gradient-to-r from-green-300 to-blue-500 text-white' : 'bg-white hover:bg-gray-300'}`}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              {category}
            </button>
          ))
        )}
      </div>
      <div className="w-3/4 p-4 overflow-auto grid grid-cols-3 gap-4">
        {loadingGames ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader"></div>
          </div>
        ) : (
          games && games.map((game, index) => (
            <GameButton game={game} key={index} />
          ))
        )}
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';

export default function GameButton({ game }: { game: any }) {
  return (
    <Link href={`/games/${game.slug}`}>
      <button className="w-full h-full p-4 mb-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700 transition-colors duration-200">
        {game.title}
      </button>
    </Link>
  );
}
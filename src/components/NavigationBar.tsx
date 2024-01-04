import Link from 'next/link'
import SearchBar from './SearchBar'

export default function NavigationBar() {
  return (
    <nav className="p-2">
      <div className="mx-auto flex justify-center items-center">
        <div className="flex space-x-4">
          <Link href="/">
            <div className="text-white bg-blue-500 rounded-full px-4 py-2 cursor-pointer">
              Home
            </div>
          </Link>
          <Link href="/about">
            <div className="text-white bg-blue-500 rounded-full px-4 py-2 cursor-pointer">
              About
            </div>
          </Link>
        </div>
        <SearchBar />
      </div>
    </nav>
  );
}
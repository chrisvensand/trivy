import Link from 'next/link'
import SearchBar from './SearchBar'

export default function NavigationBar() {
  return (
    <nav className="bg-blue-500 p-2">
      <div className="mx-auto">
        <ul className="flex justify-between items-center">
          <div className="flex space-x-4">
            <li>
              <Link href="/" className="text-white">
                Trivy
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white">
                About
              </Link>
            </li>
          </div>
          <div className="flex justify-center space-x-4 flex-grow">
            <SearchBar />
          </div>
          <div className="flex space-x-4">
            <li>
              <Link href="/signin" className="text-white">
                Sign in
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
}
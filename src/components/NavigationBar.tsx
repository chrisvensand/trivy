import Link from 'next/link'

export default function NavigationBar() {
  return (
    <nav className="bg-blue-500 p-6">
      <ul className="flex justify-between items-center">
        <div className="flex space-x-4">
          <li>
            <Link href="/" className="text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white">
              About
            </Link>
          </li>
        </div>
        <div className="flex space-x-4">
          <li>
            <Link href="/signin" className="text-white">
              Sign in
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
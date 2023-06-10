import Link from 'next/link';
import { Web3Button } from '@web3modal/react';

const Navbar = () => {
  return (
    <header className="absolute inset-x-0 top-3 z-50 mx-auto max-w-7xl">
      <nav className="py-4 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="font-bold text-xl text-white hover:text-gray-400">
            SimpliSpend
          </Link>
          <ul className="ml-8 flex items-center">
            <li className="mr-6">
              <Link href="/student" className="text-white hover:text-gray-400">
                Student
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/club" className="text-white hover:text-gray-400">
                Club
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Web3Button />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

import Link from 'next/link';
import { Web3Button } from '@web3modal/react';

const Navbar = () => {
  return (
    <header className="ml-8 bg-transparent absolute inset-x-0 top-3 z-50 ">
      <nav className="bg-transparent py-4 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="font-bold text-xl text-white hover:text-gray-400">
            Expense.
          </Link>
          <ul className="ml-8 flex items-center">
            <li className="mr-6">
              <Link
                href="/transactions"
                className="text-white hover:text-gray-400">
                Transactions
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/" className="text-white hover:text-gray-400">
                Balance
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mr-4">
            Sign Up
          </button>
          <button className="bg-transparent text-blue-500 font-bold py-2 px-4 border-style-none border-blue-500 rounded-full">
            Login
          </button>
          {/* <Web3Button /> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

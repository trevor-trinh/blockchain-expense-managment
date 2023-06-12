import Layout from '@/components/Layout';
import { useState } from 'react';
import Transactions from '@/components/club/Transactions';
import Students from '@/components/club/Students';
import Balances from '@/components/club/Balances';

const TABS = {
  Balances: {
    component: Balances,
    name: 'Balances',
  },
  Transactions: {
    component: Transactions,
    name: 'Transactions',
  },
  Students: {
    component: Students,
    name: 'Students',
  },
};

export default function Signup() {
  const [activeTab, setActiveTab] = useState('Balances');

  const TabComponent = TABS[activeTab].component;

  return (
    <Layout>
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
          <nav className="flex border-b border-white/10">
            <ul
              role="list"
              className="flex min-w-full flex-none gap-x-6 px-2 text-sm font-semibold leading-6 text-gray-400">
              {Object.values(TABS).map(({ name }) => (
                <li
                  key={name}
                  className="cursor-pointer py-4"
                  onClick={() => setActiveTab(name)}>
                  <a className={activeTab === name ? 'text-indigo-400' : ''}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <TabComponent />
        </div>
      </div>
    </Layout>
  );
}

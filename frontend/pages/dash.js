import { withIronSessionSsr } from 'iron-session/next';
import { plaidClient, sessionOptions } from '../lib/plaid';
import Layout from '@/components/Layout';
import { useState } from 'react';
import Transactions from '@/components/student/Transactions';
import Balances from '@/components/student/Balances';

const TABS = {
  Balances: {
    component: Balances,
    name: 'Balances',
  },
  Transactions: {
    component: Transactions,
    name: 'Transactions',
  },
};

export default function Dashboard({ transactions }) {
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
          <TabComponent transactions={transactions} />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const access_token = req.session.access_token;

    if (!access_token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const currentDate = new Date();
    const end_date = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    const response = await plaidClient.transactionsGet({
      access_token: access_token,
      start_date: '2018-01-01',
      end_date: end_date,
    });

    return {
      props: {
        transactions: response.data.transactions,
      },
    };
  },
  sessionOptions
);

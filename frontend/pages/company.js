import Layout from '@/components/Layout';
import CompanyTxnTable from '@/components/CompanyTxnTable';
import { useState, useEffect } from 'react';

export default function Signup() {
  const [txns, setTxns] = useState([]);
  useEffect(() => {
    const fetchTxns = async () => {
      const response = await fetch('/api/expenses');
      const data = await response.json();
      setTxns(data);
    };
    fetchTxns();
  }, []);

  return (
    <Layout>
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="bg-gray-900 py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-white">
                    Transactions
                  </h1>
                  <p className="mt-2 text-sm text-gray-300">
                    A list of all the transactions in your account including
                    their name, cost, and approval status.
                  </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className="block rounded-md bg-indigo-800 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Mint Approved Txns
                  </button>
                </div>
              </div>
              {txns === undefined || txns.length === 0 ? (
                <div className="animate-pulse">
                  {txns && (
                    <CompanyTxnTable
                      txns={[
                        {
                          _id: '',
                          invoiceNumber: '',
                          amount: '',
                          status: 'pending',
                          description: '',
                        },
                      ]}
                    />
                  )}
                </div>
              ) : (
                <CompanyTxnTable txns={txns} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

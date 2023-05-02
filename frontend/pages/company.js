import Layout from '@/components/Layout';
import CompanyTxnTable from '@/components/CompanyTxnTable';
import { useState, useEffect } from 'react';
import { contractABI, contractAddress, employeeAddress } from '@/config';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { toast } from 'react-hot-toast';

export default function Signup() {
  const [txns, setTxns] = useState([]);
  const [totalTokens, setTotalTokens] = useState(0);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'mint',
    args: [employeeAddress, totalTokens],
  });

  const { reset, isLoading, isSuccess, write, isError, error } =
    useContractWrite(config);

  useEffect(() => {
    const fetchTxns = async () => {
      const response = await fetch('/api/expenses');
      const data = await response.json();

      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === 'approved') {
          sum += data[i].amount;
        }
      }

      setTxns(data);
      setTotalTokens(sum);
    };
    fetchTxns();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Minted!');
    }
    if (isError) {
      toast.error('Error!\n' + error);
      console.log(error);
    }
    reset();
  }, [isError, isSuccess]);

  const mintTxns = () => {
    write?.();
  };

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
                    onClick={mintTxns}
                    type="button"
                    className={`block rounded-md bg-indigo-500 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                      !write || isLoading || isError
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}>
                    {isLoading
                      ? '💭 Loading...'
                      : !write
                      ? '❌ Error! Not owner.'
                      : 'Mint Approved Txns'}
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

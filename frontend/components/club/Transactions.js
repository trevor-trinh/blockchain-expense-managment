import ClubTxnTable from './ClubTxnTable';
import { useState, useEffect } from 'react';
import { contractABI, contractAddress, studentAddress } from '@/lib/config';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { toast } from 'react-hot-toast';

export default function Transactions() {
  const [txns, setTxns] = useState([]);
  const [totalTokens, setTotalTokens] = useState(0);
  const [selectedTransactions, setSelectedTransactions] = useState({});
  const [txnsChanged, setTxnsChanged] = useState(false);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'mint',
    args: [studentAddress, totalTokens],
  });

  const { reset, isLoading, isSuccess, write, isError, error } =
    useContractWrite(config);

  // fetching txns from mongodb
  useEffect(() => {
    const fetchTxns = async () => {
      const response = await fetch('/api/expenses');
      const data = await response.json();

      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === 'approved') {
          sum += data[i].amount.toFixed();
        }
      }

      setTxns(data);
      setTotalTokens(sum);
    };
    fetchTxns();
  }, [txnsChanged]);

  // TODO: change this to approve/deny
  useEffect(() => {
    if (isSuccess) {
      toast.success('Minted!');
      setTxnsChanged((prev) => !prev);
    }
    if (isError) {
      toast.error('Error!\n' + error);
      console.log(error);
    }
    reset();
  }, [isError, isSuccess, txnsChanged]);

  // TODO: change this to approve/deny on/off chain
  const handleSubmit = async (status) => {
    const selectedTransactionData = [];

    for (const key in selectedTransactions) {
      selectedTransactionData.push(key);
    }

    try {
      const res = await fetch('/api/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactions: selectedTransactionData,
          status: status,
        }),
      });

      if (res.ok) {
        toast.success('Transcactions ' + status);
        setSelectedTransactions({});
        setTxnsChanged((prev) => !prev);
      } else {
        const data = await response.json();
        toast.error(
          `Error ${status.substring(-2)}ing transactions: ${data.message}`
        );
      }
    } catch (error) {
      toast.error(`Error saving transactions: ${error.message}`);
    }
  };

  return (
    <div className="py-6 px-2">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-white">
            Transactions
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            A list of all the transactions in your account including their name,
            cost, and approval status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex flex-row gap-4">
          <button
            onClick={() => handleSubmit('approved')}
            type="button"
            className={
              'block rounded-md bg-green-700 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            }>
            ✅ Approve
          </button>
          <button
            onClick={() => handleSubmit('rejected')}
            type="button"
            className={
              'block rounded-md bg-red-700 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            }>
            ❌ Reject
          </button>
        </div>
      </div>
      {txns === undefined || txns.length === 0 ? (
        <div className="flex justify-center pt-8">
          <div className="animate-spin rounded-full h-16 w-16 border-spacing-3 border-b-2 border-indigo-400"></div>
        </div>
      ) : (
        <div className="mt-6 px-6 pt-4 pb-6 bg-gray-900 shadow-2xl ring-1 ring-white/10">
          <div className="text-center">
            <h3 className="text-base font-semibold text-white">
              🔗 On Chain 🔗
            </h3>
          </div>
          <ClubTxnTable
            txns={txns}
            selectedTransactions={selectedTransactions}
            setSelectedTransactions={setSelectedTransactions}
          />
        </div>
      )}
    </div>
  );
}

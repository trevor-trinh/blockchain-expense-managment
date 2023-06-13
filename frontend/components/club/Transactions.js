import ClubTxnTable from './ClubTxnTable';
import { useState, useEffect } from 'react';
import { contractABI, contractAddress } from '@/lib/config';
import { useContractRead } from 'wagmi';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';

export default function Transactions() {
  const [txns, setTxns] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState({});
  const [txnsChanged, setTxnsChanged] = useState(false);

  const {
    data: txnCount,
    isError: txnCountError,
    isLoading: txnCountLoading,
  } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getTransactionsCount',
  });

  // super scuffed but hotfix
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const providerRead = new ethers.providers.JsonRpcProvider('RPC_URL_HERE');
  const contractRead = new ethers.Contract(
    contractAddress,
    contractABI,
    providerRead
  );
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const signer = provider.getSigner();
  const contractWithSigner = contract.connect(signer);

  // fetching txns from mongodb
  // combine with fetching txns from blockchain
  useEffect(() => {
    const fetchTxns = async () => {
      const response = await fetch('/api/expenses');
      const data = await response.json();

      // could lead to errors if mongodb is not in sync with blockchain
      for (let i = 0; i < ethers.BigNumber.from(txnCount).toNumber(); i++) {
        const chainTxn = await contractRead.transactions(i);
        const matchingTxn = data[data.findIndex((x) => x.txnId === i)];
        if (matchingTxn) {
          matchingTxn.status = chainTxn.status;
        }
      }

      setTxns(data);
    };

    if (txnCount) {
      fetchTxns();
    }
  }, [txnsChanged]);

  // approve/deny goes over all selectedTransactions and calls contract on txnId
  const handleSubmit = async (status) => {
    const selectedTransactionData = [];
    for (const tx in selectedTransactions) {
      if (selectedTransactions[tx]) {
        selectedTransactionData.push(tx);
      }
    }

    if (status === 'approve') {
      for (let i = 0; i < selectedTransactionData.length; i++) {
        await contractWithSigner.approveTransaction(selectedTransactionData[i]);
        toast.success('Approved!');
      }
    } else {
      for (let i = 0; i < selectedTransactionData.length; i++) {
        await contractWithSigner.denyTransaction(selectedTransactionData[i]);
        toast.error('Denied!');
      }
    }
    setTxnsChanged((prev) => !prev);
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
            onClick={() => handleSubmit('approve')}
            type="button"
            className={
              'block rounded-md bg-green-700 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            }>
            ✅ Approve
          </button>
          <button
            onClick={() => handleSubmit('reject')}
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

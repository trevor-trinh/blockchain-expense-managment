import { useState } from 'react';

import { contractABI, contractAddress, studentAddress } from '@/lib/config';
import SHA256 from 'crypto-js/sha256';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';

export default function Transactions({ transactions }) {
  const [selectedTransactions, setSelectedTransactions] = useState({});

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const signer = provider.getSigner();
  const contractWithSigner = contract.connect(signer);

  const toggleTransactionSelection = (transactionId) => {
    setSelectedTransactions((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };

  const handleRowClick = (transactionId) => {
    toggleTransactionSelection(transactionId);
  };

  const handleSubmit = async () => {
    try {
      const selectedTransactionData = transactions.filter(
        (transaction) => selectedTransactions[transaction.transaction_id]
      );

      const processedData = await Promise.all(
        selectedTransactionData.map(async (obj) => {
          const newObj = { ...obj }; // create a copy of obj to avoid mutation
          const nextId = await contract.getTransactionsCount();
          newObj.txnId = ethers.BigNumber.from(nextId).toNumber();
          newObj.wallet = studentAddress;
          newObj.amount = Math.abs(Math.ceil(newObj.amount));
          newObj.hash = SHA256(
            `${newObj.name}+${newObj.date}+${newObj.amount}`
          ).toString();

          await contractWithSigner.logTransaction(newObj.hash, newObj.amount);
          return newObj;
        })
      );

      const response = await fetch('/api/saveTransactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactions: processedData }),
      });

      if (response.ok) {
        toast.success('Transactions saved successfully');
      } else {
        const data = await response.json();
        toast.error(`Error saving transactions: ${data.message}`);
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
            Connected Bank Account
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            Select transactions from your connected Bank Account to submit for
            reimbusment:
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex flex-row gap-4">
          <button
            onClick={handleSubmit}
            type="button"
            className={
              'block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            }>
            Reimburse
          </button>
        </div>
      </div>
      {transactions === undefined || transactions.length === 0 ? (
        <div className="flex justify-center pt-8">
          <div className="animate-spin rounded-full h-16 w-16 border-spacing-3 border-b-2 border-indigo-400"></div>
        </div>
      ) : (
        <div className="mt-6 px-6 pt-4 pb-6 bg-gray-900 shadow-2xl ring-1 ring-white/10">
          <div className="text-center">
            <h3 className="text-base font-semibold text-white">
              🏦 In Bank 🏦
            </h3>
          </div>
          <div className="w-full">
            <div className="mt-4 flow-root rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 px-5 sm:px-6 lg:px-8">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="inline-block min-w-full py-2 align-middle ">
                  <div className="overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th className="text-xs font-semibold text-left text-gray-500 uppercase py-5 pl-4">
                            Name
                          </th>
                          <th className="text-xs font-semibold text-left text-gray-500 uppercase pl-4">
                            Amount
                          </th>
                          <th className="text-xs font-semibold text-left text-gray-500 uppercase">
                            Category
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {transactions.map((transaction) => (
                          <tr
                            key={transaction.transaction_id}
                            onClick={() =>
                              handleRowClick(transaction.transaction_id)
                            }
                            className={`${
                              selectedTransactions[transaction.transaction_id]
                                ? 'selected bg-gray-700 rounded-lg'
                                : ''
                            }`}>
                            <td className="relative py-5 pr-6 pl-4">
                              <div className="flex items-start gap-x-3">
                                <div className="text-sm font-medium leading-6 text-gray-300">
                                  {transaction.name}
                                </div>
                              </div>
                              {transaction.date ? (
                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                  {transaction.date}
                                </div>
                              ) : null}
                            </td>
                            <td className="py-5">
                              <div className="text-sm leading-6 text-gray-300">
                                💲
                                {Math.abs(transaction.amount) +
                                  ' ' +
                                  transaction.iso_currency_code}
                              </div>
                            </td>
                            <td className="py-5">
                              <div className="text-sm leading-6 text-gray-300">
                                {transaction.category.toString()}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

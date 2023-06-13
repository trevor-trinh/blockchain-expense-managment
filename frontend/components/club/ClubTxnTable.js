import { XMarkIcon, ArrowPathIcon, CheckIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';

const statuses = {
  1: {
    icon: CheckIcon,
    className: 'text-green-700 bg-green-50 ring-green-600/20',
  },
  0: {
    icon: ArrowPathIcon,
    className: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  },
  2: {
    icon: XMarkIcon,
    className: 'text-red-700 bg-red-50 ring-red-600/10',
  },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ClubTxnTable({
  txns,
  selectedTransactions,
  setSelectedTransactions,
}) {
  const toggleTransactionSelection = (transactionId) => {
    setSelectedTransactions((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };

  const handleRowClick = (transactionId) => {
    toggleTransactionSelection(transactionId);
  };

  return (
    <div className="mt-4 flow-root rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 px-5 sm:px-6 lg:px-8">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        <div className="inline-block min-w-full py-2 align-middle ">
          <div className="overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <tbody className="divide-y divide-gray-700">
                {txns &&
                  txns.map((transaction) => {
                    const status = statuses[transaction.status].className;
                    const Icon = statuses[transaction.status].icon;
                    return (
                      <tr
                        key={transaction.txnId}
                        onClick={() => handleRowClick(transaction.txnId)}
                        className={`${
                          selectedTransactions[transaction.txnId]
                            ? 'selected bg-gray-700 rounded-lg'
                            : ''
                        }`}>
                        <td className="relative py-5 pr-6 pl-4">
                          <div className="flex gap-x-6">
                            <Icon
                              className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                              aria-hidden="true"
                            />
                            <div className="flex-auto">
                              <div className="flex items-start gap-x-3">
                                <div className="text-sm font-medium leading-6 text-gray-300">
                                  💲{transaction.amount}
                                </div>
                                <div
                                  className={classNames(
                                    status,
                                    'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                                  )}>
                                  {transaction.status === 0
                                    ? 'pending'
                                    : transaction.status === 1
                                    ? 'approved'
                                    : 'rejected'}
                                </div>
                              </div>
                              {transaction.date ? (
                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                  {new Date(
                                    transaction.date
                                  ).toLocaleDateString('en-US', {
                                    dateStyle: 'medium',
                                  })}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-5 pr-6 pl-4 sm:table-cell">
                          <div className="text-sm leading-6 text-gray-300">
                            {transaction.title}
                          </div>
                          {transaction.description ? (
                            <div className="mt-1 text-xs leading-5 text-gray-500 truncate w-32">
                              {transaction.description}
                            </div>
                          ) : null}
                        </td>
                        <td className="py-5 pr-4 text-right">
                          <div className="flex justify-end">
                            <a
                              href={`https://mumbai.polygonscan.com/address/${transaction.wallet}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-medium leading-6 text-indigo-500 hover:text-indigo-400 hover:cursor-pointer">
                              View Wallet
                            </a>
                          </div>
                          <div className="mt-1 text-xs leading-5 text-gray-500">
                            hash{' '}
                            <span className="text-gray-300">
                              0x
                              {transaction.hash.substr(0, 8)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

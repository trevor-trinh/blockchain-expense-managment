import { withIronSessionSsr } from "iron-session/next";
import { plaidClient, sessionOptions } from "../lib/plaid";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import {
  contractABI,
  contractAddress,
  usdcAddress,
  usdcABI,
} from "@/lib/config";
import SHA256 from "crypto-js/sha256";
import { useRouter } from "next/router";

export default function Dashboard({ transactions }) {
  const [selectedTransactions, setSelectedTransactions] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [transactionCount, setTransactionCount] = useState();

  const {
    data: transactionData,
    isLoading,
    isSuccess: transSuccess,
    isError: transError,
    write,
  } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "logTransaction",
    // args: [hashData, expensePrice],
  });

  const {
    data: transactionCountData,
    isError: transactionCountError,
    isLoading: transactionCountLoading,
  } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "getTransactionsCount",
  });

  useEffect(() => {
    if (
      !transactionCountLoading &&
      !transactionCountError &&
      transactionCountData
    ) {
      setTransactionCount(transactionCountData);
    }
  }, [transactionCountData, transactionCountLoading, transactionCountError]);

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
    const selectedTransactionData = transactions
      .filter((transaction) => selectedTransactions[transaction.transaction_id])
      .map((transaction) => ({
        ...transaction,
        description: descriptions[transaction.transaction_id] || "",
        trxCount: parseInt(transactionCount),
        wallet: "0x3C379062F48308840F827F27D77F9d47eAF62592",
      }));

    try {
      for (const transaction of selectedTransactionData) {
        const hashData =
          transaction.title + transaction.amount + transaction.date;
        const transactionHash = SHA256(hashData).toString();
        await write(transactionHash, transaction.amount); //check
      }

      const response = await fetch("/api/saveTransactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactions: selectedTransactionData }),
      });

      if (response.ok) {
        alert("Transactions saved successfully");
      } else {
        const data = await response.json();
        alert(`Error saving transactions: ${data.message}`);
      }
    } catch (error) {
      alert(`Error saving transactions: ${error.message}`);
    }
  };
  const router = useRouter();
  return (
    <Layout>
      <div className="flex">
        <div className="bg-gray-900">
          <div className="mx-auto max-w-7xl">
            <div className="bg-gray-900 py-10">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-white">
                      Your Bank Account has been Successfully Connected!
                    </h1>
                    <h2 className="text-base font-semibold leading-6 text-white">
                      Transactions from your connected Bank Account :
                    </h2>
                    <div className="flex">
                      <div className="w-full">
                        <div className="mt-8 flow-root rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 px-5">
                          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                              <div className="overflow-hidden sm:rounded-lg">
                                <div className="flex-1">
                                  <table className="min-w-full divide-y divide-gray-700">
                                    <thead>
                                      <tr>
                                        <th className="text-xs font-semibold text-left text-gray-500 uppercase">
                                          Name
                                        </th>
                                        <th className="text-xs font-semibold text-left text-gray-500 uppercase">
                                          Amount
                                        </th>
                                        <th className="text-xs font-semibold text-left text-gray-500 uppercase">
                                          Category
                                        </th>
                                        <th className="text-xs font-semibold text-left text-gray-500 uppercase">
                                          Address
                                        </th>
                                        <th className="text-xs font-semibold text-left text-gray-500 uppercase center">
                                          Store Number
                                        </th>
                                        <th className="text-xs font-semibold text-left text-gray-500 uppercase">
                                          Description
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                      {transactions.map((transaction) => (
                                        <tr
                                          key={transaction.transaction_id}
                                          onClick={() =>
                                            handleRowClick(
                                              transaction.transaction_id
                                            )
                                          }
                                          className={`${
                                            selectedTransactions[
                                              transaction.transaction_id
                                            ]
                                              ? "bg-green-900"
                                              : ""
                                          }`}
                                        >
                                          <td className="py-5">
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
                                                " " +
                                                transaction.iso_currency_code}
                                            </div>
                                          </td>
                                          <td className="py-5">
                                            <div className="text-sm leading-6 text-gray-300">
                                              {transaction.category.toString()}
                                            </div>
                                          </td>
                                          <td className="py-5">
                                            <div className="text-sm leading-6 text-gray-300">
                                              {transaction.location.address}
                                            </div>
                                          </td>
                                          <td className="py-5">
                                            <div className="text-sm leading-6 text-gray-300">
                                              {
                                                transaction.location
                                                  .store_number
                                              }
                                            </div>
                                          </td>
                                          <td className="py-5">
                                            <input
                                              type="text"
                                              className="w-full px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                              placeholder="Enter description"
                                            />
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
                      <div className="ml-4 w-80">
                        <button
                          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded"
                          onClick={handleSubmit}
                        >
                          Submit Selected Transactions for Review
                        </button>
                        <button
                          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded"
                          onClick={() => router.push("/swap")}
                        >
                          Swap SIMP tokens for USDC
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          destination: "/",
          permanent: false,
        },
      };
    }

    const currentDate = new Date();
    const end_date = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

    const response = await plaidClient.transactionsGet({
      access_token: access_token,
      start_date: "2018-01-01",
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

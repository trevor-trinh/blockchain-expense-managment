import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Layout from "@/components/Layout";

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
  studentAddress,
} from "@/lib/config";
import { ethers } from "ethers";

export default function Balances() {
  const [stats, setStats] = useState();
  const [amountToSwap, setAmountToSwap] = useState();

  const {
    data: exchangeData,
    isLoading,
    isSuccess: exhSuccess,
    isError: exhError,
    write,
  } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "exchangeSIMP",
    // args: [100],
  });

  const {
    data: usdcData,
    isError: usdcError,
    isLoading: usdcLoading,
  } = useContractRead({
    address: usdcAddress,
    abi: usdcABI,
    functionName: "balanceOf",
    args: [contractAddress],
  });

  const {
    data: simpData,
    isError: simpError,
    isLoading: simpLoading,
  } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "balanceOf",
    args: [studentAddress],
  });

  useEffect(() => {
    if (!usdcLoading && !simpLoading && !usdcError && !simpError) {
      setStats([
        {
          name: "Your SIMP Tokens 🥰",
          value: ethers.BigNumber.from(simpData).toNumber(),
          unit: "SIMP",
        },
        {
          name: "Deposited USDC 💰",
          value: ethers.BigNumber.from(usdcData).toNumber(),
          unit: "USDC",
        },
      ]);
    }
  }, [usdcData, simpData, usdcLoading, simpLoading, usdcError, simpError]);

  const handleSwap = async () => {
    try {
      await write({ args: [amountToSwap] });
      toast.success("Swap Successful!");
    } catch (error) {
      toast.error("Swap Failed!");
    }
  };

  // useEffect(() => {
  //   if (fundSuccess) {
  //     setStats((prevStats) => {
  //       return prevStats.map((item) => {
  //         if (item.name === "Deposited USDC 💰") {
  //           return {
  //             ...item,
  //             value: item.value + 100,
  //           };
  //         } else {
  //           return item;
  //         }
  //       });
  //     });
  //     toast.success("Funded 100 USDC!");
  //   }
  //   if (fundError) {
  //     toast.error("Error!\n" + error);
  //     console.log(error);
  //   }
  // }, [fundSuccess, fundError]);

  return (
    <Layout>
      <div className="py-6 px-2">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-white">
              Balances and Trading
            </h1>
            <p className="mt-2 text-sm text-gray-300">Your current balances.</p>
          </div>
          <button
            onClick={() => write()}
            type="button"
            className={
              "block rounded-md bg-green-700 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }
          >
            💵 Fund USDC
          </button>
        </div>
        {stats ? (
          <>
            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-2 shadow-2xl ring-1 ring-white/10 mt-8">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8"
                >
                  <p className="text-sm font-medium leading-6 text-gray-400">
                    {stat.name}
                  </p>
                  <p className="mt-2 flex items-baseline gap-x-2">
                    <span className="text-4xl font-semibold tracking-tight text-white">
                      {stat.value}
                    </span>
                    {stat.unit ? (
                      <span className="text-sm text-gray-400">{stat.unit}</span>
                    ) : null}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <div className="mt-6 px-4 py-6 bg-gray-900 shadow-2xl ring-1 ring-white/10 inline-block">
                <div className="text-center">
                  <h2 className="text-base font-semibold leading-6 text-white">
                    Swap SIMP for USDC
                  </h2>
                  <p className="mt-2 text-sm text-gray-300">
                    Enter the amount of SIMP you want to exchange for USDC.
                  </p>
                </div>
                <div className="mt-4">
                  <input
                    type="number"
                    onChange={(e) => setAmountToSwap(e.target.value)}
                    className="mr-2 px-3 py-2 text-sm font-medium leading-4 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter SIMP amount"
                  />
                  <button
                    onClick={handleSwap}
                    className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
                  >
                    Swap
                  </button>
                </div>
                {/*  */}
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center pt-8">
            <div className="animate-spin rounded-full h-16 w-16 border-spacing-3 border-b-2 border-indigo-400"></div>
          </div>
        )}
      </div>
    </Layout>
  );
}

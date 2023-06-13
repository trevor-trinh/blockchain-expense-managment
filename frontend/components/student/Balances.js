import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { contractABI, contractAddress, studentAddress } from '@/lib/config';
import { ethers } from 'ethers';

export default function Balances() {
  const [stats, setStats] = useState();
  const [amountToSwap, setAmountToSwap] = useState();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'exchangeSIMP',
    args: [amountToSwap],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const {
    data: simpData,
    isError: simpError,
    isLoading: simpLoading,
  } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'balanceOf',
    args: [studentAddress],
  });

  useEffect(() => {
    if (!simpLoading && !simpError) {
      setStats([
        {
          name: 'Your SIMP Tokens 🥰',
          value: ethers.BigNumber.from(simpData).toNumber(),
          unit: 'SIMP',
        },
      ]);
    }
  }, [simpData, simpLoading, simpError]);

  const handleSwap = async () => {
    try {
      console.log('amountToSwap', amountToSwap);
      await write?.();
      toast.success('Swap Successful!');
    } catch (error) {
      toast.error('Swap Failed!');
    }
  };

  return (
    <div className="py-6 px-2">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-white">
            Balances and Trading
          </h1>
          <p className="mt-2 text-sm text-gray-300">Your current balances.</p>
        </div>
      </div>
      {stats ? (
        <div className="flex align-middle justify-evenly">
          <div className="flex justify-center  bg-white/5 shadow-2xl ring-1 ring-white/10 mt-8">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="inline-block bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
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
                  className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-700 hover:bg-green-500">
                  Swap
                </button>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center pt-8">
          <div className="animate-spin rounded-full h-16 w-16 border-spacing-3 border-b-2 border-indigo-400"></div>
        </div>
      )}
    </div>
  );
}

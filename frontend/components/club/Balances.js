import { AreaChart, linearGradient, Area, XAxis } from 'recharts';
import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import { contractABI, contractAddress, usdcAddress, usdcABI } from '@/config';
import { ethers } from 'ethers';

const data = [
  { v: 0, date: '1/22' },
  { v: 0.5, date: '2/22' },
  { v: 3, date: '3/22' },
  { v: 5, date: '4/22' },
  { v: 8, date: '5/22' },
  { v: 7, date: '6/22' },
  { v: 10, date: '7/22' },
  { v: 20, date: '8/22' },
  { v: 13, date: '9/22' },
  { v: 15, date: '10/22' },
  { v: 18, date: '11/22' },
  { v: 25, date: '12/22' },
  { v: 24, date: '1/23' },
  { v: 34, date: '2/23' },
  { v: 37, date: '3/23' },
];

export default function Balances() {
  const [stats, setStats] = useState();

  const {
    data: usdcData,
    isError: usdcError,
    isLoading: usdcLoading,
  } = useContractRead({
    address: usdcAddress,
    abi: usdcABI,
    functionName: 'balanceOf',
    args: [contractAddress],
  });

  const {
    data: simpData,
    isError: simpError,
    isLoading: simpLoading,
  } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'totalSupply',
  });

  useEffect(() => {
    if (!usdcLoading && !simpLoading && !usdcError && !simpError) {
      setStats([
        {
          name: 'SIMP Token (Outstanding)',
          value: ethers.BigNumber.from(simpData).toNumber(),
          unit: 'SIMP',
        },
        {
          name: 'Deposited USDC',
          value: ethers.BigNumber.from(usdcData).toNumber(),
          unit: 'USDC',
        },
        {
          name: 'Total Expensed',
          value: `\$${Math.floor(Math.random() * 5000)}`,
        },
      ]);
    }
  }, [usdcData, simpData, usdcLoading, simpLoading, usdcError, simpError]);

  return (
    <div className="py-6 px-2">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-white">
            Balances
          </h1>
          <p className="mt-2 text-sm text-gray-300">Your current balances.</p>
        </div>
      </div>
      {stats ? (
        <>
          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3 shadow-2xl ring-1 ring-white/10 mt-8">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
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
                  Monthly Progress
                </h2>
                <p className="mt-2 text-sm text-gray-300">
                  Your expenses over time.
                </p>
              </div>
              <AreaChart
                width={800}
                height={200}
                data={data}
                className="block max-w-full">
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={1} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="rgba(124, 58, 237)"
                  fill="url(#colorUv)"
                  strokeWidth={3}
                />
              </AreaChart>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center pt-8">
          <div className="animate-spin rounded-full h-16 w-16 border-spacing-3 border-b-2 border-indigo-400"></div>
        </div>
      )}
    </div>
  );
}

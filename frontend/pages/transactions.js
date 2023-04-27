import Image from 'next/image';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TxnTable from '@/components/TxnTable';
import { useEffect, useState } from 'react';
// const txns = [
//   {
//     name: 'patagonia',
//     cost: '100',
//     approval: true,
//   },
// ];
export default function Transactions() {
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
    <div>
      <Navbar />
      <div className="h-screen relative isolate overflow-hidden bg-gray-900 mx-auto">
        <div className="ml-8 mx-auto max-w-7xl px-6 pb-24 pt-14 sm:pb-32">
          {txns && <TxnTable txns={txns} />}
        </div>
      </div>
    </div>
  );
}

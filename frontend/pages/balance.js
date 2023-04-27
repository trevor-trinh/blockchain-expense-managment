import Balances from '@/components/Balances';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

const stats = [
  { name: 'EXP Token', value: '405', unit: 'exp' },
  { name: 'Outstanding Expenses', value: '$3.65' },
  { name: 'Total Expensed', value: '$3' },
];

export default function Balance() {
  return (
    <div>
      <Navbar />
      <div className="h-screen relative isolate overflow-hidden bg-gray-900 mx-auto">
        <div className="ml-8 mx-auto max-w-7xl px-6 pb-24 pt-14 sm:pb-32">
          <Balances stats={stats} />
        </div>
      </div>
    </div>
  );
}

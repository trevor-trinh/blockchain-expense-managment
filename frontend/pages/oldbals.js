import Balances from '@/components/Balances';
import Layout from '@/components/Layout';

const stats = [
  { name: 'EXP Token', value: '405', unit: 'exp' },
  { name: 'Outstanding Expenses', value: '$3.65' },
  { name: 'Total Expensed', value: '$3' },
];

export default function Balance() {
  return (
    <Layout>
      <Balances stats={stats} />
    </Layout>
  );
}

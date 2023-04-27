import Layout from '@/components/Layout';
import TxnTable from '@/components/TxnTable';
import { useEffect, useState } from 'react';

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

  return <Layout>{txns && <TxnTable txns={txns} />}</Layout>;
}

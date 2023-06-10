import Layout from '@/components/Layout';
import Router from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function PlaidLink() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch('/api/create-link-token', {
        method: 'POST',
      });
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (publicToken) => {
    await fetch('/api/exchange-public-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token: publicToken }),
    });
    Router.push('/dash');
  }, []);

  const { open } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <Layout>
      <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={open}>
          Connect to Plaid
        </button>
        <div className="mt-10"></div>
      </div>
    </Layout>
  );
}

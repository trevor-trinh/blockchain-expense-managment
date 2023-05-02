import { withIronSessionSsr } from 'iron-session/next';
import { plaidClient, sessionOptions } from '../lib/plaid';

export default function Dashboard({transactions }) {
  return( <div className="container mx-auto p-4"> 
      <h1 className="text-3xl font-bold mb-4">Transactions</h1> 
      <div className="grid grid-cols-3 gap-4"> 
        {transactions.map((transaction) => (
          <div
            key={transaction.transaction_id}
            className="bg-white p-4 shadow rounded"
          >
            <p className="font-bold">{transaction.name}</p> 
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.date}</p>
          </div>
        ))}
      </div>
    </div>
    );
}

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
  const access_token = req.session.access_token;

  if (!access_token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  const response = await plaidClient.transactionsGet({ access_token: access_token,
    start_date: '2018-01-01',
    end_date: '2023-02-01' });
  return {
    props: {
      transactions: response.data.transactions
    }
  };
}, sessionOptions);


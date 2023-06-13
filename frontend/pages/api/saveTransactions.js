import clientPromise from '../../lib/mongodb';

const transformTxns = (txns) => {
  return txns.map((txn) => {
    const transformTxn = {
      amount: txn.amount,
      title: txn.name,
      description: txn.category.join(', '),
      date: txn.date,
      txnId: txn.txnId,
      wallet: txn.wallet,
      hash: txn.hash,
    };
    return transformTxn;
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { transactions } = req.body;
      const client = await clientPromise;
      const db = client.db('expenses');

      const expenses = transformTxns(transactions);
      await db.collection('expenses').insertMany(expenses);
      console.log(expenses);
      res.status(200).json({ message: 'Transactions saved successfully' });
      // res.json(txns);
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .send('Internal Server Error: ' + JSON.stringify(e, null, 2));
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { transactions, status } = req.body;
      const client = await clientPromise;
      const db = client.db('expenses');

      await db
        .collection('Expense')
        .updateMany(
          { _id: { $in: transactions.map((txn) => ObjectId(txn)) } },
          { $set: { status: status } }
        );
      res.status(200).json({ message: 'Transactions saved successfully' });
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

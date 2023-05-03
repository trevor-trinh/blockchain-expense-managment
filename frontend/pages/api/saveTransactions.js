// pages/api/saveTransactions.js
import { connectToDatabase } from '../../lib/mango';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { transactions } = req.body;
    const { db } = await connectToDatabase();
    
    try {
      await db.collection('transactions').insertMany(transactions);
      res.status(200).json({ message: 'Transactions saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving transactions', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

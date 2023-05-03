import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('expenses');

      const expenses = await db.collection('Expense').find({}).toArray();

      res.json(expenses);
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

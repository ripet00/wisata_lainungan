import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // password MySQL Laragon
    database: 'wisata_lainungan'
  });

  if (req.method === 'GET') {
    const [rows] = await db.query('SELECT * FROM cards');
    res.status(200).json(rows);
  }
  // Tambahkan POST, PUT, DELETE sesuai kebutuhan
}
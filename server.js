const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const dbFile = path.resolve(__dirname, 'data/database.sqlite');

// SQLiteデータベースの接続設定
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

app.use(express.json());

// データベース接続をルートに渡す
app.use((req, res, next) => {
  console.log('Database middleware called');
  req.db = db;
  next();
});

// データベース接続確認用エンドポイント
app.get('/api/check-db', (req, res) => {
  req.db.all('SELECT * FROM messages', (err, rows) => {
    if (err) {
      console.error('Error checking database connection:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Database connection is working', data: rows });
    }
  });
});

app.use('/api', (req, res, next) => {
  console.log('API route called');
  next();
}, apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
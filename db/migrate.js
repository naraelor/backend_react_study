const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// データベースディレクトリ確保
const dbDir = path.join(__dirname, '../');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// データベース接続
const db = new sqlite3.Database(path.join(dbDir, 'database.sqlite'));

// テーブル作成
db.serialize(() => {
  // messagesテーブル
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL UNIQUE
    )
  `);
  
  // 他のテーブルがあれば追加
});

db.close();

console.log('Database schema migrated successfully');
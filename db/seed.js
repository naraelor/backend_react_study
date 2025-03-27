const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// データベース接続
const db = new sqlite3.Database(path.join(__dirname, '../database.sqlite'));

// 初期データ挿入
db.serialize(() => {
  // 既存データを削除（オプション）
  // db.run('DELETE FROM messages');
  
  // 初期データを挿入
  const messages = [
    'Hello from the standalone backend!!!',
    'Goodbye from the standalone backend!!'
  ];
  
  const stmt = db.prepare('INSERT OR IGNORE INTO messages (text) VALUES (?)');
  messages.forEach(message => {
    stmt.run(message);
  });
  stmt.finalize();
  
  console.log(`Seeded database with ${messages.length} messages`);
});

db.close();
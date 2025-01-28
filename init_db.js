const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const dbFile = path.resolve(__dirname, 'data/database.sqlite');

// データベースファイルが存在しない場合は作成
if (!fs.existsSync(dbFile)) {
  fs.openSync(dbFile, 'w');
}

const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS messages (text TEXT)');
  db.run('INSERT INTO messages (text) VALUES (?)', ['Hello from the standalone backend!!!']);
  db.run('INSERT INTO messages (text) VALUES (?)', ['Goodbye from the standalone backend!!']);
});

db.close();
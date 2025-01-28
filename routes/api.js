const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

router.get('/hello', (req, res) => {
  req.db.get('SELECT text FROM messages WHERE text = ?', ['Hello from the standalone backend!!!'], (err, row) => {
    if (err) {
      console.error('Error fetching hello message:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: row ? row.text : 'Hello from the standalone backend!!!' });
    }
  });
});

router.get('/goodbye', (req, res) => {
  req.db.get('SELECT text FROM messages WHERE text = ?', ['Goodbye from the standalone backend!!'], (err, row) => {
    if (err) {
      console.error('Error fetching goodbye message:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: row ? row.text : 'Goodbye from the standalone backend!!' });
    }
  });
});

module.exports = router;
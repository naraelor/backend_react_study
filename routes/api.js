const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());


router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the standalone backend!!!' });
});

router.get('/goodbye', (req, res) => {
  res.json({ message: 'Goodbye from the standalone backend!!' });
});
module.exports = router;

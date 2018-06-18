const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  const info = {
    name: 'Lucas',
    age: 24,
    isCool: true
  }
  res.render('hello', {'info': info})
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('')
  res.send(reverse)
})

module.exports = router;

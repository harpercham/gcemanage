var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/cr8proj', function (req, res, next) {
  res.render('cr8proj');
});

module.exports = router;

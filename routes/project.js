var express = require('express');
var router = express.Router();

/* GET projects page. */
router.get('/project'.concat(1), function (req, res, next) {
  res.render('project', { i: 1 });
});
router.get('/project'.concat(2), function (req, res, next) {
  res.render('project', { i: 2 });
});
router.get('/project'.concat(3), function (req, res, next) {
  res.render('project', { i: 3 });
});
router.get('/project'.concat(4), function (req, res, next) {
  res.render('project', { i: 4 });
});
router.get('/project'.concat(5), function (req, res, next) {
  res.render('project', { i: 5 });
});
router.get('/project'.concat(6), function (req, res, next) {
  res.render('project', { i: 6 });
});
router.get('/project'.concat(7), function (req, res, next) {
  res.render('project', { i: 7 });
});
router.get('/project'.concat(8), function (req, res, next) {
  res.render('project', { i: 8 });
});
router.get('/project'.concat(9), function (req, res, next) {
  res.render('project', { i: 9 });
});
router.get('/project'.concat(10), function (req, res, next) {
  res.render('project', { i: 10 });
});
router.get('/project'.concat(11), function (req, res, next) {
  res.render('project', { i: 11 });
});
router.get('/project'.concat(12), function (req, res, next) {
  res.render('project', { i: 12 });
});



module.exports = router;

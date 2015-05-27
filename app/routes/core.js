var router = require('express').Router(),
	core = require('../controllers/core');

router.route('/')
	.get(core.index);

router.route('/search')
  .post(core.search);

module.exports.basePath = '/';
module.exports.router = router;

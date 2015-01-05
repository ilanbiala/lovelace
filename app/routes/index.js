var router = require('express').Router(),
	index = require('../controllers/index');

router.route('/')
	.get(index);

module.exports.basePath = '/';
module.exports.router = router;

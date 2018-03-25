/**
 * Created by bagjeongtae on 2017. 12. 23..
 */
const express = require('express');
const router = express.Router();

const coins = require('./coins');
const users = require('./users');
const transaction = require('./transaction');
const utils = require('./utils');
const ranks = require('./ranks');
const banks = require('./banks');


router.use('/coin', coins);
router.use('/users', users);
router.use('/transaction', transaction);
router.use('/utils', utils);
router.use('/ranks', ranks);
router.use('/banks', banks);

module.exports = router;
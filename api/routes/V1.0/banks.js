/**
 * Created by bagjeongtae on 2018. 2. 21..
 */
const express = require('express');
const router = express.Router();

const {
    userCoins,
    users,
    banks
} = require('../../models')

router.get('/', (req, res) => {
    res.json({message: 'asd'})
})

router.put('/', (req, res) => {

})

router.put('/', (req, res) => {

})

router.put('/', (req, res) => {

})

module.exports = router;
/**
 * Created by bagjeongtae on 2018. 2. 19..
 */
const express = require('express');
const router = express.Router();

const {
    userCoins,
    users
} = require('../../models')

router.get('/', (req, res) => {
    let coin = req.query.coin || 'krw'
    console.log(coin)
    userCoins.findAll({
        limit: 50,
        attributes: ['id', coin],
        order: [
            [coin, 'DESC'] // 원화 내림차순
        ],
        include: [
            {
                model: users,
                attributes: ['username']
            }
        ],
        raw: true
    }).then(result => {
        res.status(200).json(result)
    }, err => {
        console.log(err)
    })
})

module.exports = router;
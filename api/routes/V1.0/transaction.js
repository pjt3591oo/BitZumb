/**
 * Created by bagjeongtae on 2018. 2. 15..
 */
const express = require('express');
const router = express.Router();

const {
    transactionComplete,
    transactionWaits,
    userCoins
} = require('../../models')

/*
* 판매/구매 대시 등록시 - 코인, 원화 감소만 이루어짐 증가는 실제 사용자가 거래를 했을 때 이루어짐
* */
router.put('/buy/wait',  (req, res)=> {
    let userInfo = req.user

    if(!userInfo) return res.status(204).json({})

    let {
        type,
        currentPriceCondition,
        transactionCoinCount,
        buyPrice
    } = req.body

    transactionWaits.create({
        userId: userInfo['id'],
        status: 'b',
        priceCondition: currentPriceCondition,
        coinCount: transactionCoinCount,
        price: buyPrice,
        coinType: type
    }).then(() => {
        let copyUserInfo = {...req.user,
            krw: req.user['krw'] - buyPrice,
        }
        // copyUserInfo[type] += transactionCoinCount

        delete copyUserInfo['id']

        console.log('구매전: ',req.user)
        console.log('구매후: ',copyUserInfo)

        userCoins.update(
            copyUserInfo
        ,{
            where: {userId: userInfo['id']}
        }).then(() => {
            req.user['krw'] = copyUserInfo['krw']
            req.user[type] = copyUserInfo[type]
            res.status(201).json(copyUserInfo)
        })

    })
})

router.put('/sell/wait', (req, res)=> {
    let userInfo = req.user

    if(!userInfo) return res.status(204).json({})

    let {
        type,
        currentPriceCondition,
        transactionCoinCount,
        sellPrice
    } = req.body

    transactionWaits.create({
        userId: userInfo['id'],
        status: 's',
        priceCondition: currentPriceCondition,
        coinCount: transactionCoinCount,
        price: sellPrice,
        coinType: type
    }).then(() => {
        let copyUserInfo  = {...req.user
            // ,krw: req.user['krw'] + sellPrice,
        }
        copyUserInfo[type] -= transactionCoinCount

        delete copyUserInfo['id']

        console.log('판매전: ',req.user)
        console.log('판매후: ',copyUserInfo)

        userCoins.update(
            copyUserInfo
        ,{
            where: {userId: userInfo['id']}
        }).then(() => {
            req.user['krw'] = copyUserInfo['krw']
            req.user[type] = copyUserInfo[type]

            res.status(201).json(copyUserInfo)
        })
    })
})

router.get('/buy/histories/wait', (req, res) => {
    // 로그인한 유저의 구매대기 기록
    if(!req.user){
        return res.status(200).json([])
    }

    let coinTypeFilter = req.query.coinType ? {coinType: req.query.coinType} : {}

    transactionWaits.findAll({
        raw: true,
        limit: 50,
        where: {$and: [{userId: req.user['id']}, {status: 'b'}, coinTypeFilter]}
    }).then(result => {
        res.status(200).json(result)
    })
})

router.get('/sell/histories/wait', (req, res) => {
    // 로그인한 유저의 판매대기 기록
    if(!req.user){
        return res.status(200).json([])
    }

    let coinTypeFilter = req.query.coinType ? {coinType: req.query.coinType} : {}

    transactionWaits.findAll({
        raw: true,
        limit: 50,
        where: {$and: [{userId: req.user['id']}, {status: 's'}, coinTypeFilter]}
    }).then(result => {
        res.status(200).json(result)
    })
})
router.get('/buy/histories/complete', (req, res) => {
    // 로그인한 유저의 구매완료 기록
    if(!req.user){
        return res.status(200).json([])
    }

    let coinTypeFilter = req.query.coinType ? {coinType: req.query.coinType} : {}

    transactionComplete.findAll({
        raw: true,
        limit: 50,
        where: {$and: [{userId: req.user['id']}, {status: 'b'}, coinTypeFilter]}
    }).then(result => {
        res.status(200).json(result)
    })
})

router.get('/sell/histories/complete', (req, res) => {
    // 로그인한 유저의 판매완료 기록
    if(!req.user){
        return res.status(200).json([])
    }

    let coinTypeFilter = req.query.coinType ? {coinType: req.query.coinType} : {}

    transactionComplete.findAll({
        raw: true,
        limit: 50,
        where: {$and: [{userId: req.user['id']}, {status: 's'}, coinTypeFilter]}
    }).then(result => {
        res.status(200).json(result)
    })
})

router.get('/buy/histories/wait/blank', (req, res) => {
    // 구매대기 기록
    let coinTypeFilter = req.query.coinType ? {coinType: req.query.coinType} : {}

    transactionWaits.findAll({
        raw: true,
        limit: 5,
        where: {$and: [{status: 'b'}, coinTypeFilter]}
    }).then(result => {
        res.status(200).json(result)
    })
})
router.get('/sell/histories/wait/blank', (req, res) => {
    // 판매대기 기록
    let coinTypeFilter = req.query.coinType ? {coinType: req.query.coinType} : {}

    transactionWaits.findAll({
        raw: true,
        limit: 5,
        where: {$and: [{status: 's'}, coinTypeFilter]}
    }).then(result => {
        res.status(200).json(result)
    })
})
router.get('/complete/blank', (req, res) => {
    // 거래완료
    let coinTypeFilter = req.query.coinType ? {coinType: req.query.coinType} : {}
    console.log(coinTypeFilter)
    transactionComplete.findAll({
        raw: true,
        limit: 10,
        where: coinTypeFilter
    }).then(result => {
        res.status(200).json(result)
    })
})


router.get('/histories', (req, res) => {
    let buies= [],
        sells = [],
        coinType = req.query.coinType

    transactionWaits.findAll({
        raw: true,
        limit: 5,
        where: {$and:[ {status: 'b'}, {coinType: coinType}]}
    }).then(result => {
        buies = result
        return transactionWaits.findAll({
            raw: true,
            limit: 5,
            where: {$and:[ {status: 's'}, {coinType: coinType}]}
        })
    }).then(result => {
        sells = result
        res.status(200).json({
            buies: buies,
            sells: sells
        })
    })
})

router.post('/waits', (req, res) => {
    let userInfo = req.user

    let { coinFilter }= req.body
    let userFilter = userInfo ? {$not: [{userId: userInfo['id']}]} : {}

    let filter = {$and: [coinFilter, userFilter]}

    transactionWaits.findAll({
        raw: true,
        where : filter
    }).then(result => {
        res.status(200).json(result)
    })
})

router.put('/buy',  (req, res) => {
    let userInfo = req.user,
        waitId = req.body.waitId;

    if(!userInfo) return res.status(204).json({})

    let transactionInfo = {},
        buyerUserInfo = {},
        sellerUserInfo = {}

    transactionWaits.findById(waitId, {
        raw: true,
        attributes: [
            'id', 'priceCondition', 'coinType', 'price',
            'coinCount', 'status', 'userId'
        ]
    }).then(result => {
        transactionInfo = result

        return userCoins.findOne({
            where: {userId: userInfo['id']},
            raw: true
        })
    }).then(result => {
        buyerUserInfo = result
        return userCoins.findOne({
            where: {userId: transactionInfo['userId']},
            raw: true
        })
    }).then(result =>{
        sellerUserInfo = result

        // 구매자 정보 업데이트(버튼 누른사람)
        let type= transactionInfo['coinType']
        let updatedFilter = {}

        updatedFilter[type] =  buyerUserInfo[type] + transactionInfo['coinCount']
        updatedFilter['krw'] = buyerUserInfo['krw'] - transactionInfo['price']

        // 금액확인 : 구매자가 충분한 돈을 가지고 있나.
        if (updatedFilter['krw'] < 0){
            throw new Error(res.json({message: '보유중인 자산이 부족합니다.', status: -1}))

        }else{
            req.user[type] = updatedFilter[type]
            req.user['krw'] = updatedFilter['krw']

            return userCoins.update(updatedFilter, {
                where: {id: buyerUserInfo['id']}
            })
        }

    }).then(() => {
        // 판매자 정보 업데이트(목록에 등록한 사람)
        let updatedFilter = {}

        updatedFilter['krw'] = sellerUserInfo['krw'] + transactionInfo['price']

        return userCoins.update(updatedFilter, {
            where: {id: sellerUserInfo['id']}
        })
    }).then(() => {

        let b = Object.assign({}, transactionInfo)
        let s = Object.assign({}, transactionInfo)

        delete b['id']
        delete s['id']

        b['userId'] = buyerUserInfo['userId']
        b['status'] = 'b'
        return transactionComplete.bulkCreate([
            s, b
        ])
    }).then(() => {
        return transactionWaits.destroy({
            where: {id: transactionInfo['id']}
        })
    }).then(() => {
        res.status(201).json({message: '체결완료', coins: req.user})
    }).catch(err => {
        // return res.status(200).json({message: '보유중인 자산이 부족합니다.', status: -1})
    })
})

router.put('/sell', (req, res) => {
    let userInfo = req.user,
        waitId = req.body.waitId;

    if(!userInfo) return res.status(204).json({})

    let transactionInfo = {},
        buyerUserInfo = {},
        sellerUserInfo = {}

    transactionWaits.findById(waitId, {
        raw: true,
        attributes: [
            'id', 'priceCondition', 'coinType', 'price',
            'coinCount', 'status', 'userId'
        ]
    }).then(result => {
        transactionInfo = result

        return userCoins.findOne({
            where: {userId: userInfo['id']},
            raw: true
        })
    }).then(result => {
        sellerUserInfo = result

        return userCoins.findOne({
            where: {userId: transactionInfo['userId']},
            raw: true
        })
    }).then(result =>{
        buyerUserInfo = result

        let type= transactionInfo['coinType']
        let updatedFilter = {}

        // 판매자 정보 업데이트(버튼 누른 사람)
        updatedFilter[type] =  sellerUserInfo[type] - transactionInfo['coinCount']
        updatedFilter['krw'] = sellerUserInfo['krw'] + transactionInfo['price']

        // 코인확인 : 판매자가 충분한 코인을 가지고 있나
        if (updatedFilter[type] < 0){
            throw new Error(res.json({message: '보유중인 자산이 부족합니다.', status: -1}))
        }else{
            req.user['krw'] = updatedFilter['krw']
            req.user[type] = updatedFilter[type]

            return userCoins.update(updatedFilter, {
                where: {id: sellerUserInfo['id']}
            })
        }

    }).then(result => {

        let type= transactionInfo['coinType']
        let updatedFilter = {}

        // 구매자 정보 업데이트(대기 목록에 등록한 사람)
        updatedFilter[type] =  buyerUserInfo[type] + transactionInfo['coinCount']

        return userCoins.update(updatedFilter, {
            where: {id: buyerUserInfo['id']}
        })
    }).then((result) => {

        let b = Object.assign({}, transactionInfo)
        let s = Object.assign({}, transactionInfo)

        delete b['id']
        delete s['id']

        s['userId'] = sellerUserInfo['userId']
        s['status'] = 's'
        return transactionComplete.bulkCreate([
            s, b
        ])
    }).then(() => {
        return transactionWaits.destroy({
            where: {id: transactionInfo['id']}
        })
    }).then(() => {

        res.status(201).json({message: '체결완료', coins: req.user})

    }).catch(err => {
        console.log('=====error=====')
        return
    })
})

module.exports = router;
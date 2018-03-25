/**
 * Created by bagjeongtae on 2018. 2. 4..
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {users, userCoins} = require('../../models')

router.get('/signin/success', (req, res) => {
    // 로그인 성공
    console.log(req.user)
    res.status(200).json({coin:req.user})
})
router.get('/signin/fail', (req, res) => {
    // 로그인 실패
    res.status(204).json({})
})

router.post('/signin',
    passport.authenticate('local',{
        successRedirect: '/api/v1.0/users/signin/success',
        failureRedirect: '/api/v1.0/users/signin/fail'}
        )
)

router.post('/signup', (req, res) => {
    // 회원가입
    let id = req.body.username,
        pw = req.body.password,
        price = req.body.price;

    users.findOrCreate({
        where: {username: id},
        defaults: {username: id, password: pw}
    }).spread((createdUser, isCreated) => {
        if(isCreated === true){
            userCoins.create({
                userId: createdUser.id,
                krw: price
            }).then(() => {
                res.status(201).json({message: '회원가입 완료'})
            })
        }else{
            res.status(200).json({message: '계정이 이미 있습니다'})
        }
    })
})

router.get('/signout', (req, res) => {
    //로그아웃
    req.logout()
    res.status(200).json({})
})

router.get('/sign/check', (req, res) => {
    if(req.user){
        res.status(200).json({coin:req.user})
    }else{
        res.status(204).json()
    }
})

router.get('/coin', (req, res) => {
    if(!req.user){
        return res.status(204).json({
            BTC: 0,
            ETH: 0,
            DASH: 0,
            LTC: 0,
            ETC: 0,
            XRP: 0,
            BCH: 0,
            XMR: 0,
            ZEC: 0,
            QTUM: 0,
            BTG: 0,
            EOS: 0
        })
    }
    userCoins.findById(req.user['id'], {
        raw: true,
        attributes: ['BTC', 'ETH', 'DASH', 'LTC', 'ETC', 'XRP', 'BCH', 'XMR', 'ZEC', 'QTUM', 'BTG', 'EOS',]
    }).then(result => {
        res.json(result)
    })
})
module.exports = router;

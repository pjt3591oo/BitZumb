/**
 * Created by bagjeongtae on 2017. 12. 23..
 */
const express = require('express');
const router = express.Router();

const request = require('request');

router.get('/', function(req, res){
    // 현재 코인시세
    let timestamp = Date.now();
    let url = `https://www.bithumb.com/resources/csv/total_ticker.json?csrf_xcoin_name=552b1df8e0cd3959aeb7bf63464ca421&_=${timestamp}`;
    console.log(timestamp)
    request(url, (err, response, body) => {
        console.log(err)
        res.json(body);
    });
});

router.get('/history', function(req, res){
    // 그래프용 데이터
    let cate = req.query.cate;
    let timestamp = Date.now();

    let baseUrl = `https://www.bithumb.com/resources/csv/${cate}?key=${timestamp}`;

    request(baseUrl, (err, response, body) => {
        res.json(body);
    });
})

module.exports = router;

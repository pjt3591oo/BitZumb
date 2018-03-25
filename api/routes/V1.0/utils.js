/**
 * Created by bagjeongtae on 2018. 2. 18..
 */
const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/hangang', (req, res) => {
    let url = `http://hangang.dkserver.wo.tc`;

    request(url, (err, response, body) => {
        res.json(body);
    });
})

module.exports = router;
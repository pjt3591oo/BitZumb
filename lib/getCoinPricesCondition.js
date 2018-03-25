/**
 * Created by bagjeongtae on 2018. 2. 22..
 */

import axios from 'axios'

async function getCoinPrices() {
    let timestamp = Date.now();

    let url = `http://localhost:3000/api/v1.0/coin`;

    let coins = await axios.get(url);

    coins = JSON.parse(coins.data);

    let coinsCate = Object.keys(coins);
    let r = {};

    coinsCate.map(item => {

        let sum = 0 ;
        let validCount = 0;

        coins[item].map( otherExchange => {
            if( otherExchange.data.last){
                sum += parseFloat(otherExchange.data.last);
                validCount += 1
            }
        });

        r[item] = parseFloat(sum/validCount);
    });
    let d = new Date(timestamp);

    return {...r,
        coinsCate: coinsCate,
        timestamp: d.getFullYear().toString() + '년 '
                    + (parseInt(d.getMonth()) +1).toString() + '월 '
                    + d.getDate().toString() + '일 '
                    + d.getHours().toString() + '시 '
                    + d.getMinutes().toString() + '분 '
                    + d.getSeconds().toString() + '초 '
    };
}

export default getCoinPrices;
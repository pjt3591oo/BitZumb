<template>
    <div class="coins">
        <p>{{timestamp}}</p>
        <ul class ='coins'>
            <li v-for="type in coinsCate">
                <coins v-bind:type="type" v-bind:click="graphData"></coins>
            </li>
        </ul>

        <div class="graph">

            <h2>{{converter[selectedCoin]}} 그래프</h2>

            <div class="rate">
                <ul class="graph-select">
                    <li>
                        <button>1일</button>
                    </li>
                    <li>
                        <button>1개월</button>
                    </li>
                    <li>
                        <button>3개월</button>
                    </li>

                </ul>
            </div>

            <div id="chart"></div>
        </div>

        <div id="data">
            <div class="complete">
                <h3>거래완료</h3>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td>체결시각</td>
                            <td>1{{converter[selectedCoin]}} 당 가격</td>
                            <td>체결가격</td>
                            <td>{{converter[selectedCoin]}} 거래량</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="wait">
                <h3>판매, 구매 물품</h3>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td>구매/판매</td>
                            <td>1{{converter[selectedCoin]}} 당 가격</td>
                            <td>{{converter[selectedCoin]}} 수량</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import coins from './coins.vue'
import graph from './graph.vue'

export default {

    components: {
        coins,
        graph
    },
    created () {
        console.log('asd')
    },


    async data () {
        let type = 'BTC'
        let buyWaitUrl = `http://localhost:3000/api/v1.0/transaction/buy/histories/wait?coinType=${type}`
        let sellWaitUrl = `http://localhost:3000/api/v1.0/transaction/sell/histories/wait?coinType=${type}`
        let buyCompleteUrl = `http://localhost:3000/api/v1.0/transaction/buy/histories/complete?coinType=${type}`
        let sellCompleteUrl = `http://localhost:3000/api/v1.0/transaction/sell/histories/complete?coinType=${type}`

        let buyWaitData = await axios.get(buyWaitUrl)
        let sellWaitData = await axios.get(sellWaitUrl)
        let buyCompleteData = await axios.get(buyCompleteUrl)
        let sellCompleteData = await axios.get(sellCompleteUrl)

        console.log(buyWaitData.data)
        console.log(sellWaitData.data)
        console.log(buyCompleteData.data)
        console.log(sellCompleteData.data)

        return {
            selectedCoin : 'xcoinTrade_minute.json', // 선택코인

            buyWait: buyWaitData.data,
            sellWait: sellWaitData.data,
            buyComplete: buyCompleteData.data,
            sellComplete: sellCompleteData.data,
        }
    },

    methods: {
        async getData (type) {
            let buyWaitUrl = `http://localhost:3000/api/v1.0/transaction/buy/histories/wait?coinType=${type}`
            let sellWaitUrl = `http://localhost:3000/api/v1.0/transaction/sell/histories/wait?coinType=${type}`
            let buyCompleteUrl = `http://localhost:3000/api/v1.0/transaction/buy/histories/complete?coinType=${type}`
            let sellCompleteUrl = `http://localhost:3000/api/v1.0/transaction/sell/histories/complete?coinType=${type}`

            let buyWaitData = await axios.get(buyWaitUrl)
            let sellWaitData = await axios.get(sellWaitUrl)
            let buyCompleteData = await axios.get(buyCompleteUrl)
            let sellCompleteData = await axios.get(sellCompleteUrl)

            console.log(buyWaitData)
            console.log(sellWaitData)
            console.log(buyCompleteData)
            console.log(sellCompleteData)

            return {
                buyWait: buyWaitData,
                sellWait: sellWaitData,
                buyComplete: buyCompleteData,
                sellComplete: sellCompleteData,
            }
        },

        async getCoinPrices() {
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
        },

        async graphData(cate) {
            this.selectedCoin = cate;
            let url = `http://localhost:3000/api/v1.0/coin/history?cate=${cate}`;
            let graphData = await axios.get(url);

            let history = JSON.parse(graphData.data);

            let historyDate = [];
            let price = [];

            history.map(item => {
                let coinDate = new Date(item[0]);
                let now = new Date(Date.now())

                if(now.getFullYear() == coinDate.getFullYear() && now.getMonth() == coinDate.getMonth()){
                    historyDate.push(coinDate);
                    price.push(item[2])
                }
            });

            c3.generate({
                bindto: '#chart',
                data:{
                    json:{
                        date: historyDate,
                        data1: price,
                    },
                    x: 'date',
                    type: 'line',
                },
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                },
                axis: {
                    x: {
                        tick: {
                            format: function(d) {
                                let converted = new Date(d);
                                let y = converted.getFullYear();
                                let m = parseInt(converted.getMonth()) + 1;
                                let dd = converted.getDate();
                                let da = y + '-' + m  + '-' + dd;
                                return da
                            }
                        }
                    }
                }
            });

        }
    },

    computed: mapState([
        'timestamp',
        'coins',
        'coinsCate',
        'converter'
    ]),

    created () {
        let self = this;

        setInterval(async function(){
            let data = await self.getCoinPrices();
            self.$store.commit('coinPriceUpdate', data);
        }, 3000)
    },

    async mounted () {
        let data = await this.getCoinPrices();
        this.$store.commit('coinPriceUpdate', data);
        this.graphData('xcoinTrade_minute.json')
    },

    head: {
        script: [
          { src: 'https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.js' },
          { src: 'https://d3js.org/d3.v3.min.js' }
        ],
        link: [
          { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.18/c3.min.css' }
        ]
      }
}
</script>


<style scoped>
    ul {
        width: 100%;
        margin: 0;
        padding:0;
    }
    ul.coins li{
        margin: auto;
        list-style-type: none;
        width: 100%;
        display: inline-block;
        border : 1px solid;
        padding: 5px;
        cursor: pointer;
    }

    ul.graph-select{
        text-align: right;
    }

    ul.graph-select li{
        display: inline-block;
        margin-right: 10px;
    }

    ul.graph-select li button{
        width: 125px;
        height: 36px;
        border-radius: 5px;
        padding: 10px;
        cursor: pointer;
    }

    ul.graph-select li button:hover{
        background-color: gray;
        color: #fff;
    }

    ul li:hover{
        background-color: #a7b8c8;
    }

    #chart{
        margin-top: 10px;
    }

    #data{
        width:100%
    }
    #data .complete,
    #data .wait{
        width: 50%;
        display: inline-block;
        font-size: 12px;
    }
</style>
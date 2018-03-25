<template>
    <div>
        <div class="coins">
            <p class="timestamp">{{timestamp}}</p>
            <ul class ='coins'>
                <li class="coin-items-title-list">
                    <div class="coin-items-title">
                        <div>코인</div>
                        <div>실시간시세</div>
                        <!--<div>변동률(%)</div>-->
                        <div class="r">구매/판매</div>
                    </div>
                </li>
                <li class='coin' v-for="type in coinsCate">
                    <!--<coins v-bind:type="type" v-bind:click="graphData"></coins>-->
                    <coins v-bind:type="type" v-bind:click="changeCoin"></coins>
                </li>
            </ul>

            <div class="graph">
                <div id="stock-graph"></div>
            </div>

            <div id="data">
                <div class="complete">
                    <h3>거래완료</h3>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <th>체결시각</th>
                                <th>1{{converter[selectedCoin]}} 당 가격</th>
                                <th>체결가격</th>
                                <th>{{converter[selectedCoin]}} 거래량</th>
                            </tr>
                            <tr v-for="data in completeData">
                                <td>{{data['createdAt']}}</td>
                                <td>{{data['priceCondition']}}</td>
                                <td>{{data['price']}}</td>
                                <td>{{data['coinCount']}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="wait">
                    <h3>판매, 구매 물품</h3>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <th>구매/판매</th>
                                <th>1{{converter[selectedCoin]}} 당 가격</th>
                                <th>{{converter[selectedCoin]}} 수량</th>
                            </tr>

                            <tr class="buy" v-for="data in buyWaitData">
                                <td>구매</td>
                                <td>{{data['priceCondition']}}</td>
                                <td>{{data['coinCount']}}</td>
                            </tr>
                            <tr class="sell" v-for="data in sellWaitData">
                                <td>판매</td>
                                <td>{{data['priceCondition']}}</td>
                                <td>{{data['coinCount']}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import coins from '../components/virtuals/coins.vue'
import graph from '../components/virtuals/graph.vue'
import getCoinPricesCondition from '../lib/getCoinPricesCondition'

export default {

    components: {
        coins,
        graph
    },
    async asyncData () {
        let type = 'BTC'
        let buyWaitUrl = `http://localhost:3000/api/v1.0/transaction/buy/histories/wait/blank?coinType=${type}`
        let sellWaitUrl = `http://localhost:3000/api/v1.0/transaction/sell/histories/wait/blank?coinType=${type}`
        let completeUrl = `http://localhost:3000/api/v1.0/transaction/complete/blank?coinType=${type}`

        let buyWaitData = await axios.get(buyWaitUrl)
        let sellWaitData = await axios.get(sellWaitUrl)
        let completeData = await axios.get(completeUrl)

        return {
            buyWaitData: buyWaitData.data,
            sellWaitData: sellWaitData.data,
            completeData: completeData.data,
        }
    },

    data () {
        return {
            selectedCoin : 'xcoinTrade_minute.json', // 선택코인
        }
    },

    methods: {
        async getData (type) {
            let buyWaitUrl = `http://localhost:3000/api/v1.0/transaction/buy/histories/wait/blank?coinType=${type}`
            let sellWaitUrl = `http://localhost:3000/api/v1.0/transaction/sell/histories/wait/blank?coinType=${type}`
            let completeUrl = `http://localhost:3000/api/v1.0/transaction/complete/blank?coinType=${type}`

            let buyWaitData = await axios.get(buyWaitUrl)
            let sellWaitData = await axios.get(sellWaitUrl)
            let completeData = await axios.get(completeUrl)

            return {
                buyWaitData: buyWaitData,
                sellWaitData: sellWaitData,
                completeData: completeData,
            }
        },

        async changeCoin(cate) {
            this.selectedCoin = cate;
            let {buyWaitData, sellWaitData, completeData} = await this.getData(this.converterEn[cate]);

            this.buyWaitData = buyWaitData.data
            this.sellWaitData = sellWaitData.data
            this.completeData = completeData.data

            this.graphData(cate)
        },
        async graphData(cate) {
            this.selectedCoin = cate;

            let url = `http://localhost:3000/api/v1.0/coin/history?cate=${cate}`;
            let graphData = await axios.get(url);
            let history = JSON.parse(graphData.data);

            Highcharts.stockChart('stock-graph', {
                rangeSelector: {
                    selected: 1
                },

                title: {
                    text: this.converter[this.selectedCoin]
                },

                series: [{
                    name: this.converter[this.selectedCoin],
                    data: history,
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });
        }
    },

    computed: mapState([
        'timestamp',
        'coins',
        'coinsCate',
        'converter',
        'converterEn'
    ]),

    created () {
        let self = this;

        setInterval(async function(){
            let data = await getCoinPricesCondition();
            self.$store.commit('coinPriceUpdate', data);
        }, 80000)
    },

    async mounted () {
        let data = await getCoinPricesCondition();
        this.$store.commit('coinPriceUpdate', data);
        this.graphData('xcoinTrade_minute.json')
    },
    head: {
        script: [
          { src: 'https://code.jquery.com/jquery-3.1.1.min.js' },
          { src: 'https://code.highcharts.com/stock/highstock.js' },
          { src: 'https://code.highcharts.com/stock/modules/exporting.js' },
        ]
      }
}
</script>


<style scoped>
    ul {
        width: 100%;
        margin: 0;
        padding:10px;

    }
    p.timestamp{
        padding: 10px;
    }
    .coin-items-title-list{
        width: 100%;
        background-color: #eeeeee;
    }
    .coin-items-title div{
        width: 33%;
        display: inline-block;
        padding-left: 20px;
        font-weight: 900;
    }
    .coin-items-title div.r{
        text-align: right;
        padding-right: 20px;
    }
    ul.coins li{
        margin: auto;
        list-style-type: none;
        width: 100%;
        display: inline-block;
        border : 1px solid #c2c2c2;
        padding: 5px;
        height: 36px;
    }
    ul.coins li.coin{
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

    ul li.coin:hover{
        background-color: #a7b8c8;
    }

    .graph{
        margin-top: 50px;
    }

    #data{
        width:800px
    }
    #data .complete,
    #data .wait{
        /*width: 450px;*/
        /*display: inline-block;*/
        font-size: 14px;
    }
    #data .complete th,
    #data .wait th{
        vertical-align: middle;
    }
    #data .complete td,
    #data .wait td{
        font-size: 14px;
        vertical-align: middle;
    }

    #data .wait .buy{
        color: #FF720D;
    }
    #data .wait .sell{
        color: #6A90AD;
    }
</style>
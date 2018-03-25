<template>
  <v-app id="inspire">
      <v-content>
        <v-container>
            <h1>{{type}} 구매하기 </h1>
            <div class="tab">
                <nuxt-link :to="{ path: '/transaction/' + type + '/buy'}">
                    <button class="buy">구매</button>
                </nuxt-link>

                <span> / </span>
                <nuxt-link :to="{ path: '/transaction/'  + type + '/sell'}">
                    <button class="sell">판매</button>
                </nuxt-link>
            </div>

            <section>
                <div class="calc">
                    <div class="bottom">
                        <h3>사용가능 : {{userKrwPrice}}원</h3>
                    </div>

                    <div class="bottom">
                        <h3>주문가격 : {{currentPriceCondition}}</h3>
                    </div>

                    <v-flex class="e4">
                      <v-slider  class="e4" :max="userKrwPrice" v-model="buyPrice"></v-slider>
                    </v-flex>

                    <div class="bottom buy">
                        <h3> 주문수량 : <input type="text" v-model="transactionCoinCount" disabled> <button @click="maxPrice">최대수량</button> </h3>
                    </div>

                    <div class="bottom">
                        <h3> 구매금액 : {{buyPrice}}원</h3>
                    </div>
                </div>

                <priceConditionList
                    :buiesPriceConditions="priceConditions.buies"
                    :sellsPriceConditions="priceConditions.sells"
                ></priceConditionList>
            </section>

            <div class="transaction">
                <button class="buy" @click="buyTransaction">구매</button>
            </div>

            <div class="history">
                <h3>거래내역</h3>
                <div class="tab">
                    <button :class="{ active: isHistoryWait }" @click="getHistoryWait">대기주문</button>
                    <button :class="{ active: isHistoryComplete}" @click="getHistoryComplete">완료주문</button>
                </div>

                <div class="list">
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>거래체결일자</td>
                                <td>체결수량</td>
                                <td>체결가격</td>
                                <td>체결금액</td>
                                <td>코인</td>
                                <td>상태</td>
                            </tr>
                            <tr v-for="history in buyHistories">
                                <td>{{history['createdAt']}}</td>
                                <td>{{history['coinCount']}}</td>
                                <td>{{history['priceCondition']}}</td>
                                <td>{{history['price']}}</td>
                                <td>{{history['coinType']}}</td>
                                <td v-if="isHistoryWait">대기</td>
                                <td v-if="isHistoryComplete">완료</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import priceConditionList from '../../../components/priceConditionList.vue'
import getCoinPricesCondition from '../../../lib/getCoinPricesCondition'

export default {
    components: {
        priceConditionList
    },
    validate({ params }) {
        return true;
    },

    computed: mapState([
        'coins',
        'user'
    ]),

    data () {
        return {
            type : this.$route.params.type,
            currentPriceCondition: 0,  // 해당 코인 현재시세
            userKrwPrice: 0,           // 사용가능 원화
            transactionCoinCount : 0,  // 주문수량
            buyPrice: 0,               // 구매금액

            isHistoryWait: true,      // 거래내역 - 대기주문 선택했는지
            isHistoryComplete: false, // 거래내역 - 대기주문 선택했는지

            buyHistories:  [],
            priceConditions: []
        }
    },

    async fetch ({ req,  isServer, store, params}) {
        if (isServer && req.user) {
            store.commit('userCoinUpdate', req.user);
        }
        let coinPriceCondition = await getCoinPricesCondition()
        store.commit('coinPriceUpdate', coinPriceCondition);
    },

    async mounted () {
        this.currentPriceCondition = this.coins[this.type]
        this.userKrwPrice = this.user['coin']['krw']

        let url = `http://localhost:3000/api/v1.0/transaction/histories?coinType=${this.type}`
        let priceConditions = await axios.get(url)

        this.priceConditions = priceConditions.data

        let buyHistoriesUrl = `http://localhost:3000/api/v1.0/transaction/buy/histories/wait?coinType=${this.type}`
        let buyHistories = await axios.get(buyHistoriesUrl)

       this.buyHistories = buyHistories.data
    },
    methods: {

        maxPrice () {
            this.transactionCoinCount = this.userKrwPrice / this.currentPriceCondition
            this.buyPrice = this.userKrwPrice
        },

        async buyTransaction () {
            let url = 'http://localhost:3000/api/v1.0/transaction/buy/wait'

            let data = await axios.put(url, data={
                type: this.type,
                currentPriceCondition: this.currentPriceCondition,
                transactionCoinCount: parseFloat(this.transactionCoinCount),
                buyPrice: this.buyPrice
            })

            if(data.status == 204) {
                alert('로그인이 필요한 서비스 입니다.')
                this.$nuxt.$router.replace({ path: '/sign/in'})
            } else {
                this.$store.commit('userCoinUpdate', data.data);
                alert('구매등록 완료')
                this.$nuxt.$router.replace({ path: '/' })
            }
        },

        async getHistoryWait () {
            let url = `http://localhost:3000/api/v1.0/transaction/buy/histories/wait?coinType=${this.type}`
            let data = await axios.get(url)
            this.isHistoryWait = true
            this.isHistoryComplete = false
            this.buyHistories= data.data
        },

        async getHistoryComplete () {
            let url = `http://localhost:3000/api/v1.0/transaction/buy/histories/complete?coinType=${this.type}`
            let data = await axios.get(url)
            this.isHistoryWait = false
            this.isHistoryComplete = true
            this.buyHistories= data.data
        }
    },

    watch: {
        transactionCoinCount : function (d) {
            this.buyPrice = this.currentPriceCondition * d
        },
        buyPrice : function(d) {
            this.transactionCoinCount = d / this.currentPriceCondition
        }
    }
}
</script>


<style scoped>
    button.buy{
        background-color: #FF720D;
        color: white;
    }
    button{
        border-radius: 5px;
        border: 0;
    }

    section div{
        display: inline-block;
        vertical-align: top;
    }
    section{
        width: 800px;
    }

    .tab{
        width: 400px;
    }

    .tab a button{
        width: 190px;
        height: 36px;
    }

    .tab a button.active{
        background-color: #fff;
    }

    priceConditionList,
    .calc,
    .transaction {
        width: 400px;
    }
    .bottom{
        width: 400px;
        padding: 7px;
        border-bottom: 1px solid #8a8a8a;
    }
    .buy input{
        width: 40%;
        display: inline-block;
    }
    .buy button{
        display: inline-block;
        width: auto;
    }
    .transaction{
        padding: 8px;
        text-align: center;
    }
    .transaction button.buy{
        height: 36px;
        width: 80%;
    }

    .list table td{
        height: 32px;
    }

    .history{
        width: 100%;
    }
    .history h3{
        color: #FF720D;
    }

    .history .tab button{
        padding: 5px;
        border: 1px solid #a8a8a8;
        background-color: white;
    }
    .history .tab button.active{
        background-color: #a8a8a8;
    }

    .e4{
        width: 400px;
        margin: auto;
    }

</style>
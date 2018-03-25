<template>
  <v-app id="inspire">
      <v-content>
        <v-container  >
            <h1>{{type}} 판매하기</h1>
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
                        <h3>사용가능 : {{userCoinCount}} {{type}}</h3>
                    </div>

                    <div class="bottom">
                        <h3>판매가격 : {{currentPriceCondition}}</h3>
                    </div>

                    <v-flex class="e4">
                      <v-slider  class="e4" :max="userCoinCount" v-model="transactionCoinCount"></v-slider>
                    </v-flex>

                    <div class="bottom sell">
                        <h3> 판매수량 : <input type="text" v-model="transactionCoinCount" disabled> <button @click="maxCoin">최대수량</button> </h3>
                    </div>

                    <div class="bottom">
                        <h3> 판매금액 : {{sellPrice}}원</h3>
                    </div>
                </div>

                <priceConditionList
                    :buiesPriceConditions="priceConditions.buies"
                    :sellsPriceConditions="priceConditions.sells"
                ></priceConditionList>
            </section>

            <div class="transaction">
                <button class="sell" @click="sellTransaction">판매</button>
            </div>

            <div class="history">
                <h3>거래내역</h3>
                <div class="tab">
                    <button :class="{ active: isHistoryWait }" @click="getHistoryWait">대기주문</button>
                    <button :class="{ active: isHistoryComplete }" @click="getHistoryComplete">완료주문</button>
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
                            <tr v-for="history in sellHistories">
                                <td>{{history['createdAt']}}</td>
                                <td>{{history['coinCount']}}</td>
                                <td>{{history['priceCondition']}}</td>
                                <td>{{history['coinType']}}</td>
                                <td>{{history['price']}}</td>
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
    async mounted () {
        this.currentPriceCondition = this.coins[this.type]
        this.userCoinCount= this.user['coin'][this.type]

        let priceConditionsUrl = `http://localhost:3000/api/v1.0/transaction/histories?coinType=${this.type}`
        let priceConditions = await axios.get(priceConditionsUrl)

        this.priceConditions = priceConditions.data

        let url = `http://localhost:3000/api/v1.0/transaction/sell/histories/wait?coinType=${this.type}`
        let data = await axios.get(url)
        this.sellHistories= data.data
    },

    async fetch ({ req,  isServer, store, params}) {
        if (isServer && req.user) {
            store.commit('userCoinUpdate', req.user);
        }
        let coinPriceCondition = await getCoinPricesCondition()
        store.commit('coinPriceUpdate', coinPriceCondition);
    },

    data () {
        return {
            type : this.$route.params.type,
            userCoinCount: 0,
            currentPriceCondition: 0,
            transactionCoinCount: 0,
            sellPrice: 0,

            isHistoryWait: true,      // 거래내역 - 대기주문 선택했는지
            isHistoryComplete: false, // 거래내역 - 대기주문 선택했는지

            sellHistories: [],
            priceConditions: [],
        }
    },
    methods: {
        maxCoin () {
            this.sellPrice = this.currentPriceCondition * this.userCoinCount
            this.transactionCoinCount = this.userCoinCount
        },
        async sellTransaction () {
            let url = 'http://localhost:3000/api/v1.0/transaction/sell/wait'

            let data = await axios.put(url, data={
                type: this.type,
                currentPriceCondition: this.currentPriceCondition,
                transactionCoinCount: this.transactionCoinCount,
                sellPrice: this.sellPrice
            })

            if (data.status == 204) {
                alert('로그인이 필요한 서비스 입니다.')
                this.$nuxt.$router.replace({ path: '/sign/in'})
            } else {
                this.$store.commit('userCoinUpdate', data.data);
                alert('판매등록 완료')
                this.$nuxt.$router.replace({ path: '/'})
            }
        },

        async getHistoryWait () {
            let url = `http://localhost:3000/api/v1.0/transaction/sell/histories/wait?coinType=${this.type}`
            let data = await axios.get(url)

            this.isHistoryWait = true
            this.isHistoryComplete = false

            this.sellHistories= data.data
        },

        async getHistoryComplete () {
            let url = `http://localhost:3000/api/v1.0/transaction/sell/histories/complete?coinType=${this.type}`
            let data = await axios.get(url)

            this.isHistoryWait = false
            this.isHistoryComplete = true

            this.sellHistories= data.data
        }
    },
    watch : {
        transactionCoinCount: function (d) {
            this.sellPrice = d * this.currentPriceCondition
        }
    }
}
</script>


<style scoped>
    button.sell{
        background-color: #6A90AD;
        color: white;
    }
    button{
        border-radius: 5px;
        border: 0;
    }
    section{
        width: 800px;
    }
    section div{
        display: inline-block;
        vertical-align: top;
    }

    .tab{
        width: 400px;
    }

    .tab a button{
        width: 190px;
        height: 36px;
    }

    .calc,
    .transaction{
        width: 400px;
    }
    .bottom{
        width: 400px;
        padding: 7px;
        border-bottom: 1px solid #8a8a8a;
    }
    .sell input{
        width: 40%;
        display: inline-block;
    }
    .sell button{
        display: inline-block;
        width: auto;
    }
    .transaction{
        padding: 8px;
        text-align: center;
    }
    .transaction button.sell{
        height: 36px;
        width: 80%;
    }
    .history{
        width: 100%;
    }
    .history h3{
        color: #6A90AD;
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
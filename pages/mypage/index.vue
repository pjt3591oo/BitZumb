<template>
    <div>
        <div class="wallet">

            <div class="title">
                <h4>아무 생각없이 구매하기</h4>
            </div>

            <div class="cards">
                <!--coinName: 코인명(영), coinCount: 코인갯수, krwPrice: 원화환전 금액-->
                <div class="coin-card" v-for="(c, key) in user.coin" v-if="key != 'krw'">
                    <card class="card"
                        :coinName="key"
                        :coinCount="c"
                        :krwPrice="(coins[key] || 1) * c"
                    ></card>
                </div>
            </div>

            <div class="title">
                <h4>한강 조사</h4>
            </div>

            <hangang></hangang>

            <div class="title">
                <h4>차트보고 분석하는 척하고 구매하기</h4>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import card from '../../components/card.vue'
import hangang from '../../components/hangang.vue'
import getCoinPricesCondition from '../../lib/getCoinPricesCondition'

export default {
    computed: {
        ...mapState([
            'coins',
            'converterKr',
            'user'
        ])
    },
    async fetch({store, params, isServer, req}) {
        let data = await getCoinPricesCondition();
        store.commit('coinPriceUpdate', data);
        if(isServer && req.user){
            store.commit('userCoinUpdate', req.user);
        }
    },

    middleware: 'loginCheck',
    components: {
        card,
        hangang
    }
}
</script>


<style scoped>
    .title,
    .cards,
    .hangang,
    .title{
        width: 100%;
        margin-top: 20px;
        text-align: center;
        color: #000;
        font-weight: 900;
    }

    .cards{
        padding: 10px;
        margin: auto;
    }
    .coin-card{
        padding: 20px;
        width: 100%;
        display: inline-block;
    }
    .card{
        border-radius: 5px;
        text-align: center;
    }

    @media (min-width: 580px) {
        .coin-card{
            width: 50%;
        }
    }
    @media (min-width: 960px) {
        .coin-card{
            width: 33%;
        }
    }
</style>   
<template>
    <div class="card">
        <div class="title" :class="coinName">
            <h3 class="name">{{coinName}}</h3>
        </div>
        <div class="explain">
            <h6 class="price">{{krwPrice}} 원</h6>
            <h5 class="coin-count">{{coinCount}} {{converterKr[coinName]}}</h5>
            <nuxt-link :to="{ path: '/transaction/waits?type=' + coinName}"><button class="btn-buy" :class="coinName">구매하기</button></nuxt-link>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
      ...mapState([
          'converterKr'
      ])
  },
  props: {
        coinName: {
            type: String
        },
        coinCount: {
            type: Number
        },
        krwPrice: {
            type: Number
        }
  }
}
</script>


<style scoped>
    h1, h2, h3, h4, h5, h6{
        margin: 0;
    }

    .card{
        height: 220px;
        background-color: #fff;
    }


    .title{
        background-color: #000;
        color: #fff;
        padding: 7px;
    }
    .explain{
        padding: 30px;
    }


    .price{
        color: #9d9d9d;
    }
    .coin-count{
        margin-top: 10px;
    }
    button.btn-buy{
        margin-top: 40px;
        border-radius: 5px;
        width:130px;
        height: 36px;
        color: white;
        bottom: 20px;
        /*background-color: #000;*/
    }

    .BTC{
        background-color: #fea34a;
    }
    .ETH{
        background-color: #4acabd;
    }
    .DASH{
        background-color: #6bb1ed;
    }
    .LTC{
        background-color: #fea34a;
    }
    .ETC{
        background-color: #4acabd;
    }
    .XRP{
        background-color: #6bb1ed;
    }
    .BCH{
        background-color: #fea34a;
    }
    .XMR{
        background-color: #4acabd;
    }
    .ZEC{
        background-color: #6bb1ed;
    }
    .QTUM{
        background-color: #fea34a;
    }
    .BTG{
        background-color: #4acabd;
    }
    .EOS{
        background-color: #6bb1ed;
    }


</style>   
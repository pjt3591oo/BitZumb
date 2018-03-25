<template>
    <div class="coin-items">
        <div v-on:click="click(history[type])"><img :src="'/coin/' + coinImg[type]" class="coin" alt=""> {{converterKr[type]}}  </div>
        <div>${{coins[type].toLocaleString()}} </div>
        <!--<div> </div>-->

        <div class="r">

            <nuxt-link :to="{ path: '/transaction/'  + type + '/buy'}">
                <button class="buy">구매</button>
            </nuxt-link>

            <span> &nbsp; </span>
            <nuxt-link :to="{ path: '/transaction/'  + type + '/sell'}">
                <button class="sell">판매</button>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mapState} from 'vuex'

    export default {
        props: {
            type: {
                type: String
            },
            click: {
                type: Function
            }
        },
        computed: mapState([
            'timestamp',
            'coins',
            'coinsCate',
            'history',
            'coinImg',
            'converterKr'
        ]),
    }
</script>


<style scoped>
    img.coin{
        width: 20px;
        height: 20px;
        margin-right: 5px;
        margin-left: 10px;
    }
    .coin-items{
        width: 100%;
    }
    .coin-items div{
        width: 33%;
        display: inline-block;
    }
    .coin-items div.r{
        text-align: right;
        padding-right: 10px;
    }
    button.buy{
        padding: 0 5px;
        border: 1px solid #445686;
        color: #445686;
    }

    button.buy:hover{
        background-color: #445686;
        color: #fff;
        cursor: pointer;
    }

    button.sell {
        padding: 0 5px;
        border: 1px solid #af5555;
        color: #af5555;
    }

    button.sell:hover{
        background-color: #af5555;
        color: #fff;
        cursor: pointer;
    }
</style>
<template>
    <v-app id="rank">
        <v-container fluid grid-list-xl>
            <v-layout row wrap >

                <v-flex xs6>
                  <v-select
                    :items="selectedCoins"
                    v-model="selected"
                    label="코인선택"
                    single-line
                    bottom
                  ></v-select>
                </v-flex>

                <v-flex xs12>
                    <h3 class="comment-1">주간 벼락부자</h3>
                    <h5 class="comment-2">(순위는 현재 가치의 원화로 환산하여 측정합니다.)</h5>

                    <table class="table table-bordered">
                        <tbody>
                            <tr class="t">
                                <th>순위</th>
                                <th>이름</th>
                                <th>보유 {{converterKr[selected]}}</th>
                            </tr>
                            <tr v-for="(rank, index) in ranks">
                                <td>{{index + 1}}위</td>
                                <td><img class='gold' src="~/assets/gold.png" alt="">{{rank['user.username']}}</td>
                                <td>{{rank[selected].toLocaleString()}}</td>
                            </tr>
                        </tbody>
                    </table>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState([
            'coins',
            'converterKr'
        ])
    },
    async asyncData () {
        let selectedCoin= 'krw'
        let url = `http://localhost:3000/api/v1.0/ranks?coin=${selectedCoin}`
        let rankData = await axios.get(url)
        console.log(rankData.data)
        return {
            ranks : rankData.data,
            selectedCoins: [],
            selected: selectedCoin
        }
    },
     mounted () {
        this.selectedCoins = Object.keys(this.coins)
        this.selectedCoins = ['krw'].concat(this.selectedCoins)
    },
    watch : {
        selected: async function (selectedCoin) {
            console.log(selectedCoin)
            let url = `http://localhost:3000/api/v1.0/ranks?coin=${selectedCoin}`
            let rankData = await axios.get(url)
            this.ranks = rankData.data
        }
    }
}
</script>


<style scoped>


    .comment-1{
        font-size: 16px;
        font-weight: 900;
        padding: 0;
        margin:0
    }
    .comment-2{
        font-size: 14px;
        padding: 0;
        margin: 5px 0px 0px 0px ;
    }

    table{
        margin-top: 30px;
    }

    .t{
        background-color: #e23d3b;
    }
    th{
        border: 1px solid #e23d3b !important;
        vertical-align: middle !important;
        color: white;
    }
    tr:first-child:hover {
        border: 1px solid #e23d3b !important;
        background-color: #e23d3b  !important;
    }
    td{
        vertical-align: middle !important;
    }
    img.gold{
        width: 24px;
        height: 24px;
    }
</style>
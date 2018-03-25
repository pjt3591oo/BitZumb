<template>
    <v-app id="waits">

      <h2 class="title">빚쩜 거래소에 등록된 매매목록 입니다.</h2>
      <h3 class="desc">원하는 거래를 선택하여 직접매매 할 수 있습니다.</h3>

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
          </v-layout>

          <v-layout row wrap v-bind="binding">

            <v-flex v-for="wait in waits" :key="wait.id">

              <v-card>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{wait.coinType}}</h3>
                    <div>
                      시세 : {{wait.priceCondition}} <br>
                      코인갯수 : {{wait.coinCount}}<br>
                      총가격 : {{wait.price}}  <br>
                    </div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn flat color="light-green darken-2" v-if="wait.status == 'b'" @click="sell(wait.id)">판매</v-btn>
                  <v-btn flat color="orange" v-if="wait.status == 's'" @click="buy(wait.id)">구매</v-btn>
                </v-card-actions>
              </v-card>

            </v-flex>
          </v-layout>
      </v-container>
    </v-app>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
    validate({ params }) {
        return true;
    },
    computed: {
        ...mapState([
            'coins'
        ]),

        binding () {
          const binding = {}

          if (this.$vuetify.breakpoint.mdAndUp) binding.column = false
          return binding
        }
    },

    async asyncData({route}) {
        let selected = route.query.type? route.query.type: '전체보기'
        let coinFilter = {$and: []}
        if( selected == '전체보기' ){
            coinFilter = {}
        } else {
            coinFilter = {coinType: selected}
        }
        let url = `http://localhost:3000/api/v1.0/transaction/waits`
        let data = await axios.post(url, data = {
            coinFilter: coinFilter
        })

        return {
          waits: data.data,
          selected: selected
        }
    },
    data () {
        return {
            selectedCoins: [],
            selected: '전체보기'
        }
    },
    mounted () {
        this.selectedCoins = Object.keys(this.coins)
        this.selectedCoins = ['전체보기'].concat(this.selectedCoins)
    },
    watch: {
        selected: async function(d){
            let coinFilter = {$and: []}
            if(d == '전체보기'){
                coinFilter = {}
            } else {
                coinFilter = {coinType: d}
            }
            console.log(coinFilter)
            let url = 'http://localhost:3000/api/v1.0/transaction/waits'
            let data = await axios.post(url, data = {
                coinFilter: coinFilter
            })

            console.log(data.data)
            this.waits = data.data
        }
    },
    methods: {
        async buy (waitId) {
            let url = `http://localhost:3000/api/v1.0/transaction/buy`
            let data = await axios.put(url, data ={
                waitId: waitId
            })

            if(data.status == 204) {
                alert('로그인이 필요한 서비스 입니다.')
                this.$nuxt.$router.replace({ path: '/sign/in' })
            } else if(data.status == 201){
                this.$store.commit('userCoinUpdate', data.data.coins);
                alert('구매를 완료했습니다.')
                this.$nuxt.$router.replace({ path: '/' })
            }else if(data.data.status == -1){
                alert(data.data.message)
            }
        },
        async sell (waitId) {
            let url = `http://localhost:3000/api/v1.0/transaction/sell`
            let data = await axios.put(url, data ={
                waitId: waitId
            })

            if(data.status == 204) {
                alert('로그인이 필요한 서비스 입니다.')
                this.$nuxt.$router.replace({ path: '/sign/in' })
            } else if(data.status == 201){
                this.$store.commit('userCoinUpdate', data.data.coins);
                alert('판매를 완료했습니다.')
                this.$nuxt.$router.replace({ path: '/' })
            }else if(data.data.status == -1){
                alert(data.data.message)
            }
        }
    }
}

</script>


<style scoped>
    #waits{
        padding: 10px;
    }
    .title{
        padding: 5px;
        font-size: 21px;
        font-weight: 900;
    }
    .desc{
        padding: 5px;
        font-size: 18px;
    }
</style>
<template>
    <div id="hangang">
        <section class="blue-background">
           <div class="wave-overflow">
               <img src="~/assets/hangang/wave2.png" class="wave">
           </div>

            <div class="level-text" v-bind:style="{ bottom: level / 2 + 20 + '%' }">
                <h4>{{message}}!</h4>
            </div>

           <img src="~/assets/hangang/rocket.png" class="person" v-bind:style="{ bottom: level / 2 + 10 + '%', left: level / 2.5 + 20 + '%' }">
           <img src="~/assets/hangang/moon.png" class="moon">
           <img src="~/assets/hangang/ruler.png" class="ruler">
        </section>

    </div>
</template>

<script>
import {mapState} from 'vuex'
import getCoinPricesCondition from '../lib/getCoinPricesCondition'
import getHangangTemp from'../lib/getHangangTemp'

export default {
    computed: mapState([
        'coins',
        'user'
    ]),
    props: ['sumPrice'],

    async mounted () {
        let sum = 0
        Object.keys(this.user['coin']).forEach(type => { // 코인 원화 환전 후 합산
            sum += this.user['coin'][type] * (this.coins[type] || 1 )
        })
        this.level = sum / 100000
        this.level = this.level > 99 ? 100 : this.level // this.level이 100 넘어가면 로켓이 한강 이미지 위로 넘치므로 max 100으로 제한둠
        let a = await getHangangTemp()

        this.hangangTemp = a
    },

    data() {
        return {
            level: 0, // 0 ~ 100
            message: 'Gazua!',
            hangangTemp: 0
        }
    },
    watch: {
        level: function (d) {
            if (d > 80) {
                this.message = 'Gazua'
            } else if (d > 60) {
                this.message = '존버'
            } else {
                this.message = `한강 온도 ${this.hangangTemp}도`
            }
        },
        hangangTemp: function (d) {
            if (this.level > 80) {
                this.message = 'Gazua'
            } else if (this.level > 60) {
                this.message = '존버'
            } else {
                this.message = `한강 온도 ${d}도`
            }
        }
    },
};
</script>


<style scoped>
body {
    margin: 0;
    padding: 0;
}
.blue-background {
    background-color: #23242f;
    width: 100%;
    height: 500px;
    position: relative;
}
.person {
    width: 100px;
    position: absolute;
    z-index: 3;
    /*  bottom 10~60% , left 20~60%  */
    bottom: 10%;
    left: 20%;
}
.moon {
    width: 280px;
    position: absolute;
    top: 10px;
    right: 10%;
    z-index: 2;
}
.wave-overflow {
    position: absolute;
    bottom: -10px;
    z-index: 4;
    width: 100%;
    height: 330px;
    overflow: hidden;
}
.ruler {
    position: absolute;
    width: 50px;
    bottom: 0;
    left: 10%;
    opacity: 0.9;
}
.level-text {
    color: #f8ca4d;
    position: absolute;
    left: 15%;
}
@media screen and (max-width:768px){
    .moon{
        right: 0;
    }
    .ruler{
        left: 0;
    }
    .level-text{
        left: 12%;
    }
}
</style>
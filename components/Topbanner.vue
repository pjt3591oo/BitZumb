<template>
    <div id="Topbanner">
        <div class="left-info">
            <nuxt-link to="/">
                <img src="~assets/logo1.png" alt="" class="logo">
            </nuxt-link>

            <ul class="rank">
                <li class="t">주간 벼락부자</li>
                <li class="user" v-for="(rank, idx) in ranks">{{idx + 1}}. {{rank}}</li>
            </ul>
        </div>

        <div class="right">
            <div class="noice">
                <h6>공지사항: 3/4일 비트코인의 54번째 하드포크가 예정되어있습니다. </h6>
            </div>
            <div class="hangang">
                <span>한강온도 :</span>
                <span class ="temp"> {{hangang}} </span>
                <span>도</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import getHangangTemp from'../lib/getHangangTemp'

export default {
    data () {
        return {
            hangang: 0,
            ranks : [
                'user1',
                'user2',
                'user3'
            ]
        }
    },
    async mounted () {
        this.hangang = await getHangangTemp()

    },
    watch : {
        hangang: function (d){
            return d
        }
    }
}
</script>


<style scoped>
    #Topbanner ul li{
        list-style-type: none;
    }
    #Topbanner{
        width: 100%;
        height: 95px;
        vertical-align: top;
    }
    #Topbanner .left-info,
    #Topbanner .right{
        display: inline-block;
    }
    #Topbanner .right{
        display: none;
    }

    #Topbanner .left-info img.logo{
        vertical-align: top;
        width: 220px;
    }
    #Topbanner .left-info ul.rank {
        display: inline-block;
        margin-left: 5px;
        margin-bottom: 5px;
        vertical-align: bottom;
    }
    #Topbanner .left-info ul.rank li{
        font-size: 12px;
    }
    #Topbanner .left-info ul.rank li.user{
        color: #fea34a;
    }

    #Topbanner .right .noice,
    #Topbanner .right .hangang {
        margin-top:55px;
        display:inline-block !important;
    }

    #Topbanner .hangang{
        font-size: 20px;
        margin-left: 10px;
    }
    #Topbanner .hangang img{
        width: 24px;
        height: 24px;
    }

    #Topbanner .hangang span.temp{
        color: #5584e0;
    }

    @media (min-width: 770px) {
        #Topbanner .right{
            display: block;
        }
    }
</style>   
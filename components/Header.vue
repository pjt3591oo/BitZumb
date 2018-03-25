<template>
    <div id="Header">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
                <nuxt-link class="navbar-brand" to="/" >Home</nuxt-link>
                <nuxt-link class="navbar-brand" to="/rank" >순위</nuxt-link>
                <nuxt-link class="navbar-brand" to="/transaction/waits" >거래소</nuxt-link>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="nav navbar-nav">
                <li class="dropdown" v-if="user.isLogin"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">간편지갑 <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">원화 : {{user.coin.krw}} 원</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">비트코인 : {{user.coin.BTC}} BTC</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">이더리움: {{user.coin.ETH}} ETH</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">대시 : {{user.coin.DASH}} DASH</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">라이트 코인: {{user.coin.LTC}} LTC</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">이더리움 클래식 : {{user.coin.ETC}} ETC</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">리플 : {{user.coin.XRP}} XRP</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">비트코인 캐시 : {{user.coin.BCH}} BCH</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">모네로 : {{user.coin.XMR}} XMR</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">제트코인 : {{user.coin.ZEC}} ZEC</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">퀀텀 : {{user.coin.QTUM}} QTUM</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">비트코인 골드 : {{user.coin.BTG}} BTG</nuxt-link></li>
                        <li><nuxt-link class="wallet-coin-price" to="/mypage">이오스 : {{user.coin.EOS}} EOS</nuxt-link></li>
                </ul> </li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li role="presentation" class=""><nuxt-link to="/sign/in" v-if="!user.isLogin">로그인</nuxt-link></li>
                <li role="presentation" class=""><a v-on:click="signout" v-if="user.isLogin">로그아웃</a></li>
                <li role="presentation" class=""><nuxt-link to="/sign/up" v-if="!user.isLogin">회원가입</nuxt-link></li>
                <li role="presentation" class=""><nuxt-link to="/mypage" v-if="user.isLogin">마이 페이지</nuxt-link></li>
              </ul>
            </div>
          </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'


export default {
    computed: mapState([
        'user'
    ]),

    head () {
        return {
            title: '빚쩜 거래소',
            script: [
                  {src:'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js', type: 'text/javascript'},
                  {src:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', type: 'text/javascript'}
            ],
            link: [
                { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css' },
                { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css' }
            ]
        }
    },

    methods: {
        async signout () {
            await axios.get('http://localhost:3000/api/v1.0/users/signout')
            this.$store.commit('userLogout', {})
            this.$nuxt.$router.replace({ path: '/sign/in' })
        }
    },

    async mounted () {
        let data = await axios.get('http://localhost:3000/api/v1.0/users/sign/check')

        if (data.status == 204) {
            this.$store.commit('userLogout', {})
        } else if (data.status == 200) {
            this.$store.commit('userCoinUpdate', data.data.coin);
        }
    }
}

</script>

<style scoped>

    a{
        cursor: pointer;
        color: #fefffd !important;
    }

    a.wallet-coin-price{
        color: #000 !important;
    }

    .container-fluid{
        background-color: #e23d3b;
        border-radius: 5px;
    }
</style>   
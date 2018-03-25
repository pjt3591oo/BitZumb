<template>
    <div>
        <TopBanner/>
        <Header/>
        <nuxt/>
        <v-footer class="footer" height="auto">
          <v-card
            flat
            tile
            style="background-color: #e23d3b;"
            class="white--text text-xs-center"
          >
            <v-card-title>
              <strong class="subheading white--text">Get connected with us on social networks!</strong>
                <div class="sns">
                      <v-btn
                        v-for="icon in icons"
                        :key="icon"
                        icon
                        :href ='icon.href'
                        class="mx-3 lighten-1 white--text"
                      >
                        <img class="footer-icon" :src="icon.src" alt="">

                      </v-btn>
                </div>

            </v-card-title>
            <v-card-text class="white--text pt-0">
              Welcome to the Mock Exchange. a place where people who want to invest, but are afraid of losing money or losing money, can make direct investments with virtual money.
            </v-card-text>

            <v-card-text class="white--text">
              &copy;2018 — <strong>Mock Exchange</strong>
            </v-card-text>
          </v-card>
        </v-footer>
    </div>

</template>

<script>
import Header from '../components/Header.vue'
import TopBanner from '../components/TopBanner.vue'

export default{
    components: {
        Header,
        TopBanner
    },
    data () {
        return {
            icons: [
                {src: 'https://blog.naver.com/favicon.ico?2', href: 'https://blog.naver.com/pjt3591oo'},
                {src: 'https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon.png?v=c78bd457575a', href: 'https://stackoverflow.com/users/8667760/%EB%A9%8D%EA%B0%9C-mung'},
                {src: 'https://static.xx.fbcdn.net/rsrc.php/yl/r/H3nktOa7ZMg.ico', href: 'https://www.facebook.com/profile.php?id=100003874674961'},
                {src: 'http://codingapple.com/data/common/favicon.ico', href: 'http://codingapple.com/'},
            ],
            rows: [
                {
                    title: 'Company Name',
                    children: ['빚쩜 거래소']
                },
                {
                    title: 'Products',
                    children: ['Express', 'nuxt.js', 'vuetify', 'Bootstrap']
                },
                {
                    title: 'Useful Links',
                    children: ['Your account', 'Become an Affiliate', 'Shipping Rates', 'Helper']
                }
            ]
        }
    }
}
</script>

<style>
    body{
        font-family: 'Nanum Square' !important;
        letter-spacing: -0.5px;
        padding-top: 30px;
        max-width: 900px;
        margin: auto;
        width: 100%;
    }
    img.footer-icon{
       width: 24px;
    }
    .footer{
        margin-top: 20px;
    }
    .sns{
        width:100%;
    }
</style>
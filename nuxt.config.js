module.exports = {
    head: {
        title: '모의거래소',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '빚쩜 거래소' }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
            { rel: 'icon', type: 'image/x-icon', href: '/waterDrop2.ico' }
        ]
    },
    plugins: ['~/plugins/vuetify.js'],
    css: ['~/assets/app.styl', '~/assets/font/NanumSquare/nanumsquare.css'],
    loading: { color: '#e23d3b' },
    build: {
        extractCSS: true,
        vendor: [
            'axios',
            '~/plugins/vuetify.js',
            '~/lib/getCoinPricesCondition.js',
            '~/lib/getHangangTemp.js'
        ]
    },

    // modules: [
    //     '@nuxtjs/axios',
    // ],
    //
    // axios: {
    //     proxyHeaders: true
    // }
};

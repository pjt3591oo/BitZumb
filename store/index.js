/**
 * Created by bagjeongtae on 2017. 12. 13..
 */
import Vuex from 'vuex'

import mutations from './mutations'

const createStore = () => {
    return new Vuex.Store({
        state: {
            timestamp: '',
            coins: { // 코인가격
                BTC: 0,
                ETH: 0,
                DASH: 0,
                LTC: 0,
                ETC: 0,
                XRP: 0,
                BCH: 0,
                XMR: 0,
                ZEC: 0,
                QTUM: 0,
                BTG: 0,
                EOS: 0
            },

            history: {
                BTC: 'xcoinTrade_minute.json',
                ETH: 'xcoinTradeAltcoin_minute.json',
                DASH: 'DASH_xcoinTradeAltcoin_minute.json',
                LTC: 'LTC_xcoinTradeAltcoin_minute.json',
                ETC: 'ETC_xcoinTradeAltcoin_minute.json',
                XRP: 'XRP_xcoinTradeAltcoin_minute.json',
                BCH: 'BCH_xcoinTradeAltcoin_minute.json',
                XMR: 'XMR_xcoinTradeAltcoin_minute.json',
                ZEC: 'ZEC_xcoinTradeAltcoin_minute.json',
                QTUM: 'QTUM_xcoinTradeAltcoin_minute.json',
                BTG: 'BTG_xcoinTradeAltcoin_minute.json',
                EOS: 'EOS_xcoinTradeAltcoin_minute.json',
            },
            converter: {
                'xcoinTrade_minute.json': '비트코인',
                'xcoinTradeAltcoin_minute.json': '이더리움',
                'DASH_xcoinTradeAltcoin_minute.json': '대시코인',
                'LTC_xcoinTradeAltcoin_minute.json': '라이트 코인',
                'ETC_xcoinTradeAltcoin_minute.json': '이더리움 클래식',
                'XRP_xcoinTradeAltcoin_minute.json': '리플',
                'BCH_xcoinTradeAltcoin_minute.json': '비트코인 캐시',
                'XMR_xcoinTradeAltcoin_minute.json': '모네로',
                'ZEC_xcoinTradeAltcoin_minute.json': '제트캐시',
                'QTUM_xcoinTradeAltcoin_minute.json': '퀀텀',
                'BTG_xcoinTradeAltcoin_minute.json': '비트코인 골드',
                'EOS_xcoinTradeAltcoin_minute.json': '이오스',
            },
            converterEn: {
                'xcoinTrade_minute.json': 'BTC',
                'xcoinTradeAltcoin_minute.json': 'ETH',
                'DASH_xcoinTradeAltcoin_minute.json': 'DASH',
                'LTC_xcoinTradeAltcoin_minute.json': 'LTC',
                'ETC_xcoinTradeAltcoin_minute.json': 'ETC',
                'XRP_xcoinTradeAltcoin_minute.json': 'XRP',
                'BCH_xcoinTradeAltcoin_minute.json': 'BCH',
                'XMR_xcoinTradeAltcoin_minute.json': 'XMR',
                'ZEC_xcoinTradeAltcoin_minute.json': 'ZEC',
                'QTUM_xcoinTradeAltcoin_minute.json': 'QTUM',
                'BTG_xcoinTradeAltcoin_minute.json': 'BTG',
                'EOS_xcoinTradeAltcoin_minute.json': 'EOS',
            },
            converterKr: {
                krw: '원화',
                BTC: '비트코인',
                ETH: '이더리움',
                DASH: '대시코인',
                LTC: '라이트 코인',
                ETC: '이더리움 클래식',
                XRP: '리플',
                BCH: '비트코인 캐시',
                XMR: '모네로',
                ZEC: '제트캐시',
                QTUM: '퀀텀',
                BTG: '비트코인 골드',
                EOS: '이오스',
            },
            coinImg: {
                BTC: 'BTC.jpeg',
                ETH: 'ETH.png',
                DASH: 'DASH.png',
                LTC: 'LTC.jpeg',
                ETC: 'ETC.png',
                XRP: 'XRP.jpeg',
                BCH: 'BCH.png',
                XMR: 'XMR.png',
                ZEC: 'ZEC.jpeg',
                QTUM: 'QTUM.png',
                BTG: 'BTG.png',
                EOS: 'EOS.png',
            },
            coinsCate: [],
            user:{
                isLogin: false,
                coin:{
                    BTC: 0.0,
                    ETH: 0.0,
                    DASH: 0.0,
                    LTC: 0.0,
                    ETC: 0.0,
                    XRP: 0.0,
                    BCH: 0.0,
                    XMR: 0.0,
                    ZEC: 0.0,
                    QTUM: 0.0,
                    BTG: 0.0,
                    EOS: 0.0,
                    krw: 0.0
                }
            }
        },
        mutations
    })
}

export default createStore
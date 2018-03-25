/**
 * Created by bagjeongtae on 2017. 12. 13..
 */
const mutations = {
    coinPriceUpdate(state, value){
        state.timestamp = value.timestamp;

        state.coins['BTC'] = value.BTC ? value.BTC.toFixed(4) : 0;
        state.coins['ETH'] = value.ETH ? value.ETH.toFixed(4) : 0;
        state.coins['DASH'] = value.DASH ? value.DASH.toFixed(4) : 0;
        state.coins['LTC'] = value.LTC ? value.LTC.toFixed(4) : 0;
        state.coins['ETC'] = value.ETC ? value.ETC.toFixed(4) : 0;
        state.coins['XRP'] = value.XRP ? value.XRP.toFixed(4) : 0;
        state.coins['BCH'] = value.BCH ? value.BCH.toFixed(4) : 0;
        state.coins['XMR'] = value.XMR ? value.XMR.toFixed(4) : 0;
        state.coins['ZEC'] = value.ZEC ? value.ZEC.toFixed(4) : 0;
        state.coins['QTUM'] = value.QTUM ? value.QTUM.toFixed(4) : 0;
        state.coins['BTG'] = value.BTG ? value.BTG.toFixed(4) : 0;
        state.coins['EOS'] = value.EOS ? value.EOS.toFixed(4) : 0;

        state.coinsCate = value.coinsCate;
    },
    timestampupdate(state, date){
        state.timestamp = date;
    },
    userCoinUpdate(state, value){
        state.user['isLogin'] = true,
        state.user.coin['BTC'] = value['BTC'],
        state.user.coin['ETH'] = value['ETH'],
        state.user.coin['DASH'] = value['DASH'],
        state.user.coin['LTC'] = value['LTC'],
        state.user.coin['ETC'] = value['ETC'],
        state.user.coin['XRP'] = value['XRP'],
        state.user.coin['BCH'] = value['BCH'],
        state.user.coin['XMR'] = value['XMR'],
        state.user.coin['ZEC'] = value['ZEC'],
        state.user.coin['QTUM'] = value['QTUM'],
        state.user.coin['BTG'] = value['BTG'],
        state.user.coin['EOS'] = value['EOS']
        state.user.coin['krw'] = value['krw']
    },
    userLogout(state, value){
        state.user['isLogin'] = false,
        state.user.coin['BTC'] = 0.0,
        state.user.coin['ETH'] = 0.0,
        state.user.coin['DASH'] = 0.0,
        state.user.coin['LTC'] = 0.0,
        state.user.coin['ETC'] = 0.0,
        state.user.coin['XRP'] = 0.0,
        state.user.coin['BCH'] = 0.0,
        state.user.coin['XMR'] = 0.0,
        state.user.coin['ZEC'] = 0.0,
        state.user.coin['QTUM'] = 0.0,
        state.user.coin['BTG'] = 0.0,
        state.user.coin['EOS'] = 0.0
        state.user.coin['krw'] = 0.0
    }
}

export default mutations
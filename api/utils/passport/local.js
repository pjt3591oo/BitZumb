/**
 * Created by bagjeongtae on 2017. 12. 29..
 */
const LocalStrategy = require('passport-local').Strategy;

const {users, userCoins} = require('../../models');
const crypto = require('crypto');

module.exports = new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }
    ,function(req, id, password, done) {
      if(!id || !password) return done(null, false);

      users.findOne({
        where: {username: id},
        raw: true
      }).then( result => {
        console.log(result)
        if(!result){ done(null, false)}
        else{

            users.findOne({
                raw: true,
                where: {username: id},
                include: [
                    {
                        model: userCoins
                    }
                ]
            }).then(result => {
                if(!result) {done(null, false)}
                else{
                    if (password == result['password']){
                        done(null, {
                            id: result["id"],
                            BTC: result["userCoins.BTC"],
                            ETH: result["userCoins.ETH"],
                            DASH: result["userCoins.DASH"],
                            LTC: result["userCoins.LTC"],
                            ETC: result["userCoins.ETC"],
                            XRP: result["userCoins.XRP"],
                            BCH: result["userCoins.BCH"],
                            XMR: result["userCoins.XMR"],
                            ZEC: result["userCoins.ZEC"],
                            QTUM: result["userCoins.QTUM"],
                            BTG: result["userCoins.BTG"],
                            EOS: result["userCoins.EOS"],
                            krw: result["userCoins.krw"],
                        })
                    }else{
                        done(null, false)
                    }
                }
            })


        }
      });

    }
);

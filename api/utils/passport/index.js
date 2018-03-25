/**
 * Created by bagjeongtae on 2018. 2. 4..
 */
/**
 * Created by bagjeongtae on 2017. 12. 29..
 */

const passport = require('passport');
const local = require('./local');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);

});

// passport.use(naver);
// passport.use(facebook);
passport.use(local);

module.exports = passport;

/**
 * Created by bagjeongtae on 2017. 12. 13..
 */
/**
 * Created by bagjeongtae on 2017. 12. 22..
 */
const {Nuxt, Builder} = require('nuxt');
const express = require('express');
const app = express();

const isProd = (process.env.NODE_ENV === 'production');
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const api = require('./routes/V1.0');
const passport = require('./utils/passport');
// options으로 nuxt.js를 인스턴스화 합니다.
let config = require('../nuxt.config.js');
config.dev = !isProd;
const nuxt = new Nuxt(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(/*{limit: 5000000}*/));

app.use(session({
  secret: '#123#123#asd#qwe#zxc#qwer#128*(*&asdjkwhereareyoufrom',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000000000000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

//delete req.session.authUser  세션 제거하는 방법

app.use('/api/v1.0', api);

// nuxt.js로 모든 route를 랜더합니다.
app.use(nuxt.render);

// dev 모드를 위해 핫-로딩 빌드를 합니다.
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build()
}

// 서버
app.listen(port, '0.0.0.0', () => {
    console.log('Server listening on localhost:' + port)
});

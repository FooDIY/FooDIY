/**
 * Created by Sehyeon on 2017-07-28.
 */
var passport = require('passport');
var passportJWT = require('passport-jwt');
var Member = require('../models/member');
var cfg = require('../config/jwt_config');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    // JWT 비밀키
    secretOrKey: cfg.jwtSecret,
    // 클라이언트에서 서버로 토큰을 전달하는 방식  (header, querystring, body 등이 있다.)
    // header 의 경우 다음과 같이 써야 한다 { key: 'Authorization', value: 'JWT' + 토큰
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};
module.exports = function () {
    var strategy = new Strategy(params, function (payload, done) {
        // TODO write authentications to find users from a database
        var user = Member.find(function (u) {
            return u.id === payload.id;
        });
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error('User not found'), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('jwt', cfg.jwtSession);
        }
    };
};
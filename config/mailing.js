/**
 * Created by Sehyeon on 2017-07-27.
 */
module.exports = function (id,token) {
    var nodemailer = require('nodemailer');
    var smtpPool = require('nodemailer-smtp-pool');
    var sender = 'FooDIY < FooDIY@gmail.com >';
    var receiver = id;
    var mailTitle = '[FooDIY]계정 인증 메일';
    var html = '<a href="localhost:3000/users/confirm_certificate/'+ token +'" target="_blank">localhost:3000/users/confirm_certificate/'+token+'</a><br>'+
        '<br>길창문 님, 안녕하세요!<br>' +
    '<br>FooDIY 계정 본인 확인 메일입니다. 위의 링크를 클릭하고, 본인 인증을 완료하여 주십시오.' +
        '<br>중요: 인증링크는 10분후에 만료됩니다. 10분 내로 클릭하여 주시기 바랍니다.' +
        '<br>맛있는 요리를 찾아서!' +
        '<br>FooDIY';
    var mailOptions = {
        from: sender,
        to: receiver,
        subject: mailTitle,
        html: html
    };
    var transporter = nodemailer.createTransport(smtpPool({
        service: "Gmail",
        host: "localhost",
        port: "465",
        auth: {
            user: "foodiy.net@gmail.com",
            pass: "vnel1234"
        },
        tls: {
            rejectUnauthorize: false
        },
        maxConnections: 5,
        maxMessages: 10
    }));
    transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
            console.log('failed... => ' + err);
        } else {
            console.log('succeed... => ' + res);
        }
        transporter.close();
    });
};
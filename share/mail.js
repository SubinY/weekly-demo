'use strict'

const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('./config.secret').config;

const transport = mailer.createTransport(smtpTransport(config));
//域名domain没有的时留空，devMode下读取host
// console.log(JSON.stringify(config));
/**
 * 邮件发送
 * @param {Object} data 邮件对象
 */
function sendMail(data) {
    transport.sendMail(data, function (err) {
        if (err) {
            // 写为日志
            console.error(err);
        }
    });
}


/**
 * 发送通知邮件
 * @param {String} who 接收人的邮件地址
 * 失败情况 1、read ECONNRESET （参数有误导致，也有可能需要配置SSL）
 * 失败情况 2、connect ECONNREFUSED 220.181.12.209:25 （主机名有误，目前仅smtp.mail.com可以，QQ那些还不知道怎么设置）
 * 失败情况 3、Invalid login: 550 User has no permission （pass要用授权码登录，授权码在相应的邮件供应商里设置）
 * 失败情况 4、Mail command failed: 553 Mail from must equal authorized user （发件人和认证的邮箱地址不一致，配置和发送时的配置发件人必须一致）
 * 失败情况 5、Message failed: 554 DT:SPM 163 smtp14 （163认为这是垃圾邮件，需要修改标题和内容）
 */
function sendAlertMail(who, title, content) {
    sendMail({
        from: config.auth.user,
        to: who,
        subject: title,
        text: content
    });
}

module.exports = { sendMail, sendAlertMail };
const schedule = require('node-schedule');
const bus = require('./business');
const handle = require('./services/handle');
const mail = require('./share/mail');

let token = "";

const receiveMail = "subin_hu@163.com";

async function main(type = 1) {
    const signName = type === 1 ? '签到' : '签退';
    if (!token) {
        const [loginErr, loginToken] = await handle(bus.logInFn());
        if (loginErr) {
            console.err(`登录失败，${loginErr}`);
            mail.sendAlertMail(receiveMail, 'M3登录失败', `登录失败，${loginErr}`);
            return;
        }
        token = loginToken;
    }
    const [signErr, signMst] = await handle(bus.signInFn(token, type));
    if (signErr) {
        console.error(`${signName}失败，${signErr}`);
        token = ""; // token失效，重新登录
        main(type);
        // mail.sendAlertMail(receiveMail, `${signName}失败`, `${signName}失败，${signErr}`);
        return;
    }
    console.log(`${signName}成功, ${signMst}`);
    mail.sendAlertMail(receiveMail, `${signName}成功`, `${signMst},${signName}时间：${new Date()}`);
}

/**
 * 定时任务
 * @param {*} second 随机秒数
 * @param {*} minute 随机分钟数
 * @param {*} fn 
 */
function scheduleCronstyle(second, minute, hour, fn = null) {
    let c = schedule.scheduleJob(`${second} ${minute} ${hour} * * 1-6`, function () {
        console.log('scheduleCronstyle:' + new Date());
        if (fn) fn();
        c.cancel();
        scheduleCronstyle(Math.floor(Math.random() * 59), Math.floor(Math.random() * 59), hour);
    });
}

(() => {
    scheduleCronstyle(59, 03, 17, () => {
        main(1);
    });
    scheduleCronstyle(0, 0, 18, () => {
        main(2);
    });
})();
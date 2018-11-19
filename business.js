const api = require('./services/api');
// const globalConfig = require('./share/config.secret');
const globalConfig = require('./share/config');
const HttpProxyAgent = require('http-proxy-agent'); // 为了fiddler能拦截，必须在node设置代理

let proxy ='http://127.0.0.1:8888';
const agent = new HttpProxyAgent(proxy);

function logInFn() {
    const logInURL = "http://193.112.250.216:9999/mobile_portal/api/verification/login";
    const config = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            proxy: ''
        }),
        body: JSON.stringify(globalConfig.loginBody),
        agent: agent
    }
    return new Promise((resolve, reject) => {
        api.post(logInURL, config).then(body => {
            if (body['code'] === '200') {
                resolve(body.data.ticket);
            } else {
                reject(body);
            }
        }).catch(err => reject(err));
    })
}

/**
 * 
 * @param {*} token 
 * @param {*} type 1——签到，2——签退
 */
function signInFn(token, type) {
    const signInURL = "http://193.112.250.216:9999/mobile_portal/seeyon/rest/attendance/save"; // 还有补签接口，但意义不大
    const config = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            "JSESSIONID": token,
            // "user-agent": "okhttp/3.8.1",
            // "Connection": "keep-alive",
            // "credentials": "include",
            "Cookie": `JSESSIONID=${token}`, // 接口必须带cookie保持服务器端会话状态，不然会被拦截退出登录
        }),
        body: JSON.stringify(Object.assign(globalConfig.signInBody, { type: type })),
        agent: agent
    }
    return new Promise((resolve, reject) => {
        api.post(signInURL, config).then(res => {
            if (res['code']) {
                reject(res['message']);
                return;
            }
            resolve(res['msg']);
        }).catch(err => reject(err));
    })
}

module.exports = {
    logInFn,
    signInFn
}
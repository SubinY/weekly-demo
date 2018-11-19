
const config = {
    host: 'smtp.163.com',
    port: 25,
    auth: {
        user: 'xxx@163.com', // 邮箱账号
        pass: 'xxx' // 密码
    }
}

const loginBody = {
    "name": "xxx==",
    "password": "xxx",
}

const signInBody = {
    "continent": "",
    "country": "",
    "province": "广东省",
    "city": "广州市", "town": "天河区",
    "street": "陶庄路",
    "nearAddress": "广州xx公司",
    "longitude": "213.320378",
    "latitude": "93.162446",
    "sign": "广东省广州市天河区xx公司",
    "deviceId": "xxx",
    "remark": "签退",
    "receiveIds": "",
    "fileIds": [],
    "source": 2,
    "type": 1
}

module.exports = {
    config,
    loginBody,
    signInBody
};
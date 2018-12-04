require('es6-promise').polyfill();

const api = require('./api');
const handler = require('./handler');

const geoUrl = "https://restapi.amap.com/v3/geocode/geo";
const regeoUrl = "https://restapi.amap.com/v3/geocode/regeo";
const userKey = "91708461a42b6b0695e377f73558ee67";
// 根据详细地址找政区，兴趣点
// https://restapi.amap.com/v3/geocode/geo?key=91708461a42b6b0695e377f73558ee67&address=%E5%A4%A9%E5%B9%B3%E6%9E%B65%E5%8F%B7%E7%A9%BA%E9%97%B4&city=%E5%B9%BF%E5%B7%9E
function detailTransferPoint(detail) {
    const url = `${geoUrl}?key=${userKey}&address=${encodeURI(detail)}`;
    return new Promise((resolve, reject) => {
        api.get(url).then(res => {
            if (res['info'] === 'OK' && res.geocodes.length) {
                resolve(res.geocodes[0]['location']);
                return;
            }
            reject('查询失败');
        })
    });
}

// 根据兴趣点坐标找街道信息等
// https://restapi.amap.com/v3/geocode/regeo?key=91708461a42b6b0695e377f73558ee67&location=113.320471,23.162441&radius=200&extensions=all
function pointTransferFour(location) {
    const url = `${regeoUrl}?key=${userKey}&location=${location}`;
    return new Promise((resolve, reject) => {
        api.get(url).then(res => {
            if (res['info'] === 'OK') {
                resolve(res.regeocode['formatted_address']);
                return;
            }
            reject('查询失败');
        })
    });
}

formatText = (text) => {
    const regex = /[,，\s]{1,}/g;
    const result = text.trim()
        .replace(regex, ',')
        .split(',')
    return result || [];
}

async function getFourAddr(text) {
    const textArr = formatText(text);
    let result = '';
    for (let i = 0; i < textArr.length; ++i) {
        const [detailErr, point] = await handler(detailTransferPoint(textArr[i]));
        if (detailErr) {
            result = `${result}\n第${i + 1}行无法识别`;
            continue;
        }
        const [pointErr, fourAddr] = await handler(pointTransferFour(point));
        if (pointErr) {
            result = `${result}\n第${i + 1}行无法识别`;
            continue;
        }
        result = `${result?result+'\n':''}${fourAddr}`;
    }
    console.log(result);
    return Promise.resolve(result);
    // textArr.map((b, index) => {
    //     const [detailErr, point] = await handler(detailTransferPoint(b));
    //     if (detailErr) {
    //         result = `${result}</br>第${index + 1}行无法识别`;
    //         return;
    //     }
    //     const [pointErr, fourAddr] = await handler(pointTransferFour(point));
    //     if (pointErr) {
    //         result = `${result}</br>第${index + 1}行无法识别`;
    //         return;
    //     }
    //     result = `${result}</br>${fourAddr}`;
    //     console.log(result);
    //     return Promise.resolve(result);
    // })
}

module.exports = getFourAddr;
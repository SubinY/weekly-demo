const fs = require('fs');
const request = require('request');
const base64url = require('base64-url')
const promiseHandler = require('./promiseHandler').promiseHandler;

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '4f206265ee5a416cbb8baafcfbf3ec92';
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze';

const config = {
    uri: './index.html',
    imgRegex: /<img.*?">/gi,
    srcRegex: /src=("|').*?("|')/gi,
}
const imgRegex = /src=("|').*?"/i;

let addAlt = async () => {
    let imgArr = [], resultImgArr = [];
    try {
        data = fs.readFileSync(config.uri, { encoding: 'utf-8' });
    } catch (e) {
        console.log('文件读取失败')
        console.log(e)
        return;
    }
    if (data) {
        imgArr = data.match(config.imgRegex).join('').match(config.srcRegex).map(b => {
            if (!b) return;
            return b.replace('src=', '')
        })

        if (imgArr.length) {
            for (let i = 0; i < imgArr.length; ++i) {
                let result = await analysisImg(imgArr[i]);
                resultImgArr.push(result)
            }
            let newFile = replaceText(data, imgArr, resultImgArr);
            try {
                fs.writeFileSync(config.uri, newFile)
                console.log('Success')
            } catch (e) {
                console.log('Error')
                return;
            }
        }
    }
}

function replaceText(fileStr, originArr, resultArr) {
    resultArr.map((b, i) => {
        fileStr = fileStr.replace(originArr[i], `${originArr[i]} alt="${b}"`)
    })
    return fileStr;
}

function analysisImg(uri) {
    return new Promise((resolve, reject) => {
        // Request parameters.
        const params = {
            'visualFeatures': 'Categories,Description,Color',
            'details': '',
            'language': 'en'
        };

        const options = {
            uri: uriBase,
            qs: params,
            body: '{"url": ' + uri + '}',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscriptionKey
            }
        };

        request.post(options, (error, response, body) => {
            if (error) {
                console.log('Error: ', error);
                reject(null);
            }
            let jsonResponse = JSON.parse(body);
            let desc = jsonResponse.description && jsonResponse.description.captions[0].text
            resolve(desc);
        });
    })
}

module.exports = {
    addAlt
}
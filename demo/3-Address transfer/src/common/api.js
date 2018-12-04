require('es6-promise').polyfill();
require('isomorphic-fetch');

const post = (url, conf) => {
    return new Promise((resolve, reject) => {
        fetch(url, conf).then(body => body.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
    })
}

const get = (url, conf = {}) => {
    let config = Object.assign({ method: 'GET' }, conf);
    return new Promise((resolve, reject) => {
        fetch(url, config).then(body => body.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
    })
}

module.exports = {
    post,
    get
}
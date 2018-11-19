require('es6-promise').polyfill();
require('isomorphic-fetch');

const post = (url, conf) => {
    return new Promise((resolve, reject) => {
        fetch(url, conf).then(body => body.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
    })
}

exports.post = post;
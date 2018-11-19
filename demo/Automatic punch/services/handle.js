const handle = promise => promise.then(res => [null, res])
    .catch(err => [err, null])

module.exports = handle;
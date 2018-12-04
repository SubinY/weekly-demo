module.exports = function (app) {
    // app.get('/', function (req, res) {
    //     res.redirect('/search')
    // })
    app.use('/search', require('./search'))

    // 404 page
    app.use(function (req, res) {
        // if (!res.headersSent) {
        //     res.status(404).render('404')
        // }
    })
}
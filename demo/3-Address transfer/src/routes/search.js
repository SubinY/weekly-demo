const express = require('express');
const router = express.Router();
const getFourAddr = require('../common/adress.service');

router.get('/', (req, res, next) => {
    res.render('search');
})

router.get('/:address', (req, res, next) => {
    const address = req.params.address;
    getFourAddr(address).then(fourAddr => {
        res.send({ result: fourAddr, code: 1 });
    }).catch(err => {
        res.end({ code: 0 });
    })
    // res.render('search', {   
    //     result: getFourAddr(address)
    // })
})

module.exports = router;
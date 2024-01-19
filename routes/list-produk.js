const express = require('express')
const router = express.Router()

router.get('/produk', (req,res) => {
    res.send('untuk nampilin list hotel?/ produk lainnya, 3 aja')
})

module.exports = router


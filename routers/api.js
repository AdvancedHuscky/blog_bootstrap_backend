const express = require('express');
const router = express.Router();

router.get('/api',(req,res,next)=>{
    res.send('admin-api');
})

module.exports = router;
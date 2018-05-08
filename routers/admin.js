const express = require('express');
const router = express.Router();

router.get('/admin',(req,res,next)=>{
    res.send('admin-User');
})

module.exports = router;
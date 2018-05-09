const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.render('main/index');
})
router.get('/res',(req,res,next)=>{
    res.render('main/registration');
})



module.exports = router;
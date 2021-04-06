const express = require('express');
const api=express()
const router =require('./router')
// const jwt=require('express-jwt')
require('../../config/db')

api.use(express.json())

api.use('/api/v1/auth',router);


api.listen(3000,err =>{
    if(err){
        return console.log('Error happened while connecting to auth service: ',err)
    }
    console.log('Auth service started on port 3000')
})

// api.get('/api/v1/auth',(req,res)=>{
//     res.render('views/login')
// })

// /api/v1/auth

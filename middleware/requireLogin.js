const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    // authorization === Brearer askgjaksgjfskja
    if(!authorization){
        return res.status(401).json({error:"you must be logged inn"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            console.log(err,JWT_SECRET)
            return res.status(401).json({error:"you must be logged in"})
        }
        const {_id} = payload
        User.findById(_id)
        .then(userdata=>{
            req.user = userdata
            next()
            // putting next here for below reason
        })
        // next() this next should not be here as it requires some time to fetch the data
    })
}
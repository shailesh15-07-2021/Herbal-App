var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
var AdminDB = require('../../modules/adminModel');

    if (typeof localStorage === "undefined" || localStorage === null) {
        const LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }


module.exports=(req, res, next)=>{
      const {email,password} =req.body;
      console.log(req.body);
      AdminDB.findOne({email:email})
      .exec()
      .then(result=>{
        // console.log(result);
        if(result.length<1){
          res.redirect('/admin')
        }else{
          bcrypt.compare(password,result.password,function(err, data){
            if(err){
              res.redirect('/admin',{msg:"login Failed", result:err})
            }
            if(data){
              var authtoken = jwt.sign(
                {
                  Id:result._id,
                  name:result.name,
                  email:result.email
                },
                'secret',
                {
                  expiresIn:"12h"
                }
              );
              localStorage.setItem("etoken",authtoken);
              res.redirect('/admin/dashboard')
              }else{
                res.redirect('/admin')
            }
          })
        }
        
      })
      .catch(err=>{
        res.redirect('/admin')
      })
}
// var express = require('express');
// var router = express.Router();
// var customerModel = require('../modules/customerinfo');
// var authentication = require('./middelware/auth');


// /* Post Contactlist Fetch Data page with auth. */

// router.post('/',authentication, function(req, res, next) {
//   var empId=req.body.empId;
//   var empType=req.body.empType;
//   if(empType==='ADM'){
//     var action = {status:1}
//   }else if(empType==='TADM'){
     
    

    
//     action =


//   }else if(empType==='SEXC'){
//     action = { empId:{$in:empId},status:1 }
//   }else if(empType==='FCADM'){
//     action = {status:0}
//   }else if(empType==='FCEXC'){
//     action = { empId:0,status:0}
//   }
//   customerModel.find( {cateObjectid:cateId,status:1,color:color,price:{$let:500,$get:1}}).limit(15).sort(print:-1).skip(15)
//   .exec()
//   .then(result=>{
//         res.status(201).json({
//             result:result,
//         });
//   })
//   .catch(err=>{
//     res.json({
//       error:err
//     })
//   })
   
// });

// module.exports = router;
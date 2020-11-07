var express = require("express");
const userSchema = require("../sql/userSchema");
var router = express.Router();



router.get("/", function (req, res, next) {
    // 先请求数据库数据，将数据渲染到页面模板
   console.log('进入了register1界面');
   res.render("register1")
 })




 router.post("/in", function (req, res, next) {
    console.log('进入register1的in处理');
    let obj=req.body;
    console.log(obj);
    console.log(obj.username);
    console.log(obj.password);
    


    //用户重复的解决1
    // userSchema.insertMany(obj,(err,data)=>{
    //        if(err) {
    //          console.log(err)
    //        } 
    //        if(data){
    //         res.redirect("/login1");
    //        }else{
    //         res.redirect("/register1");
    //        }
           
           
    //   })






    //用户重复的解决2

    // userSchema.findOne({username:obj.username},(err,data)=>{
    //   if(err){
    //     console.log(err);
    //   }
    //   if(data){
    //     res.redirect('/register1')
    //   }else{
    //     userSchema.insertMany(obj,(err,data)=>{
    //       if(err){
    //         console.log(err);
    //       }
    //       console.log(data);
    //       if(data){
    //         res.redirect('/login1')
    //       }else
    //       res.redirect('/register1')
    //     })
    //   }
    // })
       
  

    //用户重复的解决3

userSchema.findOne({username:obj.username},(err,data)=>{
  if(err){
    console.log(err);
  }
  if(data){
    res.redirect('/register1')
  }else{
    userSchema.insertMany(obj,(err,data)=>{
      if(err){
        console.log(err);
      }
      console.log(data);
      res.redirect('/login1')
    })
  }
})







  });



module.exports = router;
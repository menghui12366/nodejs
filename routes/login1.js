var express = require("express");
const userSchema = require("../sql/userSchema");
var router = express.Router();


router.get("/", function (req, res, next) {
    // 先请求数据库数据，将数据渲染到页面模板
   console.log('进入了login1界面');
   res.render("login1")
 })


router.post("/in", function (req, res, next) {
console.log('进入login1的in处理');
let obj=req.body;
console.log(obj);
console.log(obj.username);
console.log(obj.password);

userSchema.findOne(obj,(err,data)=>{
       if(err) {
         console.log(err)
       } 
       if(data){
        //  res.cookie('islogin','ok')
         req.session.islogin='ok';
         console.log('我在login路由/in里面');
        res.redirect("/pro");
       }else{
        res.redirect("/register1");
       }
       
       
  })
   
});



module.exports = router;
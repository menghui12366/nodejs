var express = require("express");
const userSchema = require("../sql/userSchema");
var router = express.Router();
// var uuid = require("node-uuid");
// const production = require("../sql/production");
/* GET home page. */
router.get("/", function (req, res, next) {
  // 先请求数据库数据，将数据渲染到页面模板
 
  userSchema.find({},(err,data)=>{
      if(err) {
        console.log(err)
      }
 
      res.render("user",{
        index:2,
        data:data
      })
  })

 });

router.get("/add", function (req, res, next) {
  res.render("userAdd", {
    index: 2,
  });
});

router.post("/addAction", function (req, res, next) {

let obj=req.body;
obj.password=Number(obj.password);
// obj.discount=obj.discount-0;
// obj.score=obj.score*1;
console.log(obj);






  // let obj = req.body;
  // obj.price = Number(obj.price);
  // obj.discount = obj.discount - 0;
  // obj.score = obj.score * 1;
  // console.log(obj);
  userSchema.insertMany(obj,(err,data)=>{
       if(err) {
         console.log(err)
       } 
       console.log(data)
       res.redirect("/user");
  })
   
});

//删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log(req.query)

  userSchema.deleteOne({'_id':req.query._id},(err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
     res.redirect("/user");
  })
  
  // production.findOneAndRemove({'_id' : req.query._id},(err,data)=>{
  //    if(err) {
  //      console.log(err)
  //    }
  //    console.log(data)
  //    res.redirect("/pro");
  // })


//   production.findOneAndDelete({'_id' : req.query._id},(err,data)=>{
//     if(err) {
//       console.log(err)
//     }
//     console.log(data)
//     res.redirect("/pro");
//  })

});

//修改操作
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id
  console.log(req.query)
  const _id = req.query._id;
  console.log("_id", _id);

  userSchema.findById({"_id":_id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('userUpdate',{
      index:2,
      data:data
    })
  })
});

// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  // obj.password = Number(obj.password);

  console.log('obj_id',obj)
  
  userSchema.findByIdAndUpdate( obj._id,obj,(err,data)=>{
   
      if(err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/user");
      
  })

  
});

//sort 排序
// router.get("/sort1", (req, res, next) => {
//   const obj = req.query;
//     production.find({}).sort({price:1}).exec((err,data)=>{
//      if(err){
//        console.log(err)
//      }
//      console.log(data)
//        res.render("pro", {
//       index: 1,
//       data,
//     })
//    })
  
// });

// router.get("/sort2", (req, res, next) => {
//   const obj = req.query;
//     production.find({}).sort({price:-1}).exec((err,data)=>{
//      if(err){
//        console.log(err)
//      }
//      console.log(data)
//        res.render("pro", {
//       index: 1,
//       data,
//     })
//    })
  // sql.sort(production, {}, {}, obj).then((data) => {
  //   res.render("pro", {
  //     index: 1,
  //     data,
  //   });
  // });
// });

//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;
 
  let reg = new RegExp(obj.search);
  userSchema.find({Name:reg},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
       res.render("user", {
       index: 2,
       data,
    });
  })

 
});

module.exports = router;

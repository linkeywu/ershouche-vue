var fs = require("fs");
var url = require("url");
var path = require('path'); 
var session = require('express-session'); //引入session包
var crypto = require("crypto"); //加密包
var formidable = require('formidable'); //识别报文体
var mongoose = require("mongoose");
var express = require("express");
var app = express();
// //静态化www目录
// app.use(express.static("www"))

//引入Car表结构
var Car = require("./models/Car.js");
var User = require("./models/User.js");
var LoginUser = require("./models/LoginUser.js");

//连接数据库
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/ershouche", {useMongoClient:true})

//**********开启session*********** */
app.set('trust proxy', 1);
app.use(session({
    secret: 'Marte', 
    resave: false,
    saveUninitialized: true,  //是否保存未初始化的会话
    cookie:{}
}))
//**********开启session*********** */


//得到某一个id车辆的图片信息
// app.get("/carpic/:id", function(req,res){
//     var id = req.params.id;
//     //读取文件夹
//     var engine = fs.readdirSync("./www/carimages/"+ id +"/engine");
//     var view = fs.readdirSync("./www/carimages/"+ id +"/view");
//     var more = fs.readdirSync("./www/carimages/"+ id +"/more");
//     var inner = fs.readdirSync("./www/carimages/"+ id +"/inner");
//     //返回json数据给前端
//     res.json({"images": engine,view,more,inner})
// })


// 根据id查询相似车，相似车的意思：品牌一样、车系一样
app.get("/carlike/:id", function(req,res){
    var id = req.params.id;
    //第一个事情，知道这辆车是什么品牌和车系，再读取数据库
    Car.find({id}).exec(function(err,data){
        var brand = data[0].brand;
        var series = data[0].series;
        //寻找id不是这辆车，且品牌是这个车的品牌和车系
        Car.find({"id":{"$not":{"$eq":id}}, brand,series}).exec(function(err,data){
            res.json({"info": data})
        })
    })
})

//显示当前id的车的所有信息
app.get("/cars/:id",function(req,res){
    var id = req.params.id;
    Car.find({id}).exec(function(err,data){
        res.json({"info": data[0]});
    })
})

//分页排序和筛选车辆接口
app.get("/cars", function(req,res){
    var obj = url.parse(req.url, true).query;
    var page = obj.page; //页码
    var pagesize = obj.pagesize; //每页数量
    var sortby = obj.sortby;   //排序条件
    var sortdirection = obj.sortdirection; //正序或倒序 1正序 -1倒序

    var dbObj = {}; //准备去数据库查询对象
    //有传值为真，才赋值
    // if(obj.color){
    //     dbObj.color = JSON.parse(obj.color);
    // }

    // if(obj.brand){
    //     dbObj.brand = JSON.parse(obj.brand);
    // }

    // if(obj.series){
    //     dbObj.series = JSON.parse(obj.series);
    // }

    // if(obj.type){
    //     dbObj.type = JSON.parse(obj.type);
    // }

    // if(obj.gearbox){
    //     dbObj.gearbox = JSON.parse(obj.gearbox);
    // }

    // if(obj.fuel){
    //     dbObj.fuel = JSON.parse(obj.fuel);
    // }

    // if(obj.displacement){
    //     dbObj.displacement = JSON.parse(obj.displacement);
    // }

    // if(obj.environmental){
    //     dbObj.environmental = JSON.parse(obj.environmental);
    // }

    // if(obj.price){
    //     var priceArr = JSON.parse(obj.price);
    //     dbObj.price = {$gte:priceArr[0], $lte:priceArr[1]}
    // }

    // if(obj.km){
    //     var priceArr = JSON.parse(obj.km);
    //     dbObj.km = {$gte:priceArr[0], $lte:priceArr[1]}
    // }

    //封装函数，简化以上的if判断操作
    function filter(keyArr) {
        for(var k in keyArr){
            if (keyArr[k] != "page" && keyArr[k] != "pagesize" && keyArr[k] != "sortby" && keyArr[k] != "sortdirection"){
                var arr = JSON.parse(obj[keyArr[k]]);
                dbObj[keyArr[k]] = arr;

                //如果是km和价格，则需要选择范围再赋值
                if (keyArr[k] == "price" || keyArr[k] == "km"){
                    dbObj[keyArr[k]] = {$gte:arr[0], $lte:arr[1]}
                }
            }
        }
        // console.log(dbObj)
    }
    filter(Object.keys(obj))

    //得到数据库的数据总数量
    Car.count({}, function(err,count){
        //skip()    跳过指定数量的数据，接收一个数字参数作为跳过的记录条数
        //limit()   读取指定数量
        //sort()    排序
        //skip()与limit()顺序没有要求，不管怎么放置，执行顺序都是先sort()后skip()最后limit()
        //根据以上条件，得到dbObj对象，根据dbObj对象查询数据库
        Car.find(dbObj).sort({[sortby]:sortdirection}).skip(pagesize * (page - 1)).limit(pagesize).exec(function(err,data){
            res.json({
                count,
                number:data.length,
                results:data
            })
        })
    })
})

//************关于用户的接口*********** */ 
app.get("/users", function(req, res){
    var obj = url.parse(req.url, true).query;
    var page = obj.page; //页码
    var pagesize = obj.pagesize; //每页数量
    var sortby = obj.sortby;   //排序条件
    var sortdirection = obj.sortdirection; //正序或倒序 1正序 -1倒序
    var keyWord = obj.keyword; //正序或倒序 1正序 -1倒序

    if (keyWord){
        var keyWordArr = keyWord.split(",");
        // 或查找：{ $or: [{ name: "马超" }, { tel: "3708456616" }]}
        // 且查找：{ name: "马超" ,tel: "3708456616" }
        //查询条件对象
        if (keyWordArr.length > 1) { //如果关键字超过两个，执行且查询
            var dbObj = {
                name: keyWordArr.map(item => new RegExp(item, "g")),
                tel: keyWordArr.map(item => new RegExp(item, "g"))
            }
        } else {
            var dbObj = {
                $or: [
                    { name: keyWordArr.map(item => new RegExp(item, "g")) },
                    { tel: keyWordArr.map(item => new RegExp(item, "g")) }
                ]
            }
        }
    }

    User.count().exec(function (err,count) {
        User.find(dbObj).sort({ [sortby]: sortdirection }).skip(pagesize * (page - 1)).limit(pagesize).exec(function (err, data) {
            res.json({
                count,
                number: data.length,
                results: data
            })
        })
    })    
})


//接受登陆的post请求
app.post("/login", function(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, {username,password}){
        //将用户传过来的密码用sha256加密
        var password = crypto.createHash("sha256").update(password).digest("hex");
        //读取数据库的用户名和密码（且查找），账号和密码都要匹配上才能从数据库查询到
        LoginUser.find({ username, password}).exec(function(err,data) {
            if(data.length == 0){
                //如果数据库查询的结果为0，说明账号或密码错误
                res.json({"result": -1})
                return;
            }
            //登陆成功，下发session值，表示这个用户登陆过了。
            req.session.login = true;
            req.session.username = data[0].username;
            res.json({"result": 1})
        })
    });
})

//检查是否登陆，给前端的路由守卫验证
app.get("/checklogin", function(req,res) {
    console.log(req.session.login)
    console.log(req.session.username)
    if(req.session.login){
        res.json({
            login: req.session.login,
            username: req.session.username
        })
    }else{
        res.json({"login":false})
    }
})

app.listen(3000)
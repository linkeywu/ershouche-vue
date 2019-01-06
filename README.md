## About ##
此项目是 vue2.0 + element-ui + node+mongodb 构建的后台管理系统，所有的数据都是从服务器实时获取的真实数据，具有真实的注册、登录、数据显示、新增数据、修改数据、删除数据等功能。

##技术栈 ##
express + mockjs + vue2 + vuex + vue-router + element-ui + webpack + ES6/7 + fetch + less 
##项目运行##
###注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本###
    
    # 克隆到本地
    git clone https://github.com/linkeywu/ershouche-vue.git
    
    # 后端进入文件夹
    cd server_side
    
    # 安装依赖
    npm install

    # 开启本地服务器localhost:3000
    node ./app.js
	
	# 前端进入文件夹
    cd vue_project

    # 安装依赖
    npm install
    
    # 打包运行
    npm run dev 

## 后台接口 ##
本项目是主要显示二手车的车的信息，其中包括车辆图集功能(PicShow图片展示组件)、车辆筛选功能（CarFilter筛选组件）、用户数据功能（UserData组件）

使用mockjs模拟后端接口

访问二手车首页路径： `http://localhost:8080`

**部分数据接口**

根据id查询相似车，相似车的意思：品牌一样、车系一样

    method: GET
    url: http://127.0.0.1:3000/carlike/1000001
参数说明：1000001为ID ，根据ID查询

显示当前id的车的所有信息

    method: GET
    url: http://127.0.0.1:3000/cars/1000001
参数说明：1000001为ID ，根据ID查询

分页排序和筛选车辆接口

    method: GET
    url: http://127.0.0.1:3000/cars?page=1&pagesize=10&sortby=id&sortdirection=1
参数说明: page 代表页码数 ，pagesize 为一页显示的条目 ，sortby 排序是通过（id 或 price）sortdirection 1(正序) 或者-1（倒序）排序

关于用户的接口

    method: GET
    url: http://127.0.0.1:3000/users?page=1&pagesize=5&sortby=id&sortdirection=1&keyword=[马，88]
参数说明:  page 代表页码数 ，pagesize 为一页显示的条目 ，sortby 排序是通过（id 或 price）sortdirection 1(正序) 或者-1（倒序）排序，keyword 为关键字
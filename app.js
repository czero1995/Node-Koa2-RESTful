'use strict'

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const db = 'mongodb://localhost/nodeapi'

/*mongoose连接数据库*/
mongoose.Promise = require('bluebird')
mongoose.connect(db,{useMongoClient: true})

/*获取数据库表对应的js对象所在的路径*/
const models_path = path.join(__dirname, '/app/models')

/*用递归的形式，读取models文件夹下的js模型文件，并require*/
var walk = function(modelPath) {
  fs.readdirSync(modelPath).forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)
      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(models_path)

require('babel-register')
const Koa = require('koa')
const logger = require('koa-logger')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.keys = ['zhangivon']
app.use(logger())
app.use(session(app))
app.use(bodyParser())


/*使用路由转发请求*/
const router = require('./config/router')()

app.use(router.routes())
   .use(router.allowedMethods());



app.listen(3306)
console.log('app started at http://localhost:3306');
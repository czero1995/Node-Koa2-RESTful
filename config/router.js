'use strict'

const Router = require('koa-router')
const User = require('../app/controllers/user')
const App = require('../app/controllers/app')

module.exports = function(){
	var router = new Router({
    prefix: '/api'
  })

  // user
  router.post('/signup', App.hasBody, User.signup)
  router.post('/update', App.hasBody, App.hasToken, User.update)

  // DB Interface test
  router.get('/user/users',User.users)
  router.post('/user/delete', App.hasBody, User.deleteUser)

  return router
}
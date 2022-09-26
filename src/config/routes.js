/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
// 路由器相關
  // API入口登入頁面
    '/': 'main/index',

  // 會員系統
    'POST /user/signup':'user/signup',
    'GET /user/auth/:auth':'user/auth',
    'POST /user/login':'user/login',
    'POST /user/logout':'user/logout',
    'POST /user/info':'user/reset-pwd',
    'POST /user/forgot':'user/forgot-pwd',
    'GET /user/info':'user/find',
    'GET /user/me':'user/find-me',
    'GET /user/me/:auth':'user/find-me',
    'GET /user/:id':'user/find-one',
    'DELETE /user/:id':'user/destroy',
    'PATCH /user/info':'user/update',
    'PUT /user/admin/:id':'user/admin-update',

  // 訂單系統
    'POST /order':'order/create',
    'GET /order': 'order/find',
    'GET /order/all': 'order/find-all',
    'GET /order/pending': 'order/find-pending',
    'GET /order/:id':'order/find-one',
    'PUT /order/:id': 'order/update',
    'POST /order/occupied' : 'order/find-occupied',
    'DELETE /order/:id':'order/destroy',
    'DELETE /order/cancel/:id':"order/cancel",
    'GET /order/find-contact/:id':'order/find-contact',
    
  // 器材系統 Done
    'POST /equipt':'equipt/create',
    'GET /equipt': 'equipt/find',
    'GET /equipt/:id':'equipt/find-one',
    'GET /equipt/name/:name':'equipt/find-one',
    'GET /equipt/:id/:edit':'equipt/find-one',
    'GET /equipt/name/:name/:edit':'equipt/find-one',
    'PUT /equipt/:id': 'equipt/update',
    'PUT /equipt/name/:name': 'equipt/update-all',
    'DELETE /equipt/:id':'equipt/destroy',
    'DELETE /equipt/name/:name':'equipt/destroy',
    'PUT /equipt/batch/id':"equipt/batch-update-id",    
    'PUT /equipt/batch/name':"equipt/batch-update-name",    
    'DELETE /equipt/batch/id':"equipt/batch-destroy-id",    
    'DELETE /equipt/batch/name':"equipt/batch-destroy-name",    
  // 購物車系統
    'GET /equipt/cart':'cart/find',
    'POST /equipt/cart':'cart/create',
    'DELETE /equipt/cart/:id':'cart/destroy',

  // 器材品牌名稱 Done
    'POST /brand':'brand/create',
    'GET /brand': 'brand/find',
    'GET /brand/:id':'brand/find-one',
    'PUT /brand/:id': 'brand/update',
    'DELETE /brand/:id':'brand/destroy',
    'GET /brand/delete/:id':"brand/before-destroy",

  // 器材分類 Done
    'POST /cat':'cat/create',
    'GET /cat': 'cat/find',
    'GET /cat/:id':'cat/find-one',
    'PUT /cat/:id': 'cat/update',
    'DELETE /cat/:id':'cat/destroy',
    'GET /cat/delete/:id':'cat/before-destroy',

  // 使用者傳送日期給伺服器
    'POST /equipt/date/range':'equipt/date-create',
    'GET /equipt/date/range':'equipt/date-read',

  // 優惠碼
    'GET /coupon':"coupon/find-all",
    'GET /coupon/:code':"coupon/find-one",
    'GET /coupon/id/:id':"coupon/find-id",
    'POST /coupon':'coupon/create',
    "PUT /coupon/update":"coupon/update",
    'DELETE /coupon':"coupon/destroy",
    'DELETE /coupon/delete/:id':"coupon/delete",
  // 圖片相關
    'POST /img':'img/create',
    'DELETE /img/:title':'img/destroy', 
    "GET /img":"img/find",
    
  // 特殊檔期相關
    'GET /special':'special/find',
    'GET /special/:id':'special/find-one',
    'POST /special':'special/create',
    'DELETE /special/:id':"special/destroy",
    'PUT /special/:id':'special/update',

  //設定
    'GET /settings':"settings/find",
    "PUT /settings":"settings/update",
    'POST /settings/default':"settings/create",
    //Swagger 
    'get /swagger.json': (_, res) => {
      const swaggerJson = require('../swagger/swagger.json')
      if (!swaggerJson) {
        res
          .status(404)
          .set('content-type', 'application/json')
          .send({message: 'Cannot find swagger.json, has the server generated it?'})
      }
      return res
        .status(200)
        .set('content-type', 'application/json')
        .send(swaggerJson)
    }

};

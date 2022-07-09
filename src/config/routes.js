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
    'POST /api/user/signup':'user/signup',
    'GET /api/user/auth/:auth':'user/auth',
    'POST /api/user/login':'user/login',
    'POST /api/user/logout':'user/logout',
    'POST /api/user/info':'user/reset-pwd',
    'POST /api/user/forgot':'user/forgot-pwd',
    'GET /api/user/info':'user/find',
    'GET /api/user/me':'user/find-me',
    'GET /api/user/:id':'user/find-one',
    'DELETE /api/user/:id':'user/destroy',
    'PATCH /api/user/info':'user/update',

  // 訂單系統
    'POST /api/order':'order/create',
    'GET /api/order': 'order/find',
    'GET /api/order/all': 'order/find-all',
    'GET /api/order/pending': 'order/find-pending',
    'GET /api/order/:id':'order/find-one',
    'PUT /api/order/:id': 'order/update',
    'DELETE /api/order/:id':'order/destroy',
    'GET /api/order/find-contact/:id':'order/find-contact',
    
  // 器材系統 Done
    'POST /api/equipt':'equipt/create',
    'GET /api/equipt': 'equipt/find',
    'GET /api/equipt/:id':'equipt/find-one',
    'PUT /api/equipt/:id': 'equipt/update',
    'PUT /api/equipt': 'equipt/update-all',
    'DELETE /api/equipt/:id':'equipt/destroy',
    'PUT /api/equipt/batch/id':"equipt/batch-update-id",    
    'PUT /api/equipt/batch/name':"equipt/batch-update-name",    

  // 購物車系統
    'GET /api/equipt/cart':'cart/find',
    'POST /api/equipt/cart':'cart/create',
    'DELETE /api/equipt/cart/:id':'cart/destroy',

  // 器材品牌名稱 Done
    'POST /api/brand':'brand/create',
    'GET /api/brand': 'brand/find',
    'GET /api/brand/:id':'brand/find-one',
    'PUT /api/brand/:id': 'brand/update',
    'DELETE /api/brand/:id':'brand/destroy',
    'GET /api/brand/delete/:id':"brand/before-destroy",

  // 器材分類 Done
    'POST /api/cat':'cat/create',
    'GET /api/cat': 'cat/find',
    'GET /api/cat/:id':'cat/find-one',
    'PUT /api/cat/:id': 'cat/update',
    'DELETE /api/cat/:id':'cat/destroy',
    'GET /api/cat/delete/:id':'cat/before-destroy',

  // 使用者傳送日期給伺服器
    'POST /api/equipt/date/range':'equipt/date-create',
    'GET /api/equipt/date/range':'equipt/date-read',

  // 優惠碼
    'GET /api/coupon':"coupon/find-all",
    'GET /api/coupon/:code':"coupon/find-one",
    'POST /api/coupon':'coupon/create',
    "PUT /api/coupon/update":"coupon/update",
    'DELETE /api/coupon':"coupon/destroy",
  // 圖片相關
    'POST /api/img':'img/create',
    'DELETE /api/img/:title':'img/destroy', 
    "GET /api/img":"img/find",
    
  // 特殊檔期相關
    'GET /api/special':'special/find',
    'POST /api/special':'special/create',
    'DELETE /api/special/:id':"special/destroy",
    'PUT /api/special':'special/update',

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

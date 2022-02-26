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
  // API入口登入頁面
    '*': 'main/index',

  // 會員系統
    'POST /api/user/signup':'user/signup',
    'POST /api/user/login':'user/login',
    'POST /api/user/logout':'user/logout',
    'POST /api/user/info':'user/reset-pwd',
    'POST /api/user/forgot':'user/forgot-pwd',
    'GET /api/user/info':'user/find',
    'GET /api/user/me':'user/find-me',
    'GET /api/user/:id':'user/find-one',
    'DELETE /api/user/:id':'user/destroy',

  // 訂單系統
    'POST /api/order':'order/create',
    'GET /api/order/all': 'order/find',
    'GET /api/order/:id':'order/find-one',
    'PUT /api/order/:id': 'order/update',
    'DELETE /api/order/:id':'order/destroy',
    
  // 器材系統 Done
    'POST /api/equipt':'equipt/create',
    'GET /api/equipt': 'equipt/find',
    'GET /api/equipt/:id':'equipt/find-one',
    'PUT /api/equipt/:id': 'equipt/update',
    'DELETE /api/equipt/:id':'equipt/destroy',
    
  // 購物車系統
    'POST /api/equipt/cart':'equipt/create',
    'GET /api/equipt/cart': 'equipt/find',
    'GET /api/equipt/cart/:id':'equipt/find-one',
    'PUT /api/equipt/cart/:id': 'equipt/update',
    'DELETE /api/equipt/cart/:id':'equipt/destroy',

  // 器材品牌名稱 Done
    'POST /api/brand':'brand/create',
    'GET /api/brand': 'brand/find',
    'GET /api/brand/:id':'brand/find-one',
    'PUT /api/brand/:id': 'brand/update',
    'DELETE /api/brand/:id':'brand/destroy',
    
  // 器材分類 Done
    'POST /api/cat':'cat/create',
    'GET /api/cat': 'cat/find',
    'GET /api/cat/:id':'cat/find-one',
    'PUT /api/cat/:id': 'cat/update',
    'DELETE /api/cat/:id':'cat/destroy',
};

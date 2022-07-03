/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/


  //check if user is logged in:
'user/reset-pwd':'check-login',
'user/find':'check-login',
'order/find':'check-login',
'order/find-one':"check-login",
'order/update':"check-login",
'order/destroy':"check-login",
'user/update':"check-login",


//check if cart and date-range exists in session
'order/create':'order-policies',

//check if user's admin.
'order/find-all':"check-admin",
'order/find-pending':"check-admin",
'user/find-one':"check-admin",
'user/destroy':'check-admin',
"equipt/create":"check-admin",
'equipt/destroy':"check-admin",
"equipt/update":'check-admin',
"equipt/update-all":'check-admin',
"cat/destroy":"check-admin",
"cat/update":"check-admin",
"brand/destroy":"check-admin",
"brand/create":"check-admin",
"brand/update":"check-admin",
"coupon/find-all":"check-admin",
"coupon/create":'check-admin',
"order/find-contact":"check-admin",
"cat/before-destroy":"check-admin",

// any privillages.
'user/logout':true,
  "main/index":true,
  "user/signup":true,
  "user/auth":true,
  "user/login":true,
  "user/forgot-pwd":true,
  "equipt/find":true,
  "equipt/find-one":true,
  "equipt/date-read":true,
  "equipt/date-create":true,
  "brand/find-one":true,
  "brand/find":true,
  "cart/destroy":true,
  "cart/create":true,
  "cart/find":true,
  'coupon/find-one':true
  

  // '*': true,

};

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
'user/logout':"check-login",
'user/reset-pwd':'check-login',
'user/find':'check-login',
'order/create':'check-login',
'order/find':'check-login',
'order/find-one':"check-login",
'order/update':"check-login",
'order/destroy':"check-login",

//check if user's admin.
'user/find-one':"check-admin",
'user/destroy':'check-admin',
"equipt/create":"check-admin",
'equipt/destroy':"check-admin",
"equipt/update":'check-admin',
"cat/destroy":"check-admin",
"cat/update":"check-admin",
"brand/destroy":"check-admin",
"brand/create":"check-admin",
"brand/update":"check-admin",



// any privillages.
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
  

  // '*': true,

};

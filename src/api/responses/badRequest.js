/**
 * Module dependencies
 */

var util = require('util');
var _ = require('@sailshq/lodash');



/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */
module.exports = function badRequest(data) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Get access to `sails`
  var sails = req._sails;

  // Set status code
  res.status(400);


  return res.json({
    status: false,
    statusCH: `請求錯誤：${data.details}`
  });

};

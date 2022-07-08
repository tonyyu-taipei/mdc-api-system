/**
 * Module dependencies
 */




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
  var res = this.res;

  // Get access to `sails`

  // Set status code
  res.status(400);

  if(data.details)
  return res.json({
    status: 'error',
    msgCH: `請求錯誤：${data.details}`
  });
  
  return res.json({
    status:'error',
    msgCH:`請確認您的請求是否符合要求，詳情請洽系統管理員`
  })

};

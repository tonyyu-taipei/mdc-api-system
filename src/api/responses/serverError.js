/**
 * Module dependencies
 */




/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(err);
 * return res.serverError(err, 'some/specific/error/view');
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 */

module.exports = function serverError(data) {

  // Get access to `req` and `res`
  var res = this.res;

  // Get access to `sails`

  // Define the status code to send in the response.


  // Set status code
  res.status(500).send({
    status: false, 
    msgCH: `伺服器錯誤：${data}`
  });

};

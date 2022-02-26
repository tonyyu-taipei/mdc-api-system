const e = sails.config.errcode.code;

module.exports = function err(optionalData) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;
  // Define the status code to send in the response.
  var statusCodeToSet = 400;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.trnError()');
    return res.sendStatus(statusCodeToSet);
  }

  if (e[optionalData] === undefined) {
    sails.log.info('Custom response `res.trnError()` called with an Error: Error code not exists.');
    return res.status(statusCodeToSet);
  }

  const resData = {
    status: e[optionalData].status,
    msg: e[optionalData].msg
  };

  // Set status code and send response data.

  return res.status(resData.status).send({
    status: false,
    statusCH: resData.msg
  });


};

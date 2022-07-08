const e = sails.config.errcode.code;

module.exports = function err(optionalData) {

  // Get access to `req` and `res`
  var res = this.res;
  // Define the status code to send in the response.
  var statusCodeToSet = 400;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.trnError()');
    return res.sendStatus(statusCodeToSet);
  }

  if (e[optionalData] === undefined) {
    sails.log.info('Custom response `res.trnError()` called with an Error: Error code does not exist.');
    return res.status(statusCodeToSet).send({status:"error", msgCH:"伺服器發生錯誤，請回報給系統管理員：Error code doesn't exist."})
  }

  const resData = {
    status: e[optionalData].status,
    msg: e[optionalData].msg
  };

  // Set status code and send response data.

  return res.status(resData.status).send({
    status: "error",
    msgCH: resData.msg
  });


};

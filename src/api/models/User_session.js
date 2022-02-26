/**
 * User_session.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

  const {v4: uuidv4} = require('uuid');
  const add = require('date-fns/add')


module.exports = {

  attributes: {

    token: {type: 'ref', defaultsTo: '', columnType: 'uuid'}, // Token
    expiredAt: {type: 'ref', defaultsTo: '', columnType: 'bigint'} // 到期時間

  },

  beforeCreate: (data, proceed) => {
    data.token = uuidv4().toString();
    data.expiredAt = add(new Date(), {hours: 3}).valueOf();

    return proceed();
  }

};


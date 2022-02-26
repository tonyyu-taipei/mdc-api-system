/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {type: "string", required: true }, // email
    password: {type: "string", required: true, encrypt: true} , // 密碼
    phone: {type: "number", required: true }, // 電話
    name: {type: "string", required: true }, // 名字
    permission: {type: "string",  defaultsTo: "0" }, //0 -一般使用者  1 -Admin:管理員
  },

};


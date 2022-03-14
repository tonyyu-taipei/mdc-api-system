/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {type: "string", required: true , columnType:'text',unique:true}, // email
    password: {type: "string", required: true, encrypt: true } , // 密碼
    phone: {type: "string", required: true , columnType:'text' }, // 電話
    name: {type: "string", required: true, columnType:'varchar(10)' }, // 名字
    permission: {type: "number",  defaultsTo: 0, columnType:'int2' }, //0 -一般使用者  1 -Admin:管理員
    auth: {type: "string", columnType:"text"},
    verified: {type: "boolean",defaultsTo:false}
  },

};

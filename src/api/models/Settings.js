/**
 * Cat.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    donedays: {type: "number", required: true ,}, // 自動完成時間
    autodone: {type: "boolean", required: true }, // 自動完成開關
    autocancel:{type: "boolean", required:true}, //借用時間到卻未借用自動取消開關
    canceldays: {type:"number",required:true},   //自動取消時間
    email:{type:"string",required:true} //管理通知Email
    

  },

};


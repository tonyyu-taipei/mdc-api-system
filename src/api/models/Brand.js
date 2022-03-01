/**
 * Brand.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    brand: {type: "string", required: true , columnType:'text'}, // 品牌名稱
    
  },

};


/**
 * Cat.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {type: "string", required: true }, // 分類名稱(英文)
    chinese: {type: "string", required: true }, // 分類名稱(中文)

  },

};


/**
 * Equipt.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', required: true , columnType:'varchar' },  // -器材名稱/型號	
    cat: { type: 'number', required: true , columnType:'int2' },  // 分類索引ID		
    belong: { type: 'number', required: true , columnType:'int2' }, // 創立者ID
    access: { type: 'number', required: true , columnType:'int2' },  // 存取權限
    photo: { type: 'string' , columnType:'text', defaultsTo:"notfound.png" },  // 器材圖片
    description: { type: 'string', required: true , columnType:'text' },  // 器材介紹
    price	: { type: 'number', required: true , columnType:'int2' },  // 日租價
    monthlyDiscount	: { type: 'string', required: false , columnType:'text', allowNull: true },  // 長租優惠比率
    mount	: { type: 'string', required: false , columnType:'text' },  // 相機/鏡頭接環規格	
    available	: { type: 'number', required: true , columnType:'int2' },  // 相機/鏡頭接環規格	
    brand	: { type: 'number', required: true , columnType:'int2' },  // 相機/鏡頭接環規格	
    contains	: { type: 'string', required: false , columnType:'text' },  // 相機/鏡頭接環規格	
    rentedFrom: { type: 'string', required: false , columnType:'text' },  // 從何時租到何時，各個日期都是JS 的new Date()
  },

};


/**
 * Equipt.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', required: true },  // -器材名稱/型號	
    cat: { type: 'number', required: true },  // 分類索引ID		
    belong: { type: 'number', required: true }, // 創立者ID
    access: { type: 'number', required: true },  // 存取權限
    photo: { type: 'number', required: true },  // 器材圖片
    description: { type: 'string', required: true },  // 器材介紹
    price	: { type: 'number', required: true },  // 日租價
    monthlyDIscount	: { type: 'string', required: true },  // 長租優惠比率
    mount	: { type: 'string', required: true },  // 相機/鏡頭接環規格	
    available	: { type: 'number', required: true },  // 相機/鏡頭接環規格	
    brand	: { type: 'number', required: true },  // 相機/鏡頭接環規格	
    contains	: { type: 'string', required: true },  // 相機/鏡頭接環規格	
    rentedFrom: { type: 'string', required: true },  // 從何時租到何時，各個日期都是JS 的new Date()
  },

};


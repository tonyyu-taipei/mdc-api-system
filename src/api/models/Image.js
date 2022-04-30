/**
 * Image.js
 *
 * @description :: A model to handle admin uploaded images 
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

    attributes: {
      title:{type:"string", required:true, columnType:'text', description:"Image title, will be used as the Userfriendly name for the image", unique:true},
      file: {type: "string", required: true , columnType:'text', example:"24.jpg", description:"The filename of the img"}, // 圖片檔名
      description: {type: "string", columnType:'text', allowNull:true}, // 圖片描述
  
    },
  
  };
  
  
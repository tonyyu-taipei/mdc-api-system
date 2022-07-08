/**
 * Cat.js
 *
 * @description :: A model represents whether the system is closed
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title:{type:"string", required:true, columnType:'text'},
    from: {type: "string", required: true , columnType:'text'},
    to: {type: "string", required: true , columnType:'text'}, 
    description:{ type:"string"},
    closedCat:{type:"string",required:true,columnType:"text",description:"Using string to determaine whether to shut down the whole system or just the specific catogory. All Equipt: ALL; None of the Equipt:NONE; Some of the cat: use comma to specify it as an array."}

  },

};


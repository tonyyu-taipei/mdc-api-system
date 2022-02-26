module.exports = {


  friendlyName: 'destroy',


  description: 'destroy brand.',


  inputs: {
    id: {type: 'number' , required: true},
  },

  
  exits: {
    success: {
      responseType: 'ok'
    },
    err: {
      responseType: 'err'
    }
  },


  fn: async function (inputs,exits) {

    // 資料刪除
    const _bd = await Brand.findOne({id: inputs.id});
    if(!_bd){
      return exits.err(204);
    } 
    
    await Brand.update({id: inputs.id}).set({
      active: false
    });

    return exits.success({});



  }


};

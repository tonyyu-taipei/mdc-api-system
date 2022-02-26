module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy cat.',


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
    const _cd = await Cat.findOne({id: inputs.id});
    if(!_cd){
      return exits.err(304);
    } 
    
    await Cat.update({id: inputs.id}).set({
      active: false
    });

    return exits.success({});



  }


};

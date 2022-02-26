module.exports = {


  friendlyName: 'destroy',


  description: 'destroy equipt.',


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
    const _ed = await Equipt.findOne({id: inputs.id});
    if(!_ed){
      return exits.err(404);
    } 
    
    await Equipt.update({id: inputs.id}).set({
      active: false
    });

    return exits.success({});



  }


};

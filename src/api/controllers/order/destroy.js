module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy order.',


  inputs: {


    id: {type: 'number' , required: true}


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
    const _od = await Order.findOne({id: inputs.id});
    if(!_od){
      return exits.err(204);
    } 
    
    await Order.update({id: inputs.id}).set({
      active: false
    });

    return exits.success({});

  }


};

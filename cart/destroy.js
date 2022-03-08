module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy cart.',


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
    const _cd = await Cart.findOne({id: inputs.id});
    if(!_cd){
      return exits.err(504);
    } 
    
    await Cart.update({id: inputs.id}).set({
      active: false
    });

    return exits.success({});

  }


};

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
      return exits.err(504);
    } 
    
    const _del = await Order.destroy({id: inputs.id}).fetch();
    if(_del)
    return exits.success({});
    else{
      return exits.err(504);
    }

  }


};

module.exports = {


  friendlyName: 'Find one',


  description: '',


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

    const _of = await Order.findOne({
      id: inputs.id
    });

    
    if (!_of) {
      return exits.err(502);
    }
    
    return exits.success(_of);

  }


};

module.exports = {


  friendlyName: 'Find one',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'ok'
    },
    err: {
      responseType: 'err'
    }
  },


  fn: async function (inputs, exits) {

    const _cf = await Cart.findOne({
      id: inputs.id
    });

    if (!_cf) {
      return exits.err(502);
    }
    
    return exits.success(_cf);

  }


};

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

    const _cf = await Cat.findOne({
      id: inputs.id
    });

    
    if (!_cf) {
      return exits.err(302);
    }
    
    return exits.success(_cf);

  }


};

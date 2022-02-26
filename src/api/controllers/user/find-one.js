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

    const _uf = await User.findOne({
      id: inputs.id
    });
    if (!_uf) {
      return exits.err(103);
    }
    
    return exits.success(_uf);


  }


};

module.exports = {


  friendlyName: 'Find one',


  description: 'find the equipment that matches the spec. ID',


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

    const _bf = await Brand.findOne({
      id: inputs.id
    });

    
    if (!_bf) {
      return exits.err(202);
    }
    
    return exits.success(_bf);

  }


};

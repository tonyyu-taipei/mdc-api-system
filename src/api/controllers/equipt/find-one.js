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

    const _ef = await Equipt.findOne({
      id: inputs.id
    });

    
    if (!_ef || _ef.access >= 2) {
      return exits.err(402);
    }
    
    return exits.success(_ef);

  }


};

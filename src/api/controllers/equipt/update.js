module.exports = {


  friendlyName: 'Update',


  description: 'Update equipt.',


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


  fn: async function (inputs,exits) {

    // All done.
    return exits.success();

  }


};

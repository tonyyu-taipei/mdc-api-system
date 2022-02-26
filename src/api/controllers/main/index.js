module.exports = {
  friendlyName: 'Index',
  description: 'Index main.',

  inputs: {

  },

  exits: {
    success: {
      responseType: 'ok'
    },
  },

  fn: async function (inputs, exits) {
    return exits.success({
      status:"success"
    })

  }


};

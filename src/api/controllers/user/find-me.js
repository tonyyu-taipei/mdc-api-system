module.exports = {


  friendlyName: 'Find me',


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


  fn: async function (inputs,exits) {

    return exits.success(this.req.session.user);

  }


};

module.exports = {


  friendlyName: 'Find one coupon code',


  description: '',


  inputs: {
    code:{ type:"string", required:true}

  },


  exits: {

    success:{
      responseType:"ok"
    },
    err:{
      responseType:"err"
    }

  },


  fn: async function (inputs, exits) {
    let _res = await Coupon.findOne({
      code: inputs.code
    })
    // All done.
    if(_res)
    return exits.success(_res);

    return exits.err(801);
  }


};

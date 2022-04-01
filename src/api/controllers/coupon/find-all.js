module.exports = {


  friendlyName: 'Find All Coupon Codes',


  description: 'A action to find all the coupons (admin only)',


  inputs: {

  },


  exits: {

    success:{
      responseType:"ok"
    },
    error:{
      responseType:"err"
    }

  },


  fn: async function (inputs, exits) {
    const data = await Coupon.find({});
    // All done.
    return exits.success(data);

  }


};

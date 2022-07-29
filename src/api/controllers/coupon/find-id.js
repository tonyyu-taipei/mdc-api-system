
module.exports = {


  friendlyName: 'Find one coupon code',


  description: '',


  inputs: {
    id:{ type:"number", required:true}

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
      id: inputs.id
    })
    if(_res)
      return exits.success(_res);
    

      return exits.err(801);
  }


};

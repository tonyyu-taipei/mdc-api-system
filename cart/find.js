module.exports = {


  friendlyName: 'Find',


  description: 'Find cart.',


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


  fn: async function (inputs, exits) {

    // 取得所有訂單資料
    const data = await Cart.find({});
    

    // All done.
    return exits.success({data: data});

  }


};

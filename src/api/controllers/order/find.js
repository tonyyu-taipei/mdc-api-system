module.exports = {


  friendlyName: 'Find',


  description: 'Find order.',


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

    // 取得所有訂單資料
    const data = await Order.find({
      userID : this.req.session.user.id
    });
    

    // All done.
    return exits.success({data: data});

  }


};

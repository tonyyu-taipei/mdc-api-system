module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


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

    // 在Session裡找尋Token，找到後刪除Token登出
    await User_session.destroy({
      user: this.req.session.user
    });
    // All done.
    return exits.success({});


  }


};

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
    
    //  從 User Session 抓登入後的資料，顯示登入後的個人資料
    return exits.success(this.req.session.user);

  }


};

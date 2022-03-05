module.exports = {


  friendlyName: 'Find one',


  description: '',


  inputs: {

    id: {type: 'number' , required: true}

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
    
    //  從 User 資料庫裡面抓資料出來，從資料庫裡尋找不是登入後的   
    const _uf = await User.findOne({
      id: inputs.id
    });
    if (!_uf) {
      return exits.err(103);
    }
    
    return exits.success(_uf);


  }


};

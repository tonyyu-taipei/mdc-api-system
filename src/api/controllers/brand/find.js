module.exports = {


  friendlyName: 'Find',


  description: 'Find brand.',


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

    // 尋找所有品牌資料
    const data = await Brand.find({});

    // All done.
    return exits.success({data: data});

  }


};

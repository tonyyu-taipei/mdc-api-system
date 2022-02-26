module.exports = {


  friendlyName: 'Find',


  description: 'Find cat.',


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
    const data = await Cat.find({});

    // All done.
    return exits.success({data: data});

  }


};

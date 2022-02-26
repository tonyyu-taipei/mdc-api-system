module.exports = {


  friendlyName: 'Find',


  description: 'Find equipt.',


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

    // 取得所有器材資料
      const data = await Equipt.find({});

    // All done.
      return exits.success({data: data});
  }


};

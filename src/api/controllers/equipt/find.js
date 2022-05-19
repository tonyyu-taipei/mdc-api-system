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
      let data = await Equipt.find({});
      data = data.filter(data=>{
        return data.access < 2;
      })
    // All done.
      return exits.success({data: data});
  }


};

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

    //管理員仍能看到所有器材 available 2為隱藏，管理員將看到4為使用者隱藏的器材
    if(this.req.session.user?.admin){
      data = data.filter(item =>{
        return item.available = item.available == 2?4: item.available;
      }) 
    }

      data = data.filter(data=>{
        return data.available != 2;
      })
    // All done.
      return exits.success({data: data});
  }


};

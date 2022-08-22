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
    //取得所有特殊檔期
    let closedCat = undefined;
    if(this.req.session.dateRange){
      try{  
        closedCat = await sails.helpers.specialEventArrayHelper(this.req.session.dateRange);
      }catch(e){
        closedCat = [];
        sails.log(e);
      }
  }
    // 取得所有器材資料
      let data = await Equipt.find({active: true});
      let dataDel = await Equipt.find({active: false});
    //管理員仍能看到所有器材 available 2為隱藏，管理員將看到4為隱藏的器材
    if(this.req.session.user?.admin){
      let dataTmp = new Array();
      for(let element of data){
        if(element.available == 2){
          element.available = 4;
          dataTmp.push(element);
        }
        for(let i in dataDel){
          dataDel[i].name += "（已刪除）"
        }
      }
      data.concat(dataDel);
      data.concat(dataTmp);
    }
      data = data.filter(data=>{
        return data.available != 2;
      })
      if(closedCat){
        data.forEach((element, index)=>{
          if(closedCat.includes(element.cat)){
            data[index].available = 3;
          }
        })
      }
    // All done.
      return exits.success({data: data});
  }


};

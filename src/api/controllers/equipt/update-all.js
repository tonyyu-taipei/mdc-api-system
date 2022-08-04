module.exports = {


    friendlyName: 'Update',
  
  
    description: 'Update all of the same name equipt by giving the equipt name.',
  
  
    inputs: {
        name: { type: 'string', required:true},  // -器材名稱/型號	
        rename: {type: 'string'},
        cat: { type: 'number'},  // 分類索引ID		
        belong: { type: 'number'}, // 創立者ID
        access: { type: 'number'},  // 存取權限
        description: { type: 'string'},  // 器材介紹
        price	: { type: 'number'},  // 日租價
        brand	: { type: 'number'},  // 器材品牌名稱
        available	: { type: 'number'},  // 維護狀況
  
  
        photo: { type: 'string'},  // 器材圖片
        contains	: { type: 'json'},  // 包含器材ID
        rentedFrom: { type: 'string'},  // 從何時租到何時，各個日期都是JS 的new Date()，訂單建立時才會加入，新增器材時先忽略
        monthlyDiscount	: { type: 'string'},  // 長租優惠比率
  
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

      if(inputs.monthlyDiscount == 1){
        let sqlTemp = `UPDATE public.equipt SET "monthlyDiscount" = null
        WHERE name ='${inputs.name}'`;
        let _delMonthly = await sails.sendNativeQuery(sqlTemp, []);

        if(_delMonthly.rowCount == 0){
          return exits.err({
            status: 'err',
            message: '刪除月租資訊失敗'
          });
        }
        delete inputs.monthlyDiscount;
      }
      let _update = await Equipt.update({
        name: inputs.name,
      }).set({
        name: inputs.rename,
        cat: inputs.cat,
        belong: inputs.belong,
        access: inputs.access,
        photo: inputs.photo,
        description: inputs.description,
        price: inputs.price,
        monthlyDiscount: inputs.monthlyDiscount,
        mount: inputs.mount,
        available: inputs.available,
        brand: inputs.brand,
        contains: inputs.contains,
        rentedFrom: inputs.rentedFrom
      }).fetch(); 
      

      // All done.
      if(_update)
      return exits.success();
  
      return exits.err();
  
    }
  
  
  };
  
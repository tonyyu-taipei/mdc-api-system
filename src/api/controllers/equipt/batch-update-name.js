module.exports = {


    friendlyName: 'Batch Update',
  
  
    description: 'Batch update the data of chosen equipt. using name',
  
  
    inputs: {
        name: { type: 'json',columnType:"array", required:true},  // -器材名稱/型號	
        cat: { type: 'number'},  // 分類索引ID		
        belong: { type: 'number'}, // 創立者ID
        access: { type: 'number'},  // 存取權限
        description: { type: 'string'},  // 器材介紹
        price	: { type: 'number'},  // 日租價
        brand	: { type: 'number'},  // 器材品牌名稱
        available	: { type: 'number'},  // 維護狀況
        photo: { type: 'string'},  // 器材圖片
        contains	: { type: 'string'},  // 包含器材ID
        rentedFrom: { type: 'string'},  // 從何時租到何時，各個日期都是JS 的new Date()，訂單建立時才會加入，新增器材時先忽略
        monthlyDiscount	: { type: 'string'},  // 長租優惠比率
    },
  
    
    exits: {
      success: {
        responseType: 'ok'
      },
      err: {
        responseType: 'err'
      },
      warning: {
        responseType: 'warning'
      }
    },
  
  
    fn: async function (inputs,exits) {
      var failed = 0; 
      inputs.name.forEach(async (name,index,arr)=>{
        try{ 
              await new Promise(async (resolve, reject)=>{
              var _update = await Equipt.update({
                name
              }).set({
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
              })
              if(_update){
                resolve(_update);
                if(index === arr.length-1){
                  doneFunc();
                }
              }else{
                reject("Error: Database cannot set the info that user provided");
              }
            })}catch(e){
              failed++;
              if(index === arr.length-1){
                doneFunc();
              }
            }
          })
      
      // All done.
      function doneFunc(){
        if(!failed)
          return exits.success();
          
          return exits.warning(
            `有${failed}個器材更動失敗，請檢查名稱是否正確或聯絡資訊人員。`
          )
    }
    }
  
  
  };
  
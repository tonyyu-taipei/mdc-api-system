module.exports = {


    friendlyName: 'Batch destroy',
  
  
    description: 'Batch destroy the data of chosen equipt. using ID',
  
  
    inputs: {
        id: {type:'json',columnType:'array',required:true}, // 器材ID
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
      for(let i in inputs.id){
        try {
              await new Promise(async (resolve, reject)=>{
              var _update = await Equipt.destroy({
                id:inputs.id[i]
              }).fetch()
              if(_update.length){
                resolve(_update);
                if(i == inputs.id.length-1){
                  doneFunc();
                }
              }else{
                reject("Error: Database cannot set the info that user provided");
              }
            })}catch(e){
              failed++;
              if(i == inputs.id.length-1){
                doneFunc();
              }
            }
      }
      
      // All done.
      function doneFunc(){
        if(!failed)
          return exits.success();
          
          return exits.warning(
            `有${failed}個器材更動失敗，請檢查ID是否正確或聯絡資訊人員。`
          )
    }
    }
  
  
  };
  
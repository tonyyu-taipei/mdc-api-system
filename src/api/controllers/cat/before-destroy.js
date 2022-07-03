module.exports = {


    friendlyName: 'Before Destroy',
  
  
    description: 'An API to warn admin the amount of cat will be destroyed.',
  
  
    inputs: {
  
      id: {type: 'number' , required: true},
  
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
  
      // 資料刪除
      const _cd = await Cat.findOne({id: inputs.id});
      if(!_cd){
        return exits.err(304);
      } 
      
      const _equipt = await Equipt.find({cat: inputs.id});
      if(_equipt.length)
      return exits.warning(
        `您確定要刪除本器材分類？尚有${_equipt.length}個器材在其中，刪除後將會移至「未分類」區。`
      )

      return exits.success();
  
    }
  
  
  };
  
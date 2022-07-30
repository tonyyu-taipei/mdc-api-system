module.exports = {


    friendlyName: 'delete coupon',
  
  
    description: 'A controller to destroy spefified coupon code',
  
  
    inputs: {
      id: {type: 'number' , required: true},
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
  
  
      let _res;
      
      // 資料刪除By ID
      _res = await Coupon.findOne({id: inputs.id});
        if(!_res){
         return exits.err(1);
      } 
      let _del;
  
        _del = await Coupon.destroy({ id: inputs.id}).fetch();

       return exits.success(_del);
  
  
  
    }
  
  
  };
  
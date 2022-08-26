
const rentedFromHandler = sails.helpers.rentedFromHelper;
module.exports = {


  friendlyName: 'Cancel',


  description: 'Cancel order.',


  inputs: {


    id: {type: 'number' , required: true}


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

    // 資料刪除
    const _od = await Order.findOne({id: inputs.id});
    if(!_od){
      return exits.err(504);
    } 
    
    
    const userID = this.req.session.user?.id;

    if(_od.userID !== userID){
      return exits.err(506);
    }

    let _ou;

    switch(_od.status){
      case 0:
        await rentedFromHandler;
        if(Array.isArray(_od.bundled))
        await rentedFromHandler("內附日期變更",_od.bundled, _od.bundled, [_od.from, _od.to], ["",""]);

        if(Array.isArray(_od.contains))
        await rentedFromHandler("借出日期變更",_od.contains, _od.contains, [_od.from, _od.to], ["", ""]);

        _ou = await Order.update({id: inputs.id}).set({status: 6}).fetch();
        break;
      case 1:
        _ou = await Order.update({id: inputs.id}).set({status: 16}).fetch();
        break;
      case 2:
        _ou = await Order.update({id: inputs.id}).set({status: 26}).fetch();
        break;
      default:
        return exits.err(507);
    }


    if(_ou){
      return exits.success(_ou)
    }

  }


};

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

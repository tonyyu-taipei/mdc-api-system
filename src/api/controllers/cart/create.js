module.exports = {


    friendlyName: 'Create',
  
  
    description: 'Create cart.',
  
  
    inputs: {
  
      id: {type: "number", required: true }, // 品牌名稱
  
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
  
    let cartArr = this.req.session.cart || [];
    let chkExist = cartArr.filter(data=>{
      return data === inputs.id;
    })
    

    if(chkExist.length)
    return exits.err(701);

    cartArr.push(inputs.id);
    this.req.session.cart = cartArr;
    return exits.success(this.req.session.cart);

  
    }
  
  
  };
  
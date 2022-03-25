const pricecalc = sails.helpers.pricecalc;
const differenceInDays = require("date-fns/differenceInDays")

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
    let cartObj = this.req.session.cart || {};
    let cartArr = cartObj.items || [];
    let chkExist = cartArr.filter(data=>{
      return data === inputs.id;
    })
    

    if(chkExist.length)
    return exits.err(701);

    let _exists = await Equipt.findOne({
      id: inputs.id
    }) 

    if(_exists)
    cartArr.push(inputs.id);
    else return exits.err(402);

    cartObj.items = cartArr


    if(this.req.session.dateRange)
    cartObj.price = await pricecalc(cartObj.items, Math.abs(differenceInDays(new Date(this.req.session.dateRange[0]),new Date(this.req.session.dateRange[1]) )))
    this.req.session.cart = cartObj;
    return exits.success(this.req.session.cart);

  
    }
  
  
  };
  
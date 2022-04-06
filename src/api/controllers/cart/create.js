const pricecalc = sails.helpers.pricecalc;
const differenceInDays = require("date-fns/differenceInDays")

module.exports = {


    friendlyName: 'Create',
  
  
    description: 'A tool to add the spec. id to the cart list. ',
  
  
    inputs: {
  
      id: {type: "number", required: true ,description:"The id of the equipment. This has to be a integer."}, // 器材ID
  
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

    //init cart with empty obj if it doesn't exist.
    let cartObj = this.req.session.cart || {};
    let cartArr = cartObj.items || [];

    // using filter method to check if the equipment exists in the cart.
    let chkExist = cartArr.filter(data=>{
      return data === inputs.id;
    })
    
    //if exists, send a prompt to the user saying it already exists.
    if(chkExist.length)
    return exits.err(701);

    // check if the id exists in Equipt.
    let _exists = await Equipt.findOne({
      id: inputs.id
    }) 

    // if exists, put the id in the cart 
    if(_exists)
    cartArr.push(inputs.id);
    else return exits.err(402);  // else prompt the user that the equipt doesn't exist.

    cartObj.items = cartArr

    //if the dateRange session exists, also send pricecalc the info to update the price in cart.
    if(this.req.session.dateRange){
      cartObj.price = await pricecalc(cartObj.items, Math.abs(differenceInDays(new Date(this.req.session.dateRange[0]),new Date(this.req.session.dateRange[1]) )),this.req.session.cart.coupon)
    }
    
    this.req.session.cart = cartObj;
    return exits.success(this.req.session.cart);

  
    }
  
  
  };
  
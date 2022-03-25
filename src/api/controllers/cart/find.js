const pricecalc = sails.helpers.pricecalc;
const differenceInDays = require("date-fns/differenceInDays");
module.exports={

    friendlyName: 'Find',
  
  
    description: 'Find cart.',
  
  
    inputs: {
  
  
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

        if(this.req.session.dateRange && this.req.session.cart)
        this.req.session.cart.price = await pricecalc(this.req.session.cart.items, Math.abs(differenceInDays(new Date(this.req.session.dateRange[0]),new Date(this.req.session.dateRange[1]) )))

        return exits.success(this.req.session.cart);

  
    }
  
  
  };
  
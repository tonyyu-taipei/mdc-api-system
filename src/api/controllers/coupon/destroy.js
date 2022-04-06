module.exports = {


    friendlyName: 'Destroy Coupon',
  
  
    description: 'An action to destroy coupon from user session',
  
  
    inputs: {
  
    },
  
  
    exits: {
  
      success:{
        responseType:"ok"
      },
      error:{
        responseType:"err"
      }
  
    },
  
  
    fn: async function (inputs, exits) {

        delete this.req.session.cart.coupon
        exits.success();
  
    }
  
  
  };
  
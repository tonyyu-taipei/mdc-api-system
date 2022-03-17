module.exports = {


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
  

        return exits.success(this.req.session.cart);

  
    }
  
  
  };
  
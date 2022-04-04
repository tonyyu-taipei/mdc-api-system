module.exports = {


  friendlyName: 'Destroy',


  description: 'Splice the cart.',


  inputs: {

    id: {type: 'number' , required: true, description:"the id that you wanna remove from the cart"},
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

    let requestedId = inputs.id;
    
    // get the cart session
    let requestArr = this.req.session.cart.items;

    let index = requestArr.indexOf(requestedId);

    //check if id exists in cart
    if(index == -1){
        exits.err(700)
    }else{
       // remove the id from cart
        this.req.session.cart.items.splice(index,1)
        exits.success(this.req.session.cart);

    }


  }


};

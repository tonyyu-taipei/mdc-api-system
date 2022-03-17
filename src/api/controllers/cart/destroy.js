module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy cart.',


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

    let requestedId = inputs.id;
    
    let requestArr = this.req.session.cart;

    let index = requestArr.indexOf(requestedId);

    if(index == -1){
        exits.err(700)
    }else{
        this.req.session.cart.splice(index,1)
        exits.success(this.req.session.cart);

    }


  }


};

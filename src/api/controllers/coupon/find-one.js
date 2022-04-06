const pricecalc = sails.helpers.pricecalc;
const differenceInDays = require("date-fns/differenceInDays");

module.exports = {


  friendlyName: 'Find one coupon code',


  description: '',


  inputs: {
    code:{ type:"string", required:true}

  },


  exits: {

    success:{
      responseType:"ok"
    },
    err:{
      responseType:"err"
    }

  },


  fn: async function (inputs, exits) {
    sails.log("Coupon Requested")
    let _res = await Coupon.findOne({
      code: inputs.code
    })
    // All done.
    if(_res){
      //add coupon code to the cart session
      try{
        this.req.session.cart.coupon = _res;
      }catch(e){
          return exits.err(802)
      }
      //success

    //if the dateRange session exists, also send pricecalc the info to update the price in cart.
    let cartObj = this.req.session.cart
    if(this.req.session.dateRange && this.req.session.cart){
      cartObj.price = await pricecalc(cartObj.items, Math.abs(differenceInDays(new Date(this.req.session.dateRange[0]),new Date(this.req.session.dateRange[1]) )),this.req.session.cart.coupon)
    }
      return exits.success(_res);
    }

      return exits.err(801);
  }


};

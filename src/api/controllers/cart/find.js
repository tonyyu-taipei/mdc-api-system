const pricecalc = sails.helpers.pricecalc;
const differenceInDays = require("date-fns/differenceInDays");
const startOfDay = require("date-fns/startOfDay");

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

        if(this.req.session.dateRange && this.req.session.cart){
          let from = startOfDay(new Date(this.req.session.dateRange[0]));  //init the date that the user selected
          let to = startOfDay(new Date(this.req.session.dateRange[1]));   // use start of day to ensure that the difference in days will be correct no matter of the time.

          this.req.session.cart.price = await pricecalc(this.req.session.cart.items, Math.abs(differenceInDays(from, to)))  //calculate the price using pricecal helpers. Sending the differences in date to the helpers.
        }
        try{
          this.req.session.dateRange[0]&& !this.req.session.dateRange[1] //test if dateRange session exists.
        }
        catch(err){

          // if not, send this msg.
          return exits.success({
            ...this.req.session.cart,
            msg:"Please make sure you have a valid date range selected",
            msgCH:"請確認您是否已經選取正確的借用日期範圍"
          })        
        }

        //success
        return exits.success({
          ...this.req.session.cart,
          msg:"Item added.",
          msgCH:"商品已加入清單"
        })        ;

  
    }
  
  
  };
  
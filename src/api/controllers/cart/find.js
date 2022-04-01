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

        try{
          this.req.session.dateRange[0]&& !this.req.session.dateRange[1]
        }
        catch(err){
          return exits.success({
            ...this.req.session.cart,
            msg:"Please make sure you have a valid date range selected",
            msgCH:"請確認您是否已經選取正確的借用日期範圍"
          })        
        }
        return exits.success({
          ...this.req.session.cart,
          msg:"Item added.",
          msgCH:"商品已加入清單"
        })        ;

  
    }
  
  
  };
  
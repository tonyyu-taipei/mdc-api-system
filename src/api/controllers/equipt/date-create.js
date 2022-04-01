
module.exports = {

    friendlyName:"DateRangeCreate",

    inputs:{

        range:{
            type: 'json',
            description: 'Array for range of date', 
            required: true
        }

    },

    exits:{

        success:{
            responseType: 'ok'
        },
        err:{
            responseType:"err"
        }

    },
    fn: async function(inputs, exits){
        const isFuture = require('date-fns/isFuture')
        const isToday = require('date-fns/isToday')
        const pricecalc = sails.helpers.pricecalc
        const differenceInDays = require('date-fns/differenceInDays');
        
        let reqRange = inputs.range;
        if(isToday(new Date(reqRange[0])) || isFuture(new Date(reqRange[0])) && isToday(new Date(reqRange[1])) || isFuture(new Date(reqRange[1]))){
            if(new Date(reqRange[1]).getTime() < new Date(reqRange[0]).getTime()){
                let temp = reqRange[1];
                reqRange[1] = reqRange[0];
                reqRange[0] = temp;
              }
            this.req.session.dateRange = reqRange;
            if(this.req.session.cart)
            this.req.session.cart.price = await pricecalc(this.req.session.cart.items, Math.abs(differenceInDays(new Date(this.req.session.dateRange[0]),new Date(this.req.session.dateRange[1]) )))
    
    
            return exits.success(reqRange);
        }else{
            return exits.err(600);
        }

    }

}

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
        const startOfDay = require('date-fns/startOfDay')
        
        let reqRange = inputs.range;
        if(isToday(new Date(reqRange[0])) || isFuture(new Date(reqRange[0])) && isToday(new Date(reqRange[1])) || isFuture(new Date(reqRange[1]))){
            if(new Date(reqRange[1]).getTime() < new Date(reqRange[0]).getTime()){
                let temp = reqRange[1];
                reqRange[1] = reqRange[0];
                reqRange[0] = temp;
              }
            await new Promise(resolve=>{

                reqRange.forEach((data,i,arr)=>{
                    reqRange[i] = startOfDay(new Date(data));
                    if(i == arr.length-1){
                        resolve();
                    }

                })
            })
            this.req.session.dateRange = reqRange;

    
            return exits.success(reqRange);
        }else{
            return exits.err(600);
        }

    }

}
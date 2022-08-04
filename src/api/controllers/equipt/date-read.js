

module.exports = {

    friendlyName:"DateRangeCreate",


    exits:{

        success:{
            responseType: 'ok'
        },
        err:{
            responseType:"err"
        }

    },
    fn: async function(NULL,exits){
    if(!this.req.session.dateRange){
            return exits.err(601)
        }
        
        const isPast = require('date-fns/isPast');
        const startOfDay = require('date-fns/startOfDay');
        const isValid = require('date-fns/isValid');
        const isSameDay = require('date-fns/isSameDay');

        let toSubmit = []

        await new Promise(resolve=>{
            if(Array.isArray(this.req.session.dateRange)){
                for(let i in this.req.session.dateRange){
                    let data = this.req.session.dateRange[i]

                    if(!isValid(new Date(data))){

                        resolve();
                    }
                    if(!isPast(startOfDay(new Date(data)))||isSameDay(startOfDay(new Date()),startOfDay(new Date(data)))){

                        toSubmit[i] = data;
                        if(i == this.req.session.dateRange.length-1){

                            resolve();

                        }

                    }
                    

                }
            }
        })

        return exits.success(toSubmit)

    }

}
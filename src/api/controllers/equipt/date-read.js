

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
        
        return exits.success(this.req.session.dateRange)

    }

}
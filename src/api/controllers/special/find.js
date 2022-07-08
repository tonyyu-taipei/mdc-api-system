module.exports = {
    friendlyName:"Find All Special",

    description:"Send All Special Events to Client",

    inputs:{},

    exits:{
        success:{
            responseType:'ok'
        },
        err:{
            responseType:'err'
        },
        warning:{
            responseType:"warning"
        }
    },
    
    fn: async function(inputs, exits){
        let _spe = await SpecialEvent.find({})
        
 
        if(_spe)
        return exits.success(_spe);

        return exits.err(1);

    }
}
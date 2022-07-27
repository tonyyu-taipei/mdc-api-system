module.exports = {
    friendlyName:"Find One Special",

    description:"Send All Special Events to Client",

    inputs:{
        id: {type:'string', required:true},
        
    },

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
        let _spe = await SpecialEvent.findOne({id: inputs.id})
        
 
        if(_spe)
        return exits.success(_spe);

        return exits.err(1);

    }
}
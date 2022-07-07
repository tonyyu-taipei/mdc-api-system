module.exports = {
    friendlyName:"Find All Special",

    description:"Send All Special Events to Client",


    exits:{
        ok:{
            responseType:'ok'
        },
        error:{
            responseType:'err'
        },
        warning:{
            responseType:"warning"
        }
    },
    
    fn: async function(exits){
        let _spe = await SpecialEvent.find({})
        
 
        if(_spe)
        return exits.success(_spe);

        return exits.error();

    }
}
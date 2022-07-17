module.exports={

    friendlyName:"DeleteEvent",

    description:"Delete the specified event data",

    inputs:{
        id:{type:"number", description:"The id of the event"}
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

        const _del = await SpecialEvent.destroy({ id : inputs.id }).fetch();

        if(_del){

            return exits.success(_del);

        }

        return exits.err(_del)
    }
    

}
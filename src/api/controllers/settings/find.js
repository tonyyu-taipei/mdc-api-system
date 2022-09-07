module.exports={

    friendlyName:"find settings",

    description:"An API to read the settings of the server",

    inputs:{},

    exits:{

        success:{
            responseType:'ok'
        },

        error:{
            responseType:'err'
        }

    },

    fn: async function(inputs, exits){

        let _fs = await Settings.find();

        return exits.success(_fs);

    }

}
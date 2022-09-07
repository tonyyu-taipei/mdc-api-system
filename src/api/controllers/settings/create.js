module.exports={

    friendlyName:"Initialize Settings",

    description:"Default Settings",

    inputs:{},

    exits:{

        error:{
            responseType:'err'
        },

        success:{
            responseType:"ok"
        }

    },

    fn: async function(inputs, exits){
        await Settings.destroy({})
        let _cs = await Settings.create({
            autocancel: true,
            autodone: true,
            donedays:2,
            canceldays:3,
            email:"info@mdcstudio.tw"
        }).fetch();

        return exits.success(_cs);

    }

}
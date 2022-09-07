module.exports={

    friendlyName:'Update Settings',

    description:'A tool to update server settings',

    inputs:{

        autodone:{
            type:"boolean"
        },
        donedays:{
            type:'number'
        },
        autocancel:{
            type:'boolean'
        },
        canceldays:{
            type:'number'
        },
        email:{
            type:"string"
        }

    },

    exits:{

        success:{
            responseType:'ok'
        },

        error:{
            responseType:'err'
        }

    },
    
    fn: async function(inputs, exits){

        let _us = await Settings.update({}).set({
            autodone: inputs.autodone,
            donedays: inputs.donedays,
            autocancel: inputs.autocancel,
            canceldays: inputs.canceldays,
            email: inputs.email
        }).fetch()

        return exits.success(_us);

    }

}
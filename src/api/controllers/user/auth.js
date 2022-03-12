module.exports={

    friendlyName:"UserAuthandication",

    inputs:{

        auth:{
            type:"string",
            required: true
        }

    },

    exits:{
        success:{
            responseType:"ok"
        },
        err:{
            responseType:"err"
        }
    },

    fn: async function(inputs, exits){
        let _findAuth = await User.findOne({
            auth: inputs.auth
        })
        if(_findAuth){
            let _auth = await User.update({
                where: {auth : inputs.auth}
            }).set({
                auth: '',
                verified: true
            })
            return exits.success("您的帳戶已經確認，您可以關掉此網頁了，謝謝！")
        }
        
        return exits.err(103)


    }


}
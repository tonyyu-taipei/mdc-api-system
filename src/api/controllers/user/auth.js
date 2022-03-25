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
            where:{auth: inputs.auth},
            select:['changeMail', 'id']
        })
        if(_findAuth.id && _findAuth.changeMail){
            await User.update({
                where: {auth: inputs.auth}
            }).set({
                user: _findAuth.changeMail,
                changeMail: undefined
            })
            return exits.success("您的帳戶已經確認，您可以關掉此網頁了，謝謝！")

        }
        if(_findAuth){
            await User.update({
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
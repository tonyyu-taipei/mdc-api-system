const bcrypt = require('bcrypt');
module.exports = {

    friendlyName:"Reset Password",

    inputs:{

        user:{

            type: "string",
            required: true
        },

        password:{
            type: "string",
            required:true
        },

        newPassword:{
            type: "string",
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

        let _select_u = await User.findOne({
            where:{user: inputs.user},
            select:['password']
        }).decrypt();

        if(!_select_u)
        return exits.err(104)
        // Use bcrypt to compare passwords
        if(!await bcrypt.compare(inputs.password, _select_u.password)){
            return exits.err(102)
        }
        // Use bcrypt to hash the new password
        const hashedPassword = await bcrypt.hash(inputs.newPassword, 10);
        let _chgPass = await User.updateOne({
            where:{ user: inputs.user}
        }).set({
            password: hashedPassword
        })

        if(_chgPass){
            sails.log('Updated the user ');
            return exits.success("密碼更改成功！")

        }
        return exits.err(107)
    }

}
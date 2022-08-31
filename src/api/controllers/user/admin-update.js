const bcrypt = require('bcrypt');
const random = (Math.random() + 1).toString(36).substring(2); 
const mail = sails.helpers.mailer;
module.exports={

    friendlyName:"UserUpdate",
    description:"A tool to let user update their info.",

    inputs:{

        id:{

            type:'number',
            example:1

        },
        user:{

            type: 'string',
            example:"tms106038@mediaschool.taipei"
        },
        name:{

            type:"string",
            example:"鍾宇棠",
            

        },
        phone:{

            type:"string",
            example:"0955911002"

        },
        password:{

            type:"string",

        },
        verified: {

            type:"boolean"

        },
        newPassword:{

            type:'string'

        },

        permission:{

            type:"number",
            example:1

        }
    },
    exits:{

        success:{
            responseType:'ok'
        },

        err:{
            responseType:'err'
        }

    },

    fn: async function(inputs, exits){

        //更改姓名與電話區
        if(inputs.name || inputs.phone){
            let chgName = await User.updateOne({
                id: inputs.id
            }).set({
                name: inputs.name,
                phone: inputs.phone,
                verified: inputs.verified
            })
            if(!chgName)
            return exits.err(109);
        }

            // Use bcrypt to hash the new password
        if(inputs.newPassword){
            const hashedPassword = await bcrypt.hash(inputs.newPassword, 10);
            let _chgPass = await User.updateOne({
                where:{ id: inputs.id}
            }).set({
                password: hashedPassword
            })

            if(_chgPass){
                sails.log('Updated the user ');

            }else{
                return exits.err(107)
            }
        }
        //欲更改Email需重寄確認信
        if(inputs.user){
            let _chkExists = await User.findOne({//檢查email是否已經存在
                user: inputs.user
            })
            
            let _chkChangeExists = await User.findOne({
                changeMail: inputs.user
            })

            let _uid = await User.findOne({id: inputs.id})

            if(_chkChangeExists)
            if(_chkExists || (_chkChangeExists.id != this.req.session.user.id))
            return exits.err(100);


            let chgMail = await User.updateOne({
                id: inputs.id
            }).set({
                changeMail:inputs.user,
                auth:random
            })
            if(chgMail){
            await mail(_uid.name, inputs.user, random, 1)
            }else{            
                return exits.err(107)
            }
            
        }

        if(inputs.permission !== undefined){
            sails.log(inputs.permission)
            if(inputs.permission == 0 || inputs.permission == 1|| inputs.permission == 2){
                let chgPermission = await User.updateOne({
                    id: inputs.id
                }).set({
                    permission: inputs.permission
                })
                if(!chgPermission){
                    return exits.err(109);
                }
            }else{
                return exits.err(109);
            }


        }

        return exits.success("請使用者確認資料是否更改成功。")
    }

}
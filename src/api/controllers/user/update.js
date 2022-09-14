const bcrypt = require('bcrypt');
const random = (Math.random() + 1).toString(36).substring(2); 
const mail = sails.helpers.mailer;
module.exports={

    friendlyName:"UserUpdate",
    description:"A tool to let user update their info.",

    inputs:{

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
            required: true

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

        if(inputs.user){
            inputs.user = inputs.user.toLowerCase();
        }
        let _chkPass = await User.findOne({
            where: {
                id: this.req.session.user.id
            },
            select:['password']
        }).decrypt();
        // Use bcrypt to compare passwords
        if(!await bcrypt.compare(inputs.password, _chkPass.password)){
            return exits.err(102);
        }
        //更改姓名與電話區
        let chgName = await User.updateOne({
            id: this.req.session.user.id
        }).set({
            name: inputs.name,
            phone: inputs.phone
        })
        if(chgName && !inputs.user){ //若只有要更改姓名及電話，本程式到此結束

            this.req.session.user = {
                id:chgName.id,
                user: chgName.user,
                name: chgName.name,
                phone: chgName.phone

            }

            return exits.success("使用者資料更改成功");

        }

        //欲更改Email需重寄確認信

        let _chkExists = await User.findOne({//檢查email是否已經存在
            user: inputs.user
        })

        
        
        let _chkChangeExists = await User.findOne({
            changeMail: inputs.user
        })
        if(_chkChangeExists)
        if(_chkExists || (_chkChangeExists.id != this.req.session.user.id))
        return exits.err(100);


        let chgMail = await User.updateOne({
            id: this.req.session.user.id
        }).set({
            changeMail:inputs.user,
            auth:random
        })
        if(chgMail){
        await mail(this.req.session.user.name, inputs.user, random, 1)

        delete this.req.session.user
        return exits.success("請前往信箱收取確認信");
        }
        
        return exits.err(107)
    }

}
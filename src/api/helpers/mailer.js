const fs = require('fs');
const nodemailer = require("nodemailer")


async function sendMail(to, subject, txt, html, response){
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAILHOST,
            port:465,
            auth:{
                user:process.env.MAILUSER,
                pass:process.env.MAILPASS
            }

        })
        let info = await transporter.sendMail({
            from: process.env.MAILFROM,
            to,
            subject,
            text:txt,
            html:html
        })
        response({
            code:200,
            msg:"success"
        })
    }catch(err){
        response({
            code:400,
            msg:err
        })
    }
}

module.exports = {
    friendlyName:"Account Mailer",
    
    description:"Send confirmation email to the user.",

    inputs:{

            name:{

                type:"string",
                example:"林睿寬",
                description:"The name of the user 用戶姓名",
                required: true
            },

            username:{

                type:"string",
                example:"tms106038@mediaschool.taipei",
                description:"The email address of the user. 用戶email",
                required:true
            },

            auth:{

                type:"string",
                example:"r32ghdnz83",
                description:"The auth code for forgot PWD and signing up 忘記密碼及註冊、更改電郵所使用之驗證碼",
                required:false
            },

            code:{

                type:"number",
                example:1,
                description:"The code for the type of email to send 欲發送電郵的代碼", 
                /*
                0: 註冊帳戶確認電郵
                */
                required:true

            }
        
    },

    fn: async function(inputs, exits){
        let temp = fs.readFileSync(__dirname+ "/templates/mail.txt");
        let tempStr = await temp.toString();
        let topic = "";
        let content = "";
        let contentTxt = ""
        switch(inputs.code){
            case 0: //註冊使用者確認信
                topic = `帳號確認信`;


                content = `${inputs.name}您好！<br>歡迎您加入MDC STUDIO的會員！<br><a href="https://api.mdcstudio.tw/api/user/auth/${inputs.auth}" style="text-decoration: none;color:#55BABB">請點擊此或下列連結</a>來開通您的帳號以享有所有服務<br><a href="https://api.mdcstudio.tw/api/user/auth/${inputs.auth}" style="text-decoration: none;color:#55BABB;">https://api.mdcstudio.tw/api/user/auth/${inputs.auth}</a><br><br>MDC STUDIO再次感謝您的加入，若有任何問題，歡迎聯絡我們，謝謝！`;


                contentTxt = `${inputs.name}您好！歡迎您加入MDC STUDIO的會員！請前往連結來開通您的帳號以享有所有服務：https://api.mdcstudio.tw/api/user/auth/${inputs.auth} MDC STUDIO再次感謝您的加入，若有任何問題，歡迎聯絡我們，謝謝！`;
            break;

            default:
            return exits.error("no email code specified.");
            
        }

        let html = tempStr.replace(/{{.content.}}/gm, content).replace(/{{.topic.}}/gm, topic)
        

        sendMail(inputs.username, topic, contentTxt, html, response=>{
            if(response.code == 200){
                exits.success(response.msg);
            }else{
                exits.error(response.msg)
            }
        })
            
        
        

    }
}
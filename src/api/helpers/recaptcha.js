const axios = require("axios");
const qs = require('qs');


module.exports = {

    friendlyName:"Recaptcha-Validation",
    description:"Validate the recaptcha request",

    inputs:{
        response:{
            type:"string",
            required:true
        }


    },


    fn:async function(inputs, exits){

    // Recaptcha 認證（在開發模式下不進行驗證）

        
        const _captcha = await axios({
        method: 'POST',
        url:'https://www.google.com/recaptcha/api/siteverify',
        data: qs.stringify({
            secret: process.env.recaptcha,
            response: inputs.recaptcha
        })
        }).then(res=>res).catch(()=>{
            return exits.error(105);
        })
        if(!_captcha.data.success)
        return exits.error(105);

        return exits.success();
        
    }


}
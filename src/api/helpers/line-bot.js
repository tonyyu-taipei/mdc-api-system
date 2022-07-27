module.exports={
    friendlyName:'Line Bot Helper',

    description:"A helper to send a line message to the admin",

    inputs:{
        message:{
            type:"string",
            required:true
        }
    },
    fn: async function(inputs,exits){

    const linebot = require('linebot')
    const bot = linebot({
        channelId:process.env.LINE_CHID,
        channelSecret:process.env.LINE_CHSECRET,
        channelAccessToken:process.env.LINE_CHTOKEN
    })
    let res = await bot.broadcast(`【器材系統訊息推播】\n${inputs.message}`);

    if(!res){
        return exits.error()
    }
    return exits.success();
    }
}

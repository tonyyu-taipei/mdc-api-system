const mail = sails.helpers.mailer;
const random = (Math.random() + 1).toString(36).substring(2); 
const recaptcha = sails.helpers.recaptcha
const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
module.exports = {


  friendlyName: 'Signup',


  description: 'Signup user.',


  inputs: {
    
    user: {type: "string", required: true }, // email
    password: {type: "string", required: true, encrypt: true} , // 密碼
    phone: {type: "string", required: true }, // 電話
    name: {type: "string", required: true }, // 名字
    recaptcha: {type:"string",required:true}

  },


  exits: {
    success: {
      responseType: 'ok'
    },
    err: {
      responseType: 'err'
    }
  },


  fn: async function (inputs,exits) {

   if (!emailRule.test(inputs.user)){
     return exits.err(108);
   }

    // 建立一筆使用者資料

    const _find = await User.findOne({
      user: inputs.user
    })
    if(_find)
    return exits.err(100)

    if(process.env.NODE_ENV =="production"){

      try{
        await recaptcha(inputs.recaptcha)
      }
      catch(err){
        return exits.err(105);
      }

    }


    const data = {
      user: inputs.user,
      password: inputs.password,
      phone: inputs.phone,
      name: inputs.name,
      auth: random
    }

    const _create = await User.create(data).fetch();

    // All done.
    
 

    await mail(inputs.name, inputs.user, random, 0)
    //TODO: 確認信連結確認API
    return exits.success({
      id: _create.id,
      user: _create.user,
      phone: _create.phone,
      name: _create.name,

    });

  }


};
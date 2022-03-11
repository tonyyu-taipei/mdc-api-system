const mail = sails.helpers.mailer;
const random = (Math.random() + 1).toString(36).substring(7); 
module.exports = {


  friendlyName: 'Signup',


  description: 'Signup user.',


  inputs: {
    
    user: {type: "string", required: true }, // email
    password: {type: "string", required: true, encrypt: true} , // 密碼
    phone: {type: "string", required: true }, // 電話
    name: {type: "string", required: true }, // 名字

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

    // 建立一筆使用者資料

    const _find = await User.findOne({
      user: inputs.user
    })
    if(_find)
    return exits.err(100)
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
    return exits.success(_create);

  }


};
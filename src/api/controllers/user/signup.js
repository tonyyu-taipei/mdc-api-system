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
    const data = {
      user: inputs.user,
      password: inputs.password,
      phone: inputs.phone,
      name: inputs.name,
    }

    const _create = await User.create(data).fetch();

    // All done.
    return exits.success(_create);

  }


};
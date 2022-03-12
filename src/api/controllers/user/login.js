const axios = require('axios');
const qs = require('qs');

module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    
    user: {type: "string", required: true, isNotEmptyString: true }, // email
    password: {type: "string", required: true, isNotEmptyString: true} , // 密碼
    recaptcha: {type: "string", required: true, isNotEmptyString: true}
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
    // 尋找使用者資料
    const _u = await User.findOne({
      // user: exits.user,
      // password: exits.password
      where: {user: inputs.user},
      select: ['user', 'password']
    }).decrypt();
    
    if (!_u) {
      return exits.err(103);
    }

    // 檢查密碼是否正確
    if (_u.password !== inputs.password) {
      return exits.err(102);
    }

    // Recaptcha 認證
    const _captcha = await axios({
      method: 'POST',
      url:'https://www.google.com/recaptcha/api/siteverify',
      data: qs.stringify({
        secret: process.env.recaptcha,
        response: inputs.recaptcha
    })
      }).then(res=>res)
      if(!_captcha.data.success)
      return exits.err(105)
    // 如果正確後生產Token
    await User_session.destroy({});
    const _session = await User_session.create({}).fetch();

    // All done.
    return exits.success({
      token: _session.token, 
      expiredAt: _session.expiredAt
    });




  }


};

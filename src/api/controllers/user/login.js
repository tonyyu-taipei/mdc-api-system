const axios = require('axios');
const qs = require('qs');

module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    
    user: {type: "string", required: true, isNotEmptyString: true }, // email
    password: {type: "string", required: true, isNotEmptyString: true} , // 密碼
    recaptcha: {type: "string", required: true, isNotEmptyString: true} //recaptcha驗證碼，開發模式下只需有數值即可
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
      select: ['user', 'password','name','permission']
    }).decrypt();
    
    if (!_u) {
      return exits.err(103);
    }

    // 檢查密碼是否正確
    if (_u.password !== inputs.password) {
      return exits.err(102);
    }


    // Recaptcha 認證（在開發模式下不進行驗證）
    if(process.env.NODE_ENV =="production"){

        
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

    }



    this.req.session.user = {
      user: _u.user,
      name: _u.name,
     };

    // 檢查是否是管理員
    if(_u.permission == 1){
      this.req.session.user.admin = true;
      this.req.session.user.adminClient = process.env.ADMINCLIENT;
    }


    // All done.
    return exits.success(this.req.session.user);




  }


};

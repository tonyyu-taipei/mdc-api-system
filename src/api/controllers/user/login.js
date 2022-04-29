const bcrypt = require('bcrypt');
const recaptcha = sails.helpers.recaptcha

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
      select: ['user', 'password','name','permission','phone','id']
    }).decrypt();
    
    if (!_u) {
      return exits.err(103);
    }

    //Using bcrypt to compare passwords
    const isValidPassword = await bcrypt.compare(inputs.password, _u.password);
    if (!isValidPassword) {
      return exits.err(102);
    }
    sails.log("The Password Gen. By bcrypt is:"+_u.password);


    // Recaptcha 認證（在開發模式下不進行驗證）
    if(process.env.NODE_ENV =="production"){

      try{
        recaptcha(inputs.recaptcha)
      }
      catch(err){
        sails.log(err);
        exits.err(105);
      }

    }



    this.req.session.user = {
      id:_u.id,
      user: _u.user,
      name: _u.name,
      phone: _u.phone
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

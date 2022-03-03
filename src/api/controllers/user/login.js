const axios = require('axios');
const qs = require('qs');
module.exports = {


  friendlyName: 'Login',


  description: '',


  inputs: {

    user: {type: 'string' , required: true},
    password: {type: 'string', required:true},
    recaptcha : {type:'string' , required:true}

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

    const _uf = await User.findOne({
      user: inputs.user,
    }).decrypt();
    if (!_uf) {
      //找不到該筆使用者
      return exits.err(103);
    }
  if(_uf.password != inputs.password){
    return exits.eff(102);
  }
    //recaptcha 認證
    const _captcha = await axios({
      method: 'POST',
      url:'https://www.google.com/recaptcha/api/siteverify',
      data: qs.stringify({
        secret: process.env.recaptcha,
        response: inputs.recaptcha
      })
    }).then(res=>res)
    if(_captcha.data.success == true)
    return exits.success(_uf);

    else
    return exits.err(105)


  }


};

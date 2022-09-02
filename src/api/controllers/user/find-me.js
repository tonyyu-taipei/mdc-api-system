module.exports = {


  friendlyName: 'Find me',


  description: '',


  inputs: {
    auth:{
      type:'string'
    }
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
    
    //  從 User Session 抓登入後的資料，顯示登入後的個人資料
    if(this.req.session.user?.id)
    return exits.success(this.req.session.user);
    else if(process.env.NODE_ENV !== "production" && inputs.auth){
      sails.log("Using AUTH...");
      var _u = await User.findOne({auth: inputs.auth})
      sails.log(_u)
      if(_u){
        var res = {
          id:_u.id,
          user: _u.user,
          name: _u.name,
          phone: _u.phone,
          auth: inputs.auth,
          verified: _u.verified
        }
      
        if(_u.permission == 1){
          res.admin = true;
          res.adminClient = process.env.ADMINCLIENT;
        
        }
        return exits.success(res);
      }
      else{
        return exits.error();
      }
    }else{
      return exits.success(this.req.session.user);
    }

  }


};

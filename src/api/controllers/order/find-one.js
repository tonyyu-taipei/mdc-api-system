module.exports = {


  friendlyName: 'Find one',


  description: '',


  inputs: {

    
    id: {type: 'number' , required: true}

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

    const _of = await Order.findOne({
      id: inputs.id
    });

    
    if (!_of) {
      return exits.err(502);
    }
    if(this.req.session?.user?.id ==_of.userID)
    return exits.success(_of);


    if(this.req.headers.auth && process.env.NODE_ENV != "production"){

      let _u = await User.findOne({auth: this.req.headers.auth});

      if(_u.id == _of.userID){
        return exits.success(_of)
      }

    }


    return exits.error(502);

  }


};

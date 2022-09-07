module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy user.',


  inputs: {

    id: {type: 'number' , required: true},

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

    // 資料刪除
    const _ud = await User.findOne({id: inputs.id});
    if(!_ud){
      return exits.err(104);
    } 
    await User.destroy({id: inputs.id});
    

    return exits.success({});

  }


};

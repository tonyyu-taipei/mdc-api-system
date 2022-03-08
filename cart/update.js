module.exports = {


  friendlyName: 'Update',


  description: 'Update cart.',


  inputs: {

    id: { type: 'number', autoIncrement: true, },
    cart: { type: 'number',  required: true , columnType:'int2' },

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

    // 利用ID找尋相關資料
    const _fc = await Cart.findOne({
      id: inputs.id
    })

    if(!_fc){
      return exits.err(503)
    }

    // 更新資料
    const _uc = await Cart.update({
      id: inputs.id
    }).set({
      cart: inputs.cart,
    }).fetch();

    return exits.success(_uc);

  }


};

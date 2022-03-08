module.exports = {


  friendlyName: 'Create',


  description: 'Create cart.',


  inputs: {

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


  fn: async function (inputs) {

    // 新增資料
    const _create = await Cart.createEach([inputs.cart]).fetch();
    

    return exits.success(_create);

  }


};

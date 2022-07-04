module.exports = {


  friendlyName: 'Update',


  description: 'Modify Brand Data',


  inputs: {

    id: { type: 'number', required: true, },
    brand: {type: "string", required: true }, // 品牌名稱

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
    const _fb = await Brand.findOne({
      id: inputs.id
    })

    if(!_fb){
      return exits.err(203)
    }

    // 更新資料
    const _ub = await Brand.update({
      id: inputs.id
    }).set({
      brand: inputs.brand,
      amount: inputs.amount
    }).fetch();

    return exits.success(_ub);

  }


};

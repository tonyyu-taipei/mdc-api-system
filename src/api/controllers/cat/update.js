module.exports = {


  friendlyName: 'Update',


  description: 'Update cat.',


  inputs: {

    id: {type: 'number' , required: true},
    name: {type: "string", required: true }, // 分類名稱(英文)
    chinese: {type: "string", required: true }, // 分類名稱(中文)

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
    const _fc = await Cat.findOne({
      id: inputs.id
    })

    if(!_fc){
      return exits.err(303)
    }

    // 更新資料
    const _fu = await Cat.update({
      id: inputs.id
    }).set({
      name: inputs.name,
      chinese: inputs.chinese
    }).fetch();

    return exits.success(_fu);

  }


};

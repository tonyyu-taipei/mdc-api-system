module.exports = {


  friendlyName: 'Create',


  description: 'Create cat.',


  inputs: {

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

    const data = {
      name: inputs.name,
      chinese: inputs.chinese
    }

    const _create = await Cat.create(data).fetch();

    // All done.
    return exits.success(_create);

  }


};

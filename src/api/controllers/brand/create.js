module.exports = {


  friendlyName: 'Create',


  description: 'Create brand.',


  inputs: {

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

    const data = {
      brand: inputs.brand,
    }

    const _create = await Brand.create(data).fetch();

    // All done.
    return exits.success(_create);

  }


};

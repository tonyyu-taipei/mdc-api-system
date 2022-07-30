module.exports = {


  friendlyName: 'Update Coupon',


  description: 'Update the  coupon',


  inputs: {

    id:{ type:"number", required: true, description: "The ID of the coupon"},
    code:{ type:'string',  description:"The coupon code"},
    from:{type:'string', description:"Valid from date (must be Javascript date readable)"},
    to:{type:"string", description:"Valid to date (must be Javascript date readable)", },

    includes:{type:"json", columnType: 'integer[]', description:"Includes equipt. ID array", example: [1,2,3]},
    discount:{type:"number", required:true, example: 0.5},
    description:{type:"string",description:"About the coupon"} 
  

  },


  exits: {
    success: {
      responseType: 'ok'
    },
    err: {
      responseType: 'err'
    }
  },

  fn: async function (inputs, exits) {

    const _find = await Coupon.findOne({id: inputs.id});
    if(!_find){
     return exits.error(1);
    }

    const _ud = await Coupon.updateOne({id: inputs.id}).set({
      code: inputs.code,
      from: inputs.from,
      to: inputs.to,
      includes: inputs.includes,
      discount: inputs.discount,
      description: inputs.discription
    })



    // All done.
    return exits.success(_ud);

  }


};

module.exports = {


  friendlyName: 'Create Coupon(Admin Only)',


  description: 'Create the coupon',


  inputs: {

    code:{ type:'string', required:true, description:"The coupon code"},
    from:{type:'string', description:"Valid from date (must be Javascript date readable)"},
    to:{type:"string", description:"Valid to date (must be Javascript date readable)", },

    includes:{type:"json", columnType: 'integer[]', description:"Includes equipt. ID array", example: [1,2,3]},
    discount:{type:"number", required:true, example: 0.5},
    description:{type:"string",description:"About the coupon"}

  },


  exits: {

    success:{
      responseType:'ok'
    },

    err:{
      responseType:"err"
    }

  },


  fn: async function (inputs, exits) {

    let data = {
      code : inputs.code,
      from : new Date(inputs.from).getTime()||undefined,
      to: new Date(inputs.to).getTime()||undefined,
      discount : inputs.discount,
      description: inputs.description

    }
    sails.log("coupon code genreating...")
    if(inputs.includes){
    await new Promise (resolve=>{

      inputs.includes.forEach(async(id, index, arr)=>{
        
        let _e = await Equipt.findOne({ id : id});
        if(_e){
          return exits.err(800);
        }

        if(index === arr.length - 1){
          resolve();
        }

      })    

  
    })

    data.includes = inputs.includes;

  }
    
    

    let _u = await Coupon.create(data).fetch();

    // All done.
    return exits.success(_u);

  }


};

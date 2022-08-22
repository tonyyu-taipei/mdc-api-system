module.exports = {


  friendlyName: 'destroy',


  description: 'destroy equipt.',


  inputs: {
    id: {type: 'number' },
    name: {type: 'string'}
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


    let _res;
    
    // 資料刪除By ID
    if(inputs.id){
    _res = await Equipt.findOne({id: inputs.id});
      if(!_res){
       return exits.err(404);
    } 
  }
    //資料刪除By Name

    if(inputs.name){
      _res = await Equipt.find({name: inputs.name})
      if(!_res){
        return exits.err(404);
      }
    }
    let _del;

    if(inputs.id){ 
      _del = await Equipt.update({ id: inputs.id}).set({active: false}).fetch();
    }
    else{
      _del = await Equipt.update({ name: inputs.name}).set({active: false}).fetch();
    }
    return exits.success(_del);



  }


};

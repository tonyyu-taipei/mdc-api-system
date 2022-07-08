module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy Brand.',


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
    const _cd = await Brand.findOne({id: inputs.id});
    if(!_cd){
      return exits.err(304);
    } 
    const _equipt = await Equipt.find({brand: inputs.id})
    let _noCat = await Brand.findOne({brand: "其他品牌"})
    if(_equipt){
      if(!_noCat){
      _noCat = await Brand.create({brand:"其他品牌"}).fetch();
      }

      await Equipt.update({brand: inputs.id}).set({brand : _noCat.id})

    }

    const _del = await Brand.destroy({id: inputs.id}).fetch();
    if(_del)
    return exits.success(_del);
    else
    return exits.err(304);



  }


};

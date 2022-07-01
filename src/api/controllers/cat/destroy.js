module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy cat.',


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
    const _cd = await Cat.findOne({id: inputs.id});
    if(!_cd){
      return exits.err(304);
    } 
    const _equipt = await Equipt.find({cat: inputs.id})
    let _noCat = await Cat.findOne({name: "uncategorized"})
    if(_equipt){
      if(!_noCat){
      _noCat = await Cat.create({name: "uncategorized", chinese:"未分類"}).fetch();
      }

      await Equipt.update({cat: inputs.id}).set({cat : _noCat.id})

    }

    const _del = await Cat.destroy({id: inputs.id}).fetch();
    if(_del)
    return exits.success(_del);
    else
    return exits.err(304);



  }


};

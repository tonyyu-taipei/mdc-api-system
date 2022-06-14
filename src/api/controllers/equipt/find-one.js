module.exports = {


  friendlyName: 'Find one',


  description: '',


  inputs: {

    id: {type: 'number' , required: true}

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

    const _ef = await Equipt.findOne({
      id: inputs.id
    });


    if (!_ef) {
      return exits.err(402);
    }

    //管理員仍能看到所有器材 available 2為隱藏，管理員將看到4為使用者隱藏的器材
    if(_ef.available == 2){
      if(!this.req.session.user?.admin)
      return exits.err(402);
    }
    
    return exits.success(_ef);

  }


};

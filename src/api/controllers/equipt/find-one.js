module.exports = {


  friendlyName: 'Find one',


  description: '',


  inputs: {

    id: {type: 'number'},
    name: { type:'string' },
    edit: {type:"boolean", defaultsTo:false}

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
    let _ef;
    // Search By ID
    if(inputs.id){
      _ef= await Equipt.findOne({
        id: inputs.id
      });
    }
    
    // Search By Name
    if(inputs.name){
      _ef = await Equipt.find({
        name: inputs.name
      })
    }


    if (!_ef) {
      return exits.err(402);
    }

    //管理員仍能看到所有器材 available 2為隱藏，管理員將看到4為使用者隱藏的器材
    if(_ef.available == 2){
      if(!this.req.session.user?.admin)
      return exits.err(402);
    }
    let closedCat = undefined;
    if(this.req.session.dateRange && !inputs.edit)
    closedCat = await sails.helpers.specialEventArrayHelper(this.req.session.dateRange);

    if(Array.isArray(closedCat) && closedCat.includes(_ef.cat) && !inputs.edit){
      _ef.available = 3;

    }
    
    return exits.success(_ef);

  }


};

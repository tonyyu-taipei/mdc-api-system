module.exports = {


  friendlyName: 'UpdateSpecial',


  description: 'Update special event using the specified id provided by the admin.',


  inputs: {
      id: {type:'number',required:true}, // 器材ID
      cat:{type:'string'},
      title:{type:"string"},
      description:{type:"string"},
      from:{type:"string"},
      to:{type:'string'},
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

    const isValid = require('date-fns/isValid');
    let validDate = isValid(new Date(inputs.from)) && isValid(new Date(inputs.to));
    let reqRange = [inputs.from,inputs.to];

    if(new Date(reqRange[1]).getTime() < new Date(reqRange[0]).getTime()){
        let temp = reqRange[1];
        reqRange[1] = reqRange[0];
        reqRange[0] = temp;
    }
    var _update;
    if(!validDate){
      _update = await SpecialEvent.updateOne({
      id:inputs.id
      }).set({
        closedCat:inputs.cat,
        title: inputs.title,
        description: inputs.description,
        from:reqRange[0],
        to: reqRange[1]
      })

    }else{
      _update = await SpecialEvent.updateOne({
      id:inputs.id
      }).set({
        title: inputs.title,
        description: inputs.description,
        closedCat:inputs.cat,
      })
    }


    // All done.
    if(_update)
    return exits.success(_update);

    return exits.err();

  }


};

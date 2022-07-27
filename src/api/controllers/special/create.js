module.exports={

    friendlyName:"create special events",

    description:"create special events in order to prevent users from using the system.",

    inputs:{
        title:{required:true, type:"string"},
        description:{type:"string"},
        from:{type:"string", required:true,description:"must be valid javascript new date()"},
        to:{type:"string", required:true,description:"must be valid javascript new date()"},
        closedCat:{type:"string", required:true, description:"use comma to select multiple cats. ALL to select all, NONE to select none."}
        
    },
    exits:{
        success:{
            responseType:'ok'
        },
        err:{
            responseType:'err'
        },
        warning:{
            responseType:'warning'
        }
    },
    fn: async function(inputs, exits){
        let startOfDay = require('date-fns/startOfDay')
        const isValid = require('date-fns/isValid');

        let validDate = isValid(new Date(inputs.from)) && isValid(new Date(inputs.to));
        if(!validDate)
        return exits.err(1000);

        let reqRange = [inputs.from,inputs.to];

        if(new Date(reqRange[1]).getTime() < new Date(reqRange[0]).getTime()){
            let temp = reqRange[1];
            reqRange[1] = reqRange[0];
            reqRange[0] = temp;
        }
        let _spe = await SpecialEvent.create({
        title: inputs.title,
        description: inputs.description,
        from: startOfDay(new Date(reqRange[0])),
        to: startOfDay(new Date(reqRange[1])),
        closedCat: inputs.closedCat

       }).fetch();

      if(_spe){
        return exits.success(_spe);
      } 
      return exits.err(1001);
    }
}
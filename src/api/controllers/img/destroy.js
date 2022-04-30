const fs = require('fs');
module.exports = {


    friendlyName: 'Destroy',
  
  
    description: 'Destroy Image',
  
  
    inputs: {
  
      title: {type: 'string' , required: true},
  
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
      const _cd = await Image.findOne({title: inputs.title});
      if(!_cd){
        return exits.err(902);
      } 
      
      const _del = await Image.destroy({title: inputs.title}).fetch();
      if(_del){
        try{
            await fs.unlinkSync(require('path').resolve(sails.config.appPath, 'assets/images/'+_cd.file));
        }
        catch(err){
            sails.log.error(err);
            return exits.err(903);
        }
        return exits.success(_del);
    
    }
      return exits.err(902);
  
  
  
    }
  
  
  };
  
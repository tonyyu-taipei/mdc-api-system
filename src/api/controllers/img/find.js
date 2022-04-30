module.exports = {


    friendlyName: 'Find all files',
  
  
    description: 'Find all files.',
  
  
    inputs: {
  
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
  
      // 尋找所有圖片資料
      const data = await Image.find({});
  
      // All done.
      return exits.success({data: data});
  
    }
  
  
  };
  
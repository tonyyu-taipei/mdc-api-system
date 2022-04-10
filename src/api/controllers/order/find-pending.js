module.exports = {


  friendlyName: 'Find Peding Order',


  description: "Find the order that's in the pending state",


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

    // 取得所有訂單資料
    const data = await Order.find({
      or:[
        {status: 0},
        {status: 1},
        {status: 16},
        {status: 26}
      ]
    });
      // 0 -訂單等待管理員確認中 
      // 1 -管理員已經正在聯絡中 
      // 2-聯絡完成，等待取件借用 
      // 3-借用中 
      // 4-已經歸還（訂單完成）
      // 5-	逾時 
      // 6-取消 
      // 16-於管理員已經正在聯絡中取消
      // 26-聯絡完成但使用者要求取消 

    // All done.

    return exits.success({data: data});

  }


};

module.exports = {


  friendlyName: 'Create',


  description: 'Create order.',


  inputs: {						
    name: { type: 'string', required: true, columnType:'varchar(10)' },  // 取件人名稱	
    useUD: { type: 'number', required: true , columnType:'int2' },  // 0- true 1- false
    notes: { type: 'number', required: true , columnType:'int2' },  // 備註		
    phone: { type: 'string', required: true, columnType:'text' },  // 聯絡電話	
    status: {type: 'number', required: true , columnType:'int2'},  // 0 -訂單等待管理員確認中 
                                                                    // 1 -管理員已經正在聯絡中 
                                                                    // 2-聯絡完成，等待取件借用 
                                                                    // 3-借用中 
                                                                    // 4-已經歸還（訂單完成）
                                                                    // 5-	逾時 
                                                                    // 6-取消 
                                                                    // 16-於管理員已經正在聯絡中取消 
   },                                                               // 26-聯絡完成但使用者要求取消
  
  exits: {
    success: {
      responseType: 'ok'
    },
    err: {
      responseType: 'err'
    }
  },


  fn: async function (inputs,exits) {

    const data = {
      notes: inputs.notes,
      useUD: inputs.useUD,
      phone: inputs.phone,
      name: inputs.name,
      status: inputs.status
    }

    const _create = await Order.create(data).fetch();

    // All done.
    return exits.success(_create);

  }


};

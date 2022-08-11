module.exports = {


  friendlyName: 'Update',


  description: 'Update order.',


  inputs: {			
    id:{type: 'number', required:true}, // 訂單ID
    name: { type: 'string',  columnType:'varchar(10)' },  // 取件人名稱	
    notes: { type: 'number',  columnType:'int2' },  // 備註		
    phone: { type: 'string',  columnType:'text' },  // 聯絡電話	
    status: {type: 'number',  columnType:'int2'},  // 0 -訂單等待管理員確認中 
                                                                    // 1 -管理員已經正在聯絡中 
                                                                    // 2-聯絡完成，等待取件借用 
                                                                    // 3-借用中 
                                                                    // 4-已經歸還（訂單完成）
                                                                    // 5-	逾時 
                                                                    // 6-取消 
                                                                    // 16-於管理員已經正在聯絡中取消
                                                                    // 26-聯絡完成但使用者要求取消
    contains: {type: 'json', columnType:"array"},
    bundled: {type:'json', columnType: 'array'},
    price:{type:'number'},
    from:{ type:"string"},
    to:{type:"string"},
    email:{type:"string"}

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


    // 利用ID找尋相關資料
    const _fo = await Order.findOne({
      id: inputs.id
    })

    if(!_fo){
      return exits.err(503)
    }

    // 更新資料
    const _uo = await Order.update({
      id: inputs.id
    }).set({
      notes: inputs.notes,
      useUD: inputs.useUD,
      phone: inputs.phone,
      name: inputs.name
    }).fetch();

    return exits.success(_uo);

  }


};

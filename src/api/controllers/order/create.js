module.exports = {


  friendlyName: 'Create',


  description: 'Create order.',


  inputs: {						
    name: { type: 'string', required: false, columnType:'varchar(10)' },  // 取件人名稱	
    useUD: { type: 'number', required: true , columnType:'int2' },  // 0- true 1- false
    notes: { type: 'number', columnType:'int2' },  // 備註		
    phone: { type: 'string', required: false, columnType:'text' },  // 聯絡電話	
      // 0 -訂單等待管理員確認中 
      // 1 -管理員已經正在聯絡中 
      // 2-聯絡完成，等待取件借用 
      // 3-借用中 
      // 4-已經歸還（訂單完成）
      // 5-	逾時 
      // 6-取消 
      // 16-於管理員已經正在聯絡中取消
      // 26-聯絡完成但使用者要求取消 
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
    const data = {
      notes: inputs.notes,
      phone: inputs.phone,
      name: inputs.name,

      contains:this.req.session.cart.items,
      price: this.req.session.cart.price,
      from: this.req.session.dateRange[0],
      to: this.req.session.dateRange[1],
      userID : this.req.session.user.id
    }

    if(inputs.useUD == 1){
      data.phone = this.req.session.user.phone;
      data.name = this.req.session.user.name;

    }


    const _create = await Order.create(data).fetch();

    // All done.
    return exits.success(_create);

  }


};

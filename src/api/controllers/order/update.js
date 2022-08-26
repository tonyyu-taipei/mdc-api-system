
const mailer = sails.helpers.mailer
const rentedFromHandler = sails.helpers.rentedFromHelper;
module.exports = {


  friendlyName: 'Update',


  description: 'Update order.',


  inputs: {			
    id:{type: 'number', required:true}, // 訂單ID
    name: { type: 'string',  columnType:'varchar(10)' },  // 取件人名稱	
    notes: { type: 'string'  },  // 備註		
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
    // 利用ID找尋相關資料
    const _fo = await Order.findOne({
      id: inputs.id
    })

    if(!_fo){
      return exits.err(503)
    }

    try{
      if(inputs.contains){

        if(inputs.from && inputs.to){

          await rentedFromHandler("借出器材",_fo.contains , inputs.contains, [_fo.from, _fo.to], [inputs.from, inputs.to]);

        }else{

          await rentedFromHandler("借出器材",_fo.contains , inputs.contains, [_fo.from, _fo.to], [_fo.from, _fo.to]); 

        }
      }else if(inputs.bundled){

        if(inputs.from && inputs.to){

          await rentedFromHandler("內附器材",_fo.bundled , inputs.bundled, [_fo.from, _fo.to], [inputs.from, inputs.to]);

        }else{

          await rentedFromHandler("內附器材",_fo.bundled , inputs.bundled, [_fo.from, _fo.to], [_fo.from, _fo.to]); 

        }
      }else if(inputs.from && inputs.to){
        if(Array.isArray(_fo.bundled))
        await rentedFromHandler("內附日期變更",_fo.bundled, _fo.bundled, [_fo.from, _fo.to], [inputs.from, inputs.to]);

        if(Array.isArray(_fo.contains))
        await rentedFromHandler("借出日期變更",_fo.contains, _fo.contains, [_fo.from, _fo.to], [inputs.from, inputs.to]);


      }else if(inputs.status == 6 && _fo.status != 6){
 
        if(Array.isArray(_fo.bundled))
        await rentedFromHandler("內附日期變更",_fo.bundled, _fo.bundled, [_fo.from, _fo.to], ["",""]);

        if(Array.isArray(_fo.contains))
        await rentedFromHandler("借出日期變更",_fo.contains, _fo.contains, [_fo.from, _fo.to], ["", ""]);

      }
    }catch(e){

      return exits.err({msgCH: e.raw})

    }
    
    if(inputs.status == 6){

      let _fu = await User.findOne({id: _fo.userID});
      await mailer(_fo.name,_fu.user, "ffffff", 3)

    }

    // 更新資料
    const _uo = await Order.update({
      id: inputs.id
    }).set({
      notes: inputs.notes,
      phone: inputs.phone,
      name: inputs.name,
      status: inputs.status,
      contains: inputs.contains,
      bundled: inputs.bundled,
      price: inputs.price,
      from: isValid(new Date(inputs.from))?inputs.from:undefined,
      to: isValid(new Date(inputs.to))?inputs.to:undefined,
 

    }).fetch();

    return exits.success(_uo);

  }


};

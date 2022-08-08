const mailer = sails.helpers.mailer
function isDateAvailable(inputedDate, rentedStr){
   const areIntervalsOverlapping = require('date-fns/areIntervalsOverlapping');
   if(!rentedStr){
    // sails.log("isDateAvailable RentedArr:", rentedStr);
    return false;
   }
  let rentedDate = rentedStr.split(',');

  //Debug
  // sails.log('MainArr',rentedDate);
  if(rentedDate.length == 1){
    return false;
  }

  let result = false;
  for(let index in rentedDate){
    if(index % 2 != 0){
      continue;
    }
    index = parseInt(index);
    // Debug
    // sails.log("inputedDate",inputedDate);
    // sails.log("rentedDate",index+","+rentedDate[index]+"\r\n",(index+1)+","+rentedDate[index+1]);
    try{
      let res = areIntervalsOverlapping({
        start:new Date(inputedDate[0]),end: new Date(inputedDate[1])
      },{
        start:new Date(rentedDate[index]), end: new Date(rentedDate[index+1])
      },{inclusive: true});

      if(result==false&&res==true){
        result=true;
      }
    }catch(e){
      // sails.log('Order Create isDateAvailable Func Error:');
      // sails.log(e);
      return true;
    }
} 
  // sails.log("isDateAvailable Returns:",result);
  return result;

}
function rentedDateHandler(original, toBeAdded){

  if(original){
    return original +","+ toBeAdded;
  
  }else{
    return toBeAdded;
  }

}
module.exports = {


  friendlyName: 'Create',


  description: 'Create order.',


  inputs: {						
    name: { type: 'string', required: false, columnType:'varchar(10)' },  // 取件人名稱	
    useUD: { type: 'boolean', required: true  },  // 0- true 1- false
    notes: { type: 'string' },  // 備註		
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
    },
    warning: {
      responseType: 'warning'
    }
  },


  fn: async function (inputs,exits) {
    const differenceInDays = require("date-fns/differenceInDays");
    const pricecalc = sails.helpers.pricecalc
    let price = 0;
    let from = new Date(this.req.session.dateRange[0]);
    let to = new Date(this.req.session.dateRange[1]);

    if(this.req.session.coupon !== void 0)
    price = await pricecalc(this.req.session.cart.items, Math.abs(differenceInDays(from, to)),this.req.session.cart.coupon)  //calculate the price using pricecal helpers. Sending the differences in date to the helpers.
    else
    price = await pricecalc(this.req.session.cart.items, Math.abs(differenceInDays(from, to)))  //calculate the price using pricecal helpers. Sending the differences in date to the helpers.

    let useUD = inputs.useUD? 1:0;
    // sails.log(useUD)
    const orderData = {
      notes: inputs.notes,
      phone: inputs.phone,
      name: inputs.name,

      contains:this.req.session.cart.items,
      price,
      from: this.req.session.dateRange[0],
      to: this.req.session.dateRange[1],
      userID : this.req.session.user.id
    }

    if(useUD === 1){
      orderData.phone = this.req.session.user.phone;
      orderData.name = this.req.session.user.name;

    }

    //Check If The Item In The ContainsArr Not Being Rented.
    for(let equipt of this.req.session.cart.items){
      let _e = await Equipt.findOne({id: equipt, available:0})
      if(!_e){
        return exits.error(402);
      }
      // sails.log("_e ",_e);
      let isAvailable =  isDateAvailable(this.req.session.dateRange,_e.rentedFrom);
      // sails.log(isAvailable)
      if(isAvailable)
      return exits.err(402);
    }

    let dateToString = this.req.session.dateRange.toString();
    var failedAttmpt = 0; 
    var warningContains = 0;
    for(let index in this.req.session.cart.items){
      let equipt = this.req.session.cart.items[index];
      await new Promise(async resolve=>{
        try{
          let _e = await Equipt.findOne({id: equipt})
          if(_e){
            if(_e.contains.length){
              await new Promise(async resolve=>{
                let bundled = [];
                for(let i in _e.contains){
                  let  data = _e.contains[i];
                  for(let ii in data){
                    let id = await Equipt.find({name: _e.contains[i][ii],available:0});
                    // sails.log(id);
                    let isAvailable =  isDateAvailable(this.req.session.dateRange,id[0].rentedFrom);
                    // sails.log(isAvailable);
                    if(id && !isAvailable){
  
                      sails.log("Contains To ADD ID:",id);
                      await Equipt.updateOne({id:id[0].id}).set({rentedFrom: rentedDateHandler(id[0].rentedFrom,dateToString)});
                      bundled.push(id[0].id)
                    }else{
                      if(orderData.notes)
                      orderData.notes = `系統訊息：\r\n注意：隨附${_e.contains[i][ii]}器材已經無剩餘器材，在審核過程時有可能將器材更換或取消器材\r\n`+orderData.notes;
                      else{
                        orderData.notes = `系統訊息：\r\n注意：隨附${_e.contains[i][ii]}器材已經無剩餘器材，在審核過程時有可能將器材更換或取消器材\r\n`;
   
                      }
                      // sails.log(orderData.notes);
                      warningContains = warningContains + 1;
                    }
                    
                  }
                  if(i ==(_e.contains.length-1)){
                    orderData.bundled = bundled;
                    resolve();
                  }
                }
              })
            }
  
            await Equipt.updateOne({id: equipt}).set({rentedFrom: rentedDateHandler(_e.rentedFrom,dateToString)})
          }else{
            throw "can't modify the specified Equipt."
          }
      }catch(e){
        failedAttmpt = failedAttmpt+ 1;
        // sails.log("Order System:");
        // sails.log(e);
      }
        if(index == (this.req.session.cart.items.length -1)){
          resolve();
        }
      })

    }
    const _create = await Order.create(orderData).fetch();
    // sails.log("Order Created:"+_create);
    // All done.
    try{
    await mailer(this.req.session.user.name,this.req.session.user.user, "ffffff", 2)
    }
    catch(err){
      return exits.err(err);
    }
    if(_create){  
      if(failedAttmpt)
      return exits.warning(`無法找到${failedAttmpt}個器材，詳情請洽管理員。`);
      if(warningContains)
      return exits.warning(`系統比對有${warningContains}個隨附器材無法出借，管理員將努力協助尋找替代器材。`);
      return exits.success(_create);
    }
    return  exits.err(501);
  }


};

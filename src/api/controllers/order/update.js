/**
 * 變更各項器材的RentedFrom（借出日期範圍）
 * @param {string} mode 變更器材的什麼部分，分為"contains"與"bundled"
 * @param {array} orgEquipt 訂單原有的器材陣列
 * @param {array} newEquipt 訂單欲變更的器材陣列，若純粹日期變更，請將此設為與orgEquipt相同
 * @param {array} origDate 訂單原本的借用日期範圍 [from, to]
 * @param {array} newDate 訂單欲變更的借用日期範圍(若無請直接複製origDate)  [from, to]
*/
async function rentedFromHandler(mode, orgEquipt, newEquipt, origDate , newDate){

  return new Promise(async (resolve, reject)=>{

    var errorEquipt = 0;
    for(let id of orgEquipt){
      
      let _equipt = await Equipt.findOne({id});

      let rentedFromArr = _equipt.rentedFrom.split(',');

      let i = 0;

      if(rentedFromArr.length){
        
        for(; i < rentedFromArr.length; i = i + 2){

          let resBool = isSameInterval([rentedFromArr[i], rentedFromArr[i+1]], [origDate[0], origDate[1]]);

          if(resBool){
            break;
          }

          if(i == (rentedFromArr.length-2) ){

            return reject(mode+"錯誤：無法找到相對應的日期範圍");

          }

        }
        //Old Arr Deleted
        rentedFromArr.splice(i, 2);

        let _up = await Equipt.update({id}).set({rentedFrom: rentedFromArr.toString()}).fetch();

        if(!_up){
          errorEquipt = errorEquipt + 1;
        }



      }
    }
    for(let id of newEquipt){
      
      let _equipt = await Equipt.findOne({id});

      let _up = await Equipt.update({id}).set({rentedFrom: rentedDateHandler(_equipt.rentedFrom, newDate.toString())}).fetch()

      if(!_up){
        errorEquipt = errorEquipt + 1;
      }


      
    }
  




    //end 
    if(errorEquipt > 0){
      return reject(`${mode}錯誤：${errorEquipt}個器材日期無法變更日期`)
    }
    resolve();
  })

}

/**
 * A Method To Add Date To A Existing DateRange
 * @param {string} original The original date (in string).
 * @param {string} toBeAdded The date ready to be added to.
 */
function rentedDateHandler(original, toBeAdded){

  if(original){
    return original +","+ toBeAdded;
  
  }else{
    return toBeAdded;
  }

}
/**
 * A method to test whether the given two values is the same interval. [from, to]
 * @param {array} valA Value A
 * @param {array} valB Value B 
 */
function isSameInterval(valA, valB){

  const isSameDay = require('date-fns/isSameDay');

  let aDate = [new Date(valA[0]), new Date(valA[1])];
  let bDate = [new Date(valB[0]), new Date(valB[1])];

  return isSameDay(aDate[0], bDate[0]) && isSameDay(aDate[1], bDate[1]);
  


}

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


      }
    }catch(e){

      return exits.err({msgCH: e})

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

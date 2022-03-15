module.exports = {


  friendlyName: 'Update',


  description: 'Update equipt.',


  inputs: {
      id: {type:'number',required:true}, // 器材ID
      name: { type: 'string'},  // -器材名稱/型號	
      cat: { type: 'number'},  // 分類索引ID		
      belong: { type: 'number'}, // 創立者ID
      access: { type: 'number'},  // 存取權限
      photo: { type: 'number'},  // 器材圖片
      description: { type: 'string'},  // 器材介紹
      price	: { type: 'number'},  // 日租價
      brand	: { type: 'number'},  // 器材品牌名稱
      available	: { type: 'number'},  // 維護狀況



      contains	: { type: 'string'},  // 包含器材ID
      rentedFrom: { type: 'string'},  // 從何時租到何時，各個日期都是JS 的new Date()，訂單建立時才會加入，新增器材時先忽略
      monthlyDiscount	: { type: 'string'},  // 長租優惠比率

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
    let _update = await Equipt.updateOne({
      id:inputs.id
    }).set({
      name: inputs.name,
      cat: inputs.cat,
      belong: inputs.belong,
      access: inputs.access,
      photo: inputs.photo,
      description: inputs.description,
      price: inputs.price,
      monthlyDiscount: inputs.monthlyDiscount,
      mount: inputs.mount,
      available: inputs.available,
      brand: inputs.brand,
      contains: inputs.contains,
    })

    // All done.
    if(_update)
    return exits.success();

    return exits.err();

  }


};

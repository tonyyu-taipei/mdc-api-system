module.exports = {


  friendlyName: 'Create',


  description: 'Create equipt.',


  inputs: {
    name: { type: 'string', required: true },  // -器材名稱/型號	
    cat: { type: 'number', required: true },  // 分類索引ID		
    belong: { type: 'number', required: true }, // 創立者ID
    access: { type: 'number', required: true },  // 存取權限
    photo: { type: 'number', required: true },  // 器材圖片
    description: { type: 'string', required: true },  // 器材介紹
    price	: { type: 'number', required: true },  // 日租價
    monthlyDIscount	: { type: 'string', required: true },  // 長租優惠比率
    mount	: { type: 'string', required: true },  // 相機/鏡頭接環規格	
    available	: { type: 'number', required: true },  // 相機/鏡頭接環規格	
    brand	: { type: 'number', required: true },  // 相機/鏡頭接環規格	
    contains	: { type: 'string', required: true },  // 相機/鏡頭接環規格	
    rentedFrom: { type: 'string', required: true },  // 從何時租到何時，各個日期都是JS 的new Date()
  },

  
  exits: {
    status: {
      responseType: 'ok'
    },
    err: {    
      responseType: 'err'
    }
  },


  fn: async function (inputs,exits) {

    // 新增資料

    const _create = await Equipt.create({
      name: inputs.name,
      cat: inputs.cat,
      belong: inputs.belong,
      access: inputs.access,
      photo: inputs.photo,
      description: inputs.description,
      price: inputs.price,
      monthlyDIscount: inputs.monthlyDIscount,
      mount: inputs.mount,
      available: inputs.available,
      brand: inputs.brand,
      contains: inputs.contains,
      rentedFrom: inputs.rentedFrom
    });
      
    // All done.
    return exits.success(
      _create
    );
  }


};

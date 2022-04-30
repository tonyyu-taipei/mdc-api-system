module.exports = {


  friendlyName: 'Create',


  description: 'Create equipt.',


  inputs: {
    name: { type: 'string', required: true },  // -器材名稱/型號	
    cat: { type: 'number', required: true },  // 分類索引ID		
    belong: { type: 'number', required: true }, // 創立者ID
    access: { type: 'number', required: true },  // 存取權限
    description: { type: 'string', required: true },  // 器材介紹
    price	: { type: 'number', required: true },  // 日租價
    brand	: { type: 'number', required: true },  // 器材品牌名稱
    available	: { type: 'number', required: true },  // 維護狀況


    photo: { type: 'string', required: false },  // 器材圖片
    contains	: { type: 'string', required: false },  // 包含器材ID
    rentedFrom: { type: 'string', required: false },  // 從何時租到何時，各個日期都是JS 的new Date()，訂單建立時才會加入，新增器材時先忽略
    monthlyDiscount	: { type: 'string', required: false },  // 長租優惠比率


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
    
    // 新增資料
    const _create = await Equipt.create({
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
      // rentedFrom: null
    }).fetch();
      
    // All done.
    return exits.success(
      _create
    );
  }


};

module.exports = {
    friendlyName:"pricecalc",

    description:"A tool to calculate the price of the equipment",

    inputs:{

        equiptId:{
            type: "json",
            example:[1,3,5,3],
            required: true
        },
        days:{
            type:"number",
            example: 30,
            required: true
        },
        coupon:{
            type:"json",
            description:"The obj of the coupon"
        }

    },

    fn: async function(inputs, exits){
        let equiptArr = inputs.equiptId
        let price = 0;
        let days = inputs.days?inputs.days:1;
        let coupon = inputs.coupon;
        await new Promise(resolve=>{
            //check if the array exists in the database
            //also fetch the price of the equipment.
            equiptArr.forEach(async function(data, index, arr){
                
                let _ud = await Equipt.findOne({
                    where:{id:data},
                    select:["price","monthlyDiscount"]
                })

                //if monthlyDiscount exists and days >= 30
                if(_ud.monthlyDiscount!==void 0 && days >= 30){

                    //if there is coupon and the coupon includes the equiptment(!-1)
                    if(coupon && coupon.includes.indexOf(data) !== -1 ){
                        price += _ud.price*_ud.monthlyDiscount * coupon.discount
                    }else if(coupon.includes == null){
                         price += _ud.price*_ud.monthlyDiscount*coupon.discount;
                    }else{
                        price += _ud.price*_ud.monthlyDiscount;
                    }
                
                }else{
                    //if the "includes" session in the coupon is null, discount all of the items.
                    if(coupon && !coupon.includes){
                        price += _ud.price * coupon.discount;
                    }else if(coupon && coupon.includes.indexOf(data) !== -1 ){
                        price += _ud.price*_ud.monthlyDiscount * coupon.discount
                    }else{
                        price += _ud.price;
                    }
                }
                sails.log(index)
                if(index == arr.length-1)
                resolve()
            })
        })


        
        return exits.success(await price*days)

        
        



        

    }
}
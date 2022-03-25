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
        }

    },

    fn: async function(inputs, exits){
        let equiptArr = inputs.equiptId
        let price = 0;

        await new Promise(resolve=>{

            equiptArr.forEach(async function(data, index){
                let _ud = await Equipt.findOne({
                    where:{id:data},
                    select:["price","monthlyDiscount"]
                })

                if(_ud.monthlyDiscount===void 0 && inputs.days >= 30){
                    price += _ud.price*_ud.monthlyDiscount;

                }else{
                    price += _ud.price
                }

                if(index >= equiptArr.length-1)
                resolve()
            })
        })
        return exits.success(await price*inputs.days)

        
        



        

    }
}
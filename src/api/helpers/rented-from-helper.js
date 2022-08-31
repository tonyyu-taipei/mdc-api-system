
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

/**
 * A Method To Add Date To A Existing DateRange
 * @param {string} original The original date (in string).
 * @param {string} toBeAdded The date ready to be added to.
 */
function rentedDateHandler(original, toBeAdded){
  if(toBeAdded==','){
    return original;
  }
  if(original){
    return original +","+ toBeAdded;
  
  }else{
    return toBeAdded;
  }

}

module.exports={
    friendlyName:'Rented From Helper',

    description:"A helper to edit the rentedFrom from the indiv. equipts",

    inputs:{
        mode:{
            type:"string",
            description:'變更器材的什麼部分，分為"contains"與"bundled"',
            required:true
        },
        orgEquipt:{
            type:"json",
            description:'訂單原有的器材陣列',
            required: true
        },
        newEquipt:{
            type:"json",
            description:'訂單欲變更的器材陣列，若純粹日期變更，請將此設為與orgEquipt相同',
            required: true
        },
        origDate:{
            type:"json",
            description:'訂單原本的借用日期範圍 [from, to]',
            required:true
        },
        newDate:{
            type:"json",
            description:'訂單欲變更的借用日期範圍(若無請直接複製origDate)  [from, to]',
            required:true
        }
    },
    fn: async function(inputs, exits){

        let res = await new Promise(async (resolve)=>{

            var errorEquipt = 0;
            for(let id of inputs.orgEquipt){
            
            let _equipt = await Equipt.findOne({id});

            if(!_equipt)
            return exits.error(inputs.mode+`錯誤：\r\n${id} 號器材無法讀取，致無法變更或釋出日期。`);

            let rentedFromArr = _equipt.rentedFrom.split(',');

            let i = 0;

            if(rentedFromArr.length){
                
                for(; i < rentedFromArr.length; i = i + 2){

                let resBool = isSameInterval([rentedFromArr[i], rentedFromArr[i+1]], [inputs.origDate[0], inputs.origDate[1]]);

                if(resBool){
                    break;
                }

                if(i == (rentedFromArr.length-2) ){

                    return exits.error(inputs.mode+"錯誤：無法找到相對應的日期範圍");

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
            for(let id of inputs.newEquipt){
            
            let _equipt = await Equipt.findOne({id});

            let _up = await Equipt.update({id}).set({rentedFrom: rentedDateHandler(_equipt.rentedFrom, inputs.newDate.toString())}).fetch()

            if(!_up){
                errorEquipt = errorEquipt + 1;
            }


            
            }
        




            //end 
            if(errorEquipt > 0){
                return exits.error(`${inputs.mode}錯誤：${errorEquipt}個器材日期無法變更日期`)
            }
            resolve();
        })

        return exits.success(res);

        }
    
}

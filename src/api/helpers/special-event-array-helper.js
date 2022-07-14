async function isWithInIntervalFunc(specialDate,dateRange){
    var areIntervalsOverlapping= require('date-fns/areIntervalsOverlapping');

    //date debug tool
    sails.log("=====special date =====");
    for(let data of specialDate){
        sails.log(new Date(data));
    }
    sails.log("===== dateRange =====");
    for(let data of dateRange){
        sails.log(new Date(data));
    }
    sails.log("Is it overlapping?");
    sails.log(!areIntervalsOverlapping(
        {start: new Date(dateRange[0]), end: new Date(dateRange[1])},
        {start: new Date(specialDate[0]), end: new Date(specialDate[1])},
        {inclusive: true}));
    return !areIntervalsOverlapping(
        {start: new Date(dateRange[0]), end: new Date(dateRange[1])},
        {start: new Date(specialDate[0]), end: new Date(specialDate[1])},
        {inclusive: true});


}
async function specialConvertCat(id){
        sails.log("Looking for: "+id);
        const _find = await SpecialEvent.findOne({ id });
        if(!_find){
            return 
        }
        if(_find.closedCat.toUpperCase() == "NONE"){
            return
        }

        if(_find.closedCat.toUpperCase() == "ALL"){
            let _allCat = await Cat.find({});
            return new Promise(resolve=>{
                let res = new Array();
                for(let cat in _allCat){
                    res.push(_allCat[cat].id);
                    if(cat == _allCat.length-1){
                        resolve(res);
                    }
                    
                }          
                
            }) 
            
        }
        sails.log('splitting...')
        let res = _find.closedCat.split(',');
        sails.log(res);
        return res;


    
}


module.exports = {

    friendlyName:"Special Event Array Helper",

    description:"A helper to help converting the string of closedCat in SpecialEvent to array",

    inputs:{
        session:{type:"json"}
    },

    fn: async function(inputs, exits){
        let _spe = await SpecialEvent.find({})

        let result = await new Promise(async(resolve)=>{
        if(Array.isArray(_spe)){
            let specialArr = [];
            for(let index in _spe){
                specialArr.push(await new Promise(async (resolve)=>{
                    sails.log("is array");
                    if(await isWithInIntervalFunc([_spe[index].from,_spe[index].to],inputs.session)){
                        sails.log('resolved');
                        resolve();
                    }
                    let sendback = await specialConvertCat(_spe[index].id);
                    sails.log("SendBack:");
                    sails.log(sendback);
                    resolve(sendback);

                }))
                if(index == (_spe.length-1)){
                    resolve(specialArr);
                }
        }
        }else{
            if(typeof _spe != undefined){
            isWithInIntervalFunc([_spe.from,_spe.to],inputs.session)?resolve(null):sails.log('within interval');
            resolve(await specialConvertCat(_spe.id));
            }
            resolve(null);
        }
        });
        sails.log();
        sails.log("result = ");
        sails.log(result)
        let outputArr = new Array();
        for(let index in result){
            for(let innerIndex in result[index]){
                if(!outputArr.includes(parseInt(result[index][innerIndex]))&&result[index][innerIndex]!==undefined){
                    outputArr.push(parseInt(result[index][innerIndex]));
                }
            }
        }
        sails.log();
        sails.log();
        sails.log("Final")
        sails.log(Promise.all(outputArr));
        return exits.success(Promise.all(outputArr))
        
        }

}
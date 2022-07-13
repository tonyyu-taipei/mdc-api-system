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
    return !areIntervalsOverlapping(
        {start: new Date(dateRange[0]), end: new Date(dateRange[1])},
        {start: new Date(specialDate[0]), end: new Date(specialDate[1])},
        {inclusive: true});


}
async function specialConvertCat(id){
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

        return await _find.closedCat.split(',');


    
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
            let specialArr = new Array();
            for(let index in _spe){
                sails.log("is array");
                if(await isWithInIntervalFunc([_spe[index].from,_spe[index].to],inputs.session)){
                    sails.log('resolved');
                    resolve();
                }
                specialArr.push(await specialConvertCat(_spe[index].id));
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
        if(result == undefined || result[0] === undefined)
        return exits.success();

        let outputArr = new Array();
        for(let index in result){
            for(let innerIndex in result[index]){
                if(!outputArr.includes(parseInt(result[index][innerIndex]))){
                    outputArr.push(parseInt(result[index][innerIndex]));
                }
            }
        }
        return exits.success(Promise.all(outputArr))
        
        }

}
module.exports={

    friendlyName: 'Find Occupied',
    description:"A tool to find out the order that its occupied by.",
    inputs:{
        from:{ type: 'string', required:true},
        to:{type:'string', required:true},
        id:{type:'number', required:true}
    },
    exits:{
        success:{
            responseType:'ok'
        },
        err:{
            responseType:'err',
        }
    },
    fn:async function(inputs,exits){
        const _of = await Order.find({
            from: inputs.from,
            to: inputs.to
        });
        if(!_of){
            return exits.err(502);
        }

        let res = [];

        await new Promise(resolve=>{
          for(let index in _of){
                let data = _of[index];
                if(Array.isArray(data.bundled) && data.bundled.includes(inputs.id)){
                    res.push(data);
                    continue;
                }
                if(Array.isArray(data.contains) && data.contains.includes(inputs.id)){
                    res.push(data);
                    continue;
                }
                if(index == (_of.length - 1)){
                    resolve();
                }
            }
        })
        return exits.success(res);
     }

}
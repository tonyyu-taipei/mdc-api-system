module.exports={

friendlyName: "Check The Ordering Status",

description: "Daily crontab job to check ORDER or EQUIPT",

inputs:{},

fn: async function(inputs, outputs){
    var serverLog = "Crontab Job Output:\n";
    var message = ""
    var dated=0, doned=0, error=0, toTake=0, toDated = 0;
    // 自動取消, 自動完成（逾時）,系統錯誤, 今日領取器材, 逾時通知
    const line = sails.helpers.lineBot;

    const format = require("date-fns/format")
    const startOfDay = require('date-fns/startOfDay');
    const differenceInDays = require("date-fns/differenceInDays");
    

    sails.log("cRONTAB JOB")
    let update = require('../controllers/order/update.js')

    // update.fn({id: 61, notes:"interesting"},{success: sails.log}) EXAMPLE

    const setting = await Settings.find({});
    const settings = setting[0]
    sails.log(settings);
    const today = startOfDay(new Date());
    let _fo = await Order.find({});
    message+=`${format(new Date(),"yyyy/MM/dd")}日報告：\n`

        await new Promise(async resolve=>{
            for(let index in _fo){
                let data = _fo[index];
                let from = new Date(data.from);
                let to = new Date(data.to);
                let differencesFrom = differenceInDays(today,from) 
                let differencesTo = differenceInDays(today,to) 


                //autocancel
                if(differencesFrom >= settings.canceldays && settings.autocancel && (data.status==0||data.status==1||data.status==2||data.status==16||data.status==26)){
                    await update.fn({id: data.id, status:6},{success:()=>{dated=dated+1},err:(log)=>{error = error +1; sails.log(`#${data.id}CRONERROR: `,log);}})
                }


                //autodone
                //if autodone = true, then the equipt. will change its status code to success.
                //if autodone = false, then the equipt. will change its status code to overtime
                if(differencesTo>= settings.donedays && data.status==3){
                    let statusCode = settings.donedays?4:5;

                    await update.fn({id: data.id, status:statusCode},{success:()=>{doned=doned+1},err:(log)=>{error = error +1; sails.log(`#${data.id}CRONERROR: `,log);}})
                }

                if(differencesFrom == -1  && data.status == 2){
                    toTake = toTake +1;
                }

                if(differencesTo > 0 && data.status == 3){
                    toDated = toDated + 1
                }

                if(index == (_fo.length-1)){
                    resolve();
                }
            }
        })
        if(settings.autodone){
        message += `有${dated?dated:0}個自動取消\n有${doned?doned:0}個訂單自動歸還\n\n今日有${toTake?toTake:0}個訂單待領取\n\n有${toDated?toDated:0}個訂單已逾時歸還。\n\n詳情請上管理系統`
        } else{
            message += `有${dated?dated:0}個自動取消\n有${doned?doned:0}個訂單自動改為逾時\n\n今日有${toTake?toTake:0}個訂單待領取\n\n有${toDated?toDated:0}個訂單已逾時歸還\n\n詳情請上管理系統。`
        }

        if(error)
        message += `\r註：發生${error?error:0}次系統錯誤，詳情請洽系統維護員。`

        sails.log(serverLog);
        sails.log("line Output:", message);
        if(dated || doned || toTake || toDated){
            await line(message)
        }


}

}
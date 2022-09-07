

async function callJob(){
    const sails = require('sails');
    //
    sails.after('hook:helpers:loaded',async function(){
        const delRented = sails.helpers.chkrent;
        await delRented();
    })
}

module.exports.cron ={
    checkRented: {
        schedule: '0 7 * * *',
        onTick: async ()=>{
            await callJob();
        },
        timezone:'Asia/Taipei',
        start: true,
    }
}
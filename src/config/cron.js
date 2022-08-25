

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
        schedule: '* * * * *',
        onTick: async ()=>{
            await callJob();
        },
        timezone:'Asia/Taipei',
        start: true,
    }
}
module.exports= async function(optional){

    let status = 403;
    let response = {};
    if(optional === undefined){
        response = {
            status:"error",
            msg:"You have no permission.",
            msgCH:"您沒有權限"
        }
    }else{
        response = {
            status:"error",
            msg:"Permission error",
            msgCH:optional
        }
    }

    this.res.status(status).json(response)

}
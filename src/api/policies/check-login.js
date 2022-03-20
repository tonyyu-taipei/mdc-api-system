module.exports= async function(req,res,next){

        if(req.session.user)
        return next();

        return res.forbidden("您尚未登入");
    }


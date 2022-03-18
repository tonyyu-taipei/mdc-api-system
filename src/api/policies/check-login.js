module.exports= async function(req,res,next){

        if(req.session.user)
        return next();

        return req.forbidden();
    }


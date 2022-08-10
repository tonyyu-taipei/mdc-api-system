module.exports= async function(req,res,next){

        if(req.session.user)
        return next();

        if(req.headers.auth && process.env.NODE_ENV !== "production"){
            let _u = await User.findOne({auth: req.headers.auth})
            if(_u){
                return next();
            }
        }

        return res.forbidden("您尚未登入");
    }


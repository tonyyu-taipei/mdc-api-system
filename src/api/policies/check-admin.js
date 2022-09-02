module.exports = async function (req, res, next) {
    try{
        sails.log(req.session.user)
        // sails.log("header:",req.headers.auth)
        if(req.session.user?.admin){
            sails.log(req.session.user)
            return next();
        }
        // let _u = await User.findOne({auth: req.headers.auth})
        // sails.log(_u);
        // if(_u.permission == 1 && process.env.NODE_ENV !== "production"){
        //     return next();
        // }else{
        //     throw "err";
        // }
    }
    catch(err){
        return res.forbidden("您不是管理員")
    }


}

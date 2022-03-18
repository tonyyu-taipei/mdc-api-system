module.exports = async function (req, res, next) {
    try{
    if(req.session.user.admin)
    return next();
    }
    catch(err){
        return res.forbidden("您不是管理員")
    }


}

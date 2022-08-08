module.exports= async function(req,res,next){
    if(req.session.user){
        let _u = await User.findOne({id: req.session.user.id})
        if(_u.verified){
            if(req.session.dateRange)
                if(req.session.cart)
                    return next()
        }else{
            return res.forbidden("帳戶尚未驗證，請至信箱收取確認信後再試。")
        }
    }
    return res.forbidden("請檢查是否有登入、日期範圍及購物車是否有資料。");
    

}
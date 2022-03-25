module.exports= async function(req,res,next){
    if(req.session.user){
        if(req.session.dateRange)
            if(req.session.cart)
                return next()
    }
    return res.forbidden("請檢查是否有登入、日期範圍及購物車是否有資料。");
    

}
module.exports={

    friendlyName: 'Find Contact',
    description:"A tool to fetch the email address of the user order",
    inputs:{
        id:{
            type:'number',
            required:true,
            description:"The id of the order",
        }
    },
    exits:{
        success:{
            responseType:'ok'
        },
        err:{
            responseType:'err',
        }
    },
    fn:async function(inputs,exits){
        const _of = await Order.findOne({
            id:inputs.id
        });
        if(!_of){
            return exits.err(502);
        }
    
       //Find the order and modify the Order status
       //change the status of the order to 1 representing that the order is being contacted.
       // Find the userID in the order and find the email address of the user.
       const _u = await User.findOne({
              id:_of.userID
         });
            if(!_u){
                return exits.err(506);
            }
        const _order = await Order.findOne({
            id:inputs.id
        }) 
        if(_order.status == 0){ // if the order status = 0, then change the status to 1
        const _orderUpdate = await Order.update({
            id:inputs.id
        }).set({
            status:1
        }).fetch(); 
        if(!_orderUpdate){
            return exits.err(503);  // if the order status is not updated, then return an error that the order id does not exist.
        }
    }


        let sendObj = { // return the email address of the user and also the order obj
            email:_u.user,
            ..._order
        }
        return exits.success(sendObj);
      // 0 -訂單等待管理員確認中 
      // 1 -管理員已經正在聯絡中 
      // 2-聯絡完成，等待取件借用 
      // 3-借用中 
      // 4-已經歸還（訂單完成）
      // 5-	逾時 
      // 6-取消 
      // 16-於管理員已經正在聯絡中取消
      // 26-聯絡完成但使用者要求取消 

    }

}
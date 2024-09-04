const User = require("../models/user");


async function requestFormatter(arr){
    let returnArr =[];
    try {
        for await(let id of arr){
            let query=User.findOne({_id:id});
            query.select("username name _id");
            let user=await query.exec();
            returnArr.push(user)
        }
    } catch (error) {
        console.log(error);
        
    }
    return returnArr;
}

exports.getUsers=async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.params.id})
        const users=await User.find({
            $and:[
                {_id:{$ne:user._id}},
                {_id:{$nin:user.friends}},
                {_id:{$nin:user.followRequestsReceived}},
                {_id:{$nin:user.followRequestsSent}},
            ]
        });
        res.send({users,msg:'Get All users'})
    } catch (error) {
        console.log(error);
    }
}

exports.getUserById=async(req,res)=>{
    try {
        const user=await User.findOne({
            _id:req.params.id
        })
        res.send({user,msg:"Get data By Id"});
    } catch (error) {
        console.log(error);
        
    }
}

exports.updateUser=async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.params.id,req.body)
        res.send("Updated")
    } catch (error) {
        console.log(error);
        
    }
}

exports.deleteUser=async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.send("Updated")
    } catch (error) {
        console.log(error);
        
    }
}

exports.receivedRequests=async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.userId});
        const receivedArray=user.followRequestsReceived;
        const received=await requestFormatter(receivedArray);
        res.send({received,msg:"Received Array"})
    } catch (error) {
        console.log(error);
    }
}

exports.sendFollowRequests=async(req,res)=>{
    try {
        let receiverId=req.params.id
        let senderId=req.userId
        const receiver=await User.findOne({_id:receiverId});
        const sender=await User.findOne({_id:senderId});

        await receiver.findByIdAndUpdate({
            followRequestsReceived:{$push:senderId}  
        })

        await sender.findByIdAndUpdate({
            followRequestsSent:{$push:receiverId}  
        })

    } catch (error) {
        console.log(error);
        
    }
}

exports.acceptRequest=async(req,res)=>{
    try {
        let senderId=req.params.id ;
        let receiverId=req.userId;
        const receiver=await User.findOne({_id:receiverId});
        const sender=await User.findOne({_id:senderId});
        
        
        await receiver.findByIdAndUpdate({
            friends:{$push:senderId}  
        })

        await sender.findByIdAndUpdate({
            friends:{$push:receiverId}  
        })

        let receiverArray=receiver.followRequestsReceived;
        let senderArray=sender.followRequestsSent;

        receiverArray=receiverArray.filter((ele)=>{
            if(ele!=senderId)
                return ele
        })

        senderArray=senderArray.filter((ele)=>{
            if(ele!=receiverId)
                return ele
        })

        await receiver.findByIdAndUpdate({
            followRequestsReceived:receiverArray 
        })

        await sender.findByIdAndUpdate({
            followRequestsSent:senderArray 
        })

    } catch (error) {
        console.log(error);
        
    }
}

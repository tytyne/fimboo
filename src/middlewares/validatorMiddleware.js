import {signup} from "../validation/user.validator"

export const validateSignup=(req,res,next)=>{

    const {email,password,firstname,lastname,username}=req.body;
    const vld=signup.validate({email,password,firstname,lastname,username})

    if(vld.error){
        return res.status(400).send(vld.error.details[0].message)
    }
    return next();
}

import Joi from "joi"

class UserValidation{
    static signup(req,res,next){
        const Schema=Joi.object({
            email:Joi.string().min(5).email().required().messages({
                "any.required": res.__('Email is required'),
                "string.empty": res.__('Email must not be empty'),
                "string.email": res.__('This is not a valid email address format'),
                "string.min": res.__(`Email should have a minimum length of {#limit}`)
            }),
            password:Joi.string().min(8).required().messages({
                "any.required": res.__('Password is required'),
                "string.empty": res.__('Password must not be empty'),
                "string.min": res.__(` Password should have a minimum length of {#limit}`)
            }),
            lastname:Joi.string().min(3).required().messages({
                "any.required": res.__('Lastname is required'),
                "string.empty": res.__('Lastname must not be empty'),
                "string.min": res.__(` Lastname have a minimum length of {#limit}`)
            }),
            firstname:Joi.string().min(3).required().messages({
                "any.required": res.__('Firstname is required'),
                "string.empty": res.__('Firstname must not be empty'),
                "string.min": res.__(`Firstname should have a minimum length of {#limit}`)
            }),
            username:Joi.string().min(5).required().messages({
                "any.required": res.__('Username is required'),
                "string.empty": res.__('Username must not be empty'),
                "string.min": res.__(`Username should have a minimum length of {#limit}`)
            }),
        })
        const result=Schema.validate(req.body);
        if(result.error){
            return res.status(400).json({ message: result.error.details[0].message }); 
        }
        next()

    }
    static login(req,res,next){
        const Schema=Joi.object({
            email:Joi.string().min(5).email().required().messages({
                "any.required": res.__('Email is required'),
                "string.empty": res.__('Email must not be empty'),
                "string.email": res.__('This is not a valid email address format'),
                "string.min": res.__(`Email should have a minimum length of {#limit}`)
            }),
            password:Joi.string().min(8).required().messages({
                "any.required": res.__('Password is required'),
                "string.empty": res.__('Password must not be empty'),
                "string.min": res.__(` Password should have a minimum length of {#limit}`)
            }),
        })
        const result=Schema.validate(req.body);
        if(result.error){
            return res.status(400).json({ message: result.error.details[0].message }); 
        }
        next()

    }
    static passwordTemplate(req,res,next){
        const Schema=Joi.object({
          
            password:Joi.string().min(8).required().messages({
                "any.required": res.__('Password is required'),
                "string.empty": res.__('Password must not be empty'),
                "string.min": res.__(` Password should have a minimum length of {#limit}`)
            }),
            confirmPassword:Joi.string().min(8).required().messages({
                "any.required": res.__('ConfirmPassword is required'),
                "string.empty": res.__('ConfirmPassword must not be empty'),
                "string.min": res.__(` ConfirmPassword should have a minimum length of {#limit}`)
            }),
        })
        const result=Schema.validate(req.body);
        if(result.error){
            return res.status(400).json({ message: result.error.details[0].message }); 
        }
        next()

    }
    static changePasswordTemplate(req,res,next){
        const Schema=Joi.object({
            oldPassword:Joi.string().min(8).required().messages({
                "any.required": res.__('OldPassword is required'),
                "string.empty": res.__('OldPassword must not be empty'),
                "string.min": res.__(` OldPassword should have a minimum length of {#limit}`)
            }),
            newPassword:Joi.string().min(8).required().messages({
                "any.required": res.__('NewPassword is required'),
                "string.empty": res.__('NewPassword must not be empty'),
                "string.min": res.__(`NewPassword should have a minimum length of {#limit}`)
            }),
            confirmPassword:Joi.string().min(8).required().messages({
                "any.required": res.__('ConfirmPassword is required'),
                "string.empty": res.__('ConfirmPassword must not be empty'),
                "string.min": res.__(` ConfirmPassword should have a minimum length of {#limit}`)
            }),
        })
        const result=Schema.validate(req.body);
        if(result.error){
            return res.status(400).json({ message: result.error.details[0].message }); 
        }
        next()

    }







    static emailVerify(req,res,next){
        const Schema=Joi.object({
            email:Joi.string().min(5).email().required().messages({
                "any.required": res.__('Email is required'),
                "string.empty": res.__('Email must not be empty'),
                "string.email": res.__('This is not a valid email address format'),
                "string.min": res.__(`Email should have a minimum length of {#limit}`)
            }),
        })
        const result=Schema.validate(req.body);
        if(result.error){
            return res.status(400).json({ message: result.error.details[0].message }); 
        }
        next()
    }
}

export  default UserValidation
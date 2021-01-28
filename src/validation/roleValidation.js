import  Joi from "joi"

class RoleValidator{
    static role(req,res,next){
        const Schema=Joi.object({
          
            name:Joi.string().min(5).required().messages({
                "any.required": res.__('Name is required'),
                "string.empty": res.__('Name must not be empty'),
                "string.min": res.__(` Name should have a minimum length of {#limit}`)
            }),
            description:Joi.string().min(8).required().messages({
                "any.required": res.__('Description is required'),
                "string.empty": res.__('Description must not be empty'),
                "string.min": res.__(` Description have a minimum length of {#limit}`)
            }),
       
        })
        const result=Schema.validate(req.body);
        if(result.error){
            return res.status(400).json({ message: result.error.details[0].message }); 
        }
        next()

    }

}

export  default RoleValidator
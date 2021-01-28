import Joi from "joi"

class BusinessCategoryValidator{
    static category(req,res,next){
        const Schema=Joi.object({
          
            name:Joi.string().min(8).required().messages({
                "any.required": res.__('Name is required'),
                "string.empty": res.__('Name must not be empty'),
                "string.min": res.__(` Name should have a minimum length of {#limit}`)
            }),
            shortcode:Joi.string().min(3).required().messages({
                "any.required": res.__('Shortcode is required'),
                "string.empty": res.__('Shortcode must not be empty'),
                "string.min": res.__(` Shortcode have a minimum length of {#limit}`)
            }),
       
        })
        const result=Schema.validate(req.body);
        if(result.error){
            return res.status(400).json({ message: result.error.details[0].message }); 
        }
        next()

    }

}

export  default BusinessCategoryValidator
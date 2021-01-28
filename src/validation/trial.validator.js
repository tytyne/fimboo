import responseMsg from "../../heplpers/responseMsg";

import joi from "joi";
export default (req, res, next) => {
  const {email, } = req.body;
  const user = {
   
    email,
  
  };
  const schema = joi.object().keys({
   
    email: joi
      .string()
      .email()
      .required()
      .messages({
        'string.base': 'email must be a string',
        'string.email': 'email must be a valid email',
        'any.required': 'email is required',
        'string.empty': 'email is not allowed to be empty'
      }),
  
  });
  const { error} = joi.validate(user, schema);
  if (error) {
    // responseMsg.errorMsg(res, 400, error.messages);
    return res.status(400).json(error.messages)
  }
 
    next();
  
};

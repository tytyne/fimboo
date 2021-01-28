import UserService from "../services/user.service.js";
import customMessage from "../utils/customMessage.js";
import helper from "../utils/helpers.js";
import responses from "../utils/responses.js";
import statusCode from "../utils/statusCode.js";
import Mailer from "../utils/mail/mailer";
import {jwtToken} from "../utils/jwt.utils.js"


const { createUser,getUserByIdOrEmail,updateUser } = UserService;
const { hashPassword } = helper;
const { signedup,accountVerified,emailAssociate,thisAccountVerified,resend,userVerification} = customMessage;
const { created,ok,badRequest } = statusCode;
const { successResponse,errorResponse } = responses;

/**
 * @description this controller deals with user signup
 */
export default class UserControllers {
/**
   * @description this controller saves/signup a user in database
   * @param {object} req request
   * @param {object} res response
   * * @param {object} next jump to error
   * @return {object} return json object with signup message
   */
  static async signup(req, res,next) {

    try{
      const formData = req.body;
      const textPassword = formData.password;
      formData.password = hashPassword(textPassword);
      const user = await createUser(formData);
      const token = jwtToken.createToken(user);

      const mail = new Mailer({
        to: `${user.username} <${user.email}>`,
        header: 'Confirm your email',
        messageHeader: `Hi, <strong>${user.firstname}!</strong>`,
        messageBody: 'You are requesting to confirm your email, Click the following Button to confirm your email.',
        optionLink: `${process.env.APP_URL}/api/${process.env.API_VERSION}/user/confirmation/${token}`,
        browserMessage:`If that doesn't work, copy and paste this link into your browser`,
        Button:true
      });
      mail.InitButton({
        text: 'Confirm Your Email',
        link: `${process.env.FRONTEND_URL}/api/${process.env.API_VERSION}/confirmEmail?email=${user.email}&token=${token} `
      });
      await mail.sendMail();
      
      return successResponse(res, created, token, signedup, user);
    }


 
  
    catch(e){
      return next(new Error(e))
    }
  }

  /**
   * @description this controller confirm the email
   */
  static async confirmation(req,res,next){

    try{
      const {token}=req.params
      const decoded = jwtToken.verifyToken(token);
      const user=await getUserByIdOrEmail(decoded.email)
      const mail = new Mailer({
        to: `${user.username} <${user.email}>`,
        header: 'Thank you for confirmation',
        messageHeader: `Hi, <strong>${user.firstname}!</strong>`,
        messageBody: 'Thank you for confirming your email,your email confirmed successfully.',
        browserMessage:"",
        Button:"",
        optionLink:""
      });
    
      await mail.sendMail();

      if(user.dataValues.isVerified) 
      return successResponse(res,badRequest,userVerification);
      const userUpdated=await updateUser(decoded)
      // adding thank you message
      const { id,email,} = userUpdated[1];
      return successResponse(res,ok,undefined,accountVerified)
    
    }
    catch(e){
      return next(new Error(e))
    }
  

  }
    /**
   * @description this controller resend confirmation link to the email 
   */
  static async resend(req,res,next){
    try{
      const{email}=req.body
      const user= await getUserByIdOrEmail(email)
      if(!user) return errorResponse(res,badRequest,emailAssociate)
      if(user.isVerified) return errorResponse(res,badRequest,thisAccountVerified)
      const token = jwtToken.createToken(user)
      const mail = new Mailer({
        to: `${user.username} <${user.email}>`,
        header: 'Confirm your email',
        messageHeader: `Hi, <strong>${user.firstname}!</strong>`,
        messageBody: 'You are requesting to confirm your email, Click the following Button to confirm your email.',
        optionLink: `${process.env.APP_URL}/api/${process.env.API_VERSION}/user/confirmation/${token}`,
        browserMessage:`If that doesn't work, copy and paste this link into your browser`,
        Button:true
      });
      mail.InitButton({
        text: 'Confirm Your Email',
        link: `${process.env.FRONTEND_URL}/api/${process.env.API_VERSION}/confirmEmail?email=${user.email}&token=${token} `
      });
      await mail.sendMail();

      return successResponse(res,ok, token,resend,user);

    }
    catch(e){
      return next(new Error(e))
    }

  }

}
import EmployeeService from "../services/user.service";
import customMessage from "../utils/customMessage";
import helper from "../utils/helpers";
import responses from "../utils/responses";
import statusCode from "../utils/statusCode";
import Mailer from "../utils/mail/mailer";
import {jwtToken} from "../utils/jwt.utils"
import roleService from "../services/roleService";
import{addEmailToMailchimp} from "../utils/mailchimp"
import errorMessage from "../utils/errorMessage";
import redisClient from "../database/redisConfig"
import hash from "../utils/helpers"
const { decryptPassword } = hash


const { createEmployee,getEmployeeByIdOrEmail,updateEmployee,getEmployeeByUsernameOrEmail} = EmployeeService;
const { hashPassword } = helper;
const { signedup,accountVerified,resend,userVerification,loggedin,passwordReset,passwordUpdated} = customMessage;
const{emailAssociate,thisAccountVerified,emailOrUsernameNotFound,accountNotVerified,emailOrPasswordNotFound,accountNotActivated,passwordMatch,noEmailAssociate}=errorMessage
const {ok,badRequest,unAuthorized,notFound,created } = statusCode;
const { successResponse,errorResponse } = responses;


const {passwordReset,passwordUpdated} = customMessage;
const{passwordMatch,noEmailAssociate}=errorMessage

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

    // try{
      const formData = req.body;
      const textPassword = formData.password;
      formData.password = hashPassword(textPassword);
      const roleName = "BusinessOwner";
      const role = await roleService.findRoleByName(roleName);
      if (!role) {
        console.log(`FATAL: create ${roleName} role first of all.[In your terminal, run:  'sequelize db:seed:all  ']`);
        return;
      }
      formData.roleId = role.id
      const user = await createEmployee(formData);
      console.log(user)
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
      // await addEmailToMailchimp(user.email,user.firstname,user.lastname)
      
      return successResponse(res, created, token, signedup, user);
    // }

    // catch(e){
    //   return next(new Error(e))
    // }
  }


  /**
   * @description this controller confirm the email
   */
  static async confirmation(req,res,next){

    try{
      const {token}=req.params
      const decoded = jwtToken.verifyToken(token);
      const user=await getEmployeeByIdOrEmaill(decoded.email)
      if(user.isVerified){
        console.log(user.isVerified)
        return errorResponse(res,badRequest,thisAccountVerified);
      }
    
      else{
        const mail = new Mailer({
          to: `${user.username} <${user.email}>`,
          header: 'Thank you for confirmation',
          messageHeader: `Hi, <strong>${user.firstname}!</strong>`,
          messageBody: 'Thank you for confirming your email,your email confirmed successfuly.',
          browserMessage:"",
          Button:"",
          optionLink:""
        });
      
        await mail.sendMail();
        const userUpdated = await updateEmployee(decoded)
        console.log(userUpdated)
        // adding thank you message
        const { id,email,isVerified} = userUpdated[1];
        return successResponse(res,ok,undefined,accountVerified)
      
      }


      
    }
    catch(e){
      return next(new Error(e))
    }
  

  }
    /**
   * @description this controler resend confirmation link to the email 
   */
  static async resend(req,res,next){
    try{
      const{email}=req.body
      const user= await getEmployeeByIdOrEmail(email)
      if(!user) return errorResponse(res,badRequest,emailAssociate)
      if(user.isVerified){
        return errorResponse(res,badRequest,thisAccountVerified);

      } 
      else{
        const token = jwtToken.createToken(user)
        const mail = new Mailer({
          to: `${user.username} <${user.email}>`,
          header: 'Confirm your email',
          messageHeader: `Hi, <strong>${user.firstname}!</strong>`,
          messageBody: 'You are requesting to confirm your email, Click the folowing Button to confirm your email.',
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
      
    }
    catch(e){
      return next(new Error(e))
    }

  }


  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
      
     const  user = await getEmployeeByUsernameOrEmail(email);
  
      if (!user)
      {
        return errorResponse(res,badRequest,emailOrUsernameNotFound);
      }
      if (user.isVerified === false)
      {
        return errorResponse(res,unAuthorized,accountNotVerified);
      }
      if (user.status !== 'active')
      {
        return errorResponse(res,unAuthorized,accountNotActivated,);
      }
      const decryptedPassword = await decryptPassword(password, user.password);
      if (!decryptedPassword) {
        return errorResponse(res,notFound,emailOrPasswordNotFound);
      }
      const token = jwtToken.createToken(user)
      return successResponse(res,ok, token , loggedin, user);
    }


    catch (err) {
      return next(new Error(err));
    }


  }
  static async forgetPassword(req,res,next){
    try{

        const{email}=req.body
        const user= await getUserByEmail(email)
        if(!user) return errorResponse(res,notFound,noEmailAssociate);
        const token = jwtToken.createToken(user)
      
        const mail = new Mailer({
            to: `${user.username} <${user.email}>`,
            header: 'Forget password',
            messageHeader: `Hi, <strong>${user.firstname}!</strong>`,
            messageBody: 'You are requesting to reset your password, Click the folowing Button to reset your password.',
            optionLink: `${process.env.APP_URL}/api/${process.env.API_VERSION}/reset_password/${token}`,
            browserMessage:`If that doesn't work, copy and paste this link into your browser`,
            Button:true
          });
          mail.InitButton({
            text: 'Reset password',
            link: `${process.env.FRONTEND_URL}/api/${process.env.API_VERSION}/resetPassword?email=${user.email}&token=${token} `
          });
          await mail.sendMail();
        return successResponse(res,ok,token,passwordReset,user);
    }
    catch(e){
        return next(new Error(e))
    }

}
    /**
     * @description reset password
     * @param {object} req request 
     * @param {*} res  response
     * @param {*} next checking error
     * @return passwordMatch error
     * 
     */
static async resetPassword(req,res,next){

    try{
        const {password,confirmPassword} = req.body;
          if (password !== confirmPassword) return errorResponse(res,badRequest,passwordMatch);
        const { token } = req.params;
        const decoded = jwtToken.verifyToken(token);
        const user= await getUserByEmail(decoded.email)
        const mail = new Mailer({
            to: `${user.username} <${user.email}>`,
            header: 'Reset Password',
            messageHeader: `Hi, <strong>${user.firstname}!</strong>`,
            messageBody: 'Thank you for Resetting your password,your password has been reset successfuly.',
            browserMessage:"",
            Button:"",
            optionLink:""

          });
        
          await mail.sendMail();
        const hash = hashPassword(password);
        const updatedUser= await updatePassword(hash,decoded)
        
        return successResponse(res,ok,undefined,passwordUpdated);
    }
    catch(e){
        return next(new Error(e))
    }

    }


}
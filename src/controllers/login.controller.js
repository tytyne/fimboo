
import UserService from "../services/user.service";
import { jwtToken } from "../utils/jwt.utils"
import customMessage from "../utils/customMessage.js";
import statusCode from "../utils/statusCode.js"
import responses from "../utils/responses.js"
const {ok,badRequest,unAuthorized,notFound } = statusCode;
const { successResponse,errorResponse} = responses;
import hash from "../utils/helpers"
const { decryptPassword } = hash
const { getUserByUsernameOrEmail } = UserService;
const {emailNotFound,emailOrUsernameNotFound,accountNotVerified,loggedin,emailOrPasswordNotFound} = customMessage;

class loginController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
     const  user = await getUserByUsernameOrEmail(email);
      if (!user)
      {
        return errorResponse(res,badRequest,emailOrUsernameNotFound);
      }
      if (user.isVerified === false)
      {
        return errorResponse(res,unAuthorized,accountNotVerified);
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
}
export default loginController
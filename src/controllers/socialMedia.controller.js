import AuthServices from "../services/auth.service.js";
import {jwtToken} from "../utils/jwt.utils";

import customMessage from "../utils/customMessage.js";
import responses from "../utils/responses.js";
import statusCode from "../utils/statusCode.js";
const { signedIn } = customMessage;
const { ok } = statusCode;
const { successResponse } = responses;
/**
 * @class socialMediaController
 * @classdesc This controller deals with social media auth
 */
export default class socialMediaController {
  /**
   * @description this function is invoked upon successfull oauth login
   * @param {object} req request
   * @param {object} res response
   * @return {object} returns an object containing a success message and token
   */
  static async loginCallback(req, res) {
    try {
      AuthServices.getOrCreateUser(req.user)
        .then((userData) => {
          const {
            password,
            createdAt,
            updatedAt,
            ...user
          } = userData[0].dataValues;
          const token = jwtToken.generateToken(user);
          console.log(token)
        
          return successResponse(res, ok, token, signedIn,user);
        })
        .catch((err) => {
          res.status(500).json({
            message: err,
          });
        });
    } catch (error) {
      throw error;
    }
  }
}

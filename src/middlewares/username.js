import UserServices from "../services/user.service";
import customMessage from "../utils/customMessage";
import responses from "../utils/responses";
import statusCode from "../utils/statusCode";

const {checkUsername } = UserServices;
const { errorResponse } = responses;
const { conflict } = statusCode;
const { duplicateUsername } = customMessage;

const checkUsernameExist = async (req, res, next) => {
  const user = await checkUsername(req.body.username);
  if (user) {
    return errorResponse(res, conflict, duplicateUsername);
  }
  return next();
};

export default { checkUsernameExist };
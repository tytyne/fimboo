import UserService from "../../services/user.service";
import customMessage from "../../utils/customMessage";
import errorMessage from "../../utils/errorMessage"
import statusCode from "../../utils/statusCode";
import responses from "../../utils/responses";
import hash from "../../utils/helpers";
import { uploadToCloud } from '../../utils/cloud';
const { ok, badRequest, notFound } = statusCode;
const { successResponse, errorResponse } = responses;
const { retrieveUserById, getUserByEmail, getAllUsers, updateUserInfo, changingPassword, updateRememberMe } = UserService;
const { requestedUser, passwordChanged, profileUpdated, stateRemember,stateNotRemember } = customMessage;
const { userNotFound, profileFailed, passwordMatch, noUsersFound, passwordIncorrect, passwordSimilarity, wrongParameters } = errorMessage
const { hashPassword, decryptPassword, changeDate } = hash

class profileController {

    static async me(req, res, next) {
        try {
            const userEmail = req.user.email

            const userInfo = await getUserByEmail(userEmail)

            if (!userInfo)
                return errorResponse(res, notFound, userNotFound);
            else

                return successResponse(res, ok, requestedUser, userInfo)

        }

        catch (err) {
            return next(new Error(err));
        }
    }

    static async viewProfile(req, res, next) {

        const { id } = req.params;

        const userInfo = await retrieveUserById(id)
        try {

            if (userInfo != null)

                return successResponse(res, ok, undefined, requestedUser, userInfo)
            else

                return errorResponse(res, notFound, userNotFound)
        }
        catch (err) {
            return next(new Error(err));
        }
    }

    static async editProfile(req, res, next) {

        try {


            const newProfileInfo = req.body

            const profileImage = await uploadToCloud(req.file, res);
            if (req.body.firstname) newProfileInfo.firstname = req.body.firstname
            if (req.body.lastname) newProfileInfo.lastname = req.body.lastname
            // if (req.body.username) newProfileInfo.username = req.body.username     
            if (req.body.gender) newProfileInfo.gender = req.body.gender
            if (req.body.birthdate) newProfileInfo.birthdate = req.body.birthdate
            if (req.body.nationality) newProfileInfo.nationality = req.body.nationality
            if (req.body.country) newProfileInfo.country = req.body.country
            if (req.body.province) newProfileInfo.province = req.body.province
            if (req.body.district) newProfileInfo.district = req.body.district
            if (req.body.phone) newProfileInfo.phone = req.body.phone
            if (req.body.preferedLanguage) newProfileInfo.preferedLanguage = req.body.preferedLanguage
            if (req.body.proffession) newProfileInfo.proffesion = req.body.proffession
            if (req.body.password) delete newProfileInfo.password
            if (req.body.email) delete newProfileInfo.email
            let birthDate = newProfileInfo.birthdate
            const resultDate = changeDate(birthDate)
            newProfileInfo.age = resultDate
            newProfileInfo.profilePicture = profileImage.url

            const dbResponse = await updateUserInfo(newProfileInfo, req.user.userId)
            if (dbResponse)

                return successResponse(res, ok, undefined, profileUpdated, dbResponse)

            else

                return errorResponse(res, badRequest, profileFailed)

        }
        catch (err) {
            return next(new Error(err))
        }

    }
    static async allProfile(req, res, next) {

        try {
            const allUsers = await getAllUsers()
            if (allUsers.length === 0)
                return errorResponse(res, badRequest, noUsersFound)
            else
                return successResponse(res, ok, undefined, undefined, allUsers)
        }
        catch (err) {
            return next(new Error(err))
        }
    }

    static async changePassword(req, res, next) {
        try {

            const { oldPassword, newPassword, confirmPassword } = req.body
            const checkUser = await getUserByEmail(req.user.email)
            const decryptedPassword = await decryptPassword(oldPassword, checkUser.password);
            if (!decryptedPassword)
                return errorResponse(res, badRequest, passwordIncorrect)
            if (newPassword === oldPassword)
                return errorResponse(res, badRequest, passwordSimilarity)
            if (newPassword !== confirmPassword)
                return errorResponse(res, badRequest, passwordMatch)
            const hashing = hashPassword(newPassword);
            const updatedPassword = await changingPassword(hashing, req.user.userId);
            return successResponse(res, ok, undefined, passwordChanged, updatedPassword)
        }
        catch (err) {
            return next(new Error(err))
        }


    }
    static async rememberProfile(req, res, next) {
        try {
            const userId = req.user.userId
            console.log(req.user)
            const { state } = req.params
            if (state === 'true' || state === 'false') {
                await updateRememberMe(userId, state)
                // return res.status(200).json({
                //     status: 200,
                //     message:
                //         state === 'true'
                //             ? 'your profile will be remembered on your next request initiation'
                //             : 'your profile will not be remembered on your next request initiation'
                // });
                return successResponse(res,ok,undefined, state === 'true' ? stateRemember : stateNotRemember,undefined)
            }
            

            return errorResponse(res, badRequest,  wrongParameters)
        }
        catch (err) {
            return next(new Error(err))
        }



    }
}

export default profileController
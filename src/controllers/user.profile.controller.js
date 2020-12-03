import UserService from "../services/user.service";
import customMessage from "../utils/customMessage.js";
import errorMessage from "../utils/errorMessage"
import statusCode from "../utils/statusCode.js";
import responses from "../utils/responses.js";
import helper from "../utils/helpers";
const {ok,badRequest,unAuthorized,notFound } = statusCode;
const { successResponse,errorResponse} = responses;
const { retrieveUserById,getUserByEmail,getAllUsers,updateUserInfo,changingPassword} = UserService;
const {loggedin} = customMessage;
const {emailNotFound,emailOrUsernameNotFound,accountNotVerified,emailOrPasswordNotFound} =errorMessage
const{hashPassword,decryptPassword,changeDate}=helper

class profileController{

    static async me(req,res,next){
        try{
            const userEmail=req.user.email

            const userInfo= await getUserByEmail(userEmail)
           
            if(!userInfo)res.status(404).json({"message": "user Not Found"})  
        
            else
                res.status(200).json({"requested user" : userInfo}) 
            
        }

        catch(err){
            return next(new Error(err));
        }
    }

    static async viewProfile(req,res,next){

        const{id}=req.params;

        const userInfo = await retrieveUserById(id)
        try{
            
            if ( userInfo != null) res.status(200).json({"requested user" : userInfo})
             else 
                res.status(404).json({"message":"userNotFound"})   

        }
        catch (err) {
            return next(new Error(err));
          }   
    }
  
    static async editProfile(req,res,next){

        const newProfileInfo = req.body

        if (req.body.username) newProfileInfo.username = req.body.username     
        if (req.body.gender) newProfileInfo.gender = req.body.gender     
        if (req.body.birthdate) newProfileInfo.birthdate = req.body.birthdate    
        if (req.body.nationality) newProfileInfo.nationality = req.body.nationality    
        if (req.body.country)  newProfileInfo.country = req.body.country  
        if (req.body.province) newProfileInfo.province = req.body.province    
        if (req.body.district)  newProfileInfo.district = req.body.district   
        if (req.body.phone)  newProfileInfo.phone = req.body.phone 
        if (req.body.proffession)  newProfileInfo.proffesion = req.body.proffession     
        if (req.body.password) delete newProfileInfo.password
        if (req.body.email) delete newProfileInfo.email
        let birthDate=newProfileInfo.birthdate
        
        // let birthday=new Date(birthDate)
        // let ageDifMs = Date.now() - birthday.getTime();
        // let  ageDate = new Date(ageDifMs); // miliseconds from epoch
        // let result=Math.abs(ageDate.getUTCFullYear() - 1970);
        const resultDate = changeDate(birthDate)
        console.log(resultDate)
        newProfileInfo.age = resultDate
        const dbResponse = await updateUserInfo(newProfileInfo, req.user.id)
        if (dbResponse) res.status(200).json(dbResponse)
            
        else 
            res.status(400).send({"message" : "updateFailed"})

    }
    static async allProfile(req,res,next){

        try{
            const allUsers = await getAllUsers()
            if(allUsers.length === 0) return res.status(400).json({"message":"no users found"})
            else
                return res.status(200).json({allUsers})
            
        }
        catch(err){
            return next(new Error(err))
        }  
    }

    static async changePassword(req,res,next){
        try{

            const {oldPassword,newPassword,confirmPassword}=req.body
            const checkUser= await getUserByEmail(req.user.email)
            const decryptedPassword = await decryptPassword(oldPassword,checkUser.password);
            if (!decryptedPassword) return res.status(400).json("password is incorect");
            if(newPassword === oldPassword) return res.status(400).json("it seems like old password,choose another one!")
            if(newPassword!==confirmPassword) return res.status(400).json("password does not match")
            const hash = hashPassword(newPassword);
            const userId = req.user.id
            const updatedPassword = await changingPassword(hash,userId);
            return res.status(200).json({message:"password changed succesfully!"})
        }
        catch(err){
            return next(new Error(err))
        }


    }
}

export default profileController
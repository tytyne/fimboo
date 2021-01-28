import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const jwtToken={
    createToken({id,email,roleId,status}){
        return jwt.sign(
            {userId:id,email,roleId,status},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"24h"}
        )
    },
    verifyToken(token){
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"24h"});
        return decoded;
    }
};
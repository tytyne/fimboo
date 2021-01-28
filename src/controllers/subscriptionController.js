
import {addEmailToMailchimp,unscribeToMailchimp} from "../utils/mailchimp"

class Subscription{

    static subscribe(req,res){
      
        try{
            const{email,firstname,lastname}=req.body
            addEmailToMailchimp(email,firstname,lastname)
        

        }
        catch(e){
            return next(new Error(e))
        }

    }
    static unsubscribe(req,res){
      
        try{
            const{email} = req.body
            unscribeToMailchimp(email) 
         

        }
        catch(e){
            return next(new Error(e))
        }

    }


}
export default Subscription
import request from "request"
import dotenv from "dotenv"

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

const addEmailToMailchimp = (email,firstname,lastname)=>{

    const data = {
        members:[{
            email_address:email,
            status:'subscribed',
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname
             
            }
        }
           
        ],
        "update_existing":true
    }
    const postData = JSON.stringify(data)
    const options = {
        url: `https://us1.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}`,
        method: 'POST',
        headers: {
            Authorization: `auth ${MAILCHIMP_API_KEY}`,
        },
        body:postData
    }
    request(options,(error,response,body)=>{
        if(error)
        throw new Error(error)
       
    })



}
 const unscribeToMailchimp = (email,firstname,lastname)=>{

    const data = {
        members:[{
            email_address:email,
            status:'unsubscribed',
            // merge_fields:{
            //     FNAME:firstname,
            //     LNAME:lastname
             
            // }
        }
           
        ],
        "update_existing":true
    }
    const postData = JSON.stringify(data)
    const options = {
        url: `https://us1.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}`,
        method: 'POST',
        headers: {
            Authorization: `auth ${MAILCHIMP_API_KEY}`,
        },
        body:postData
    }
    request(options,(error,response,body)=>{
        if(error)
        throw new Error(error)
       
    })



}

export {addEmailToMailchimp,unscribeToMailchimp}

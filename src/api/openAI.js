import axios from 'axios'; //api 호출을 위해 axios 임포트

const {apiKey} = require("../constants")

const client  = axios.create({
    headers: {
        "Authorization": "Bearer" + apiKey,
        "content-Type": "application/json"
    }
})

export const apiCall = async(prompt, messages) =>{
    try{
        
    }catch(err){
        console.log('error: ', err);
        return Promise.resolve({success: false, msg: err.message})
    }

}
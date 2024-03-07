 import axios from "axios";
 import { config } from "dotenv";
 config();

 var username= process.env.USERNAMEBANCARD;
 var password = process.env.PASSWORDBANCARD;
 // console.log(process.env);

 async function getJSONAsync(username,password){
 
 const jsonData = {
        amount : 3500000,
        description : "2340/2 Carlos Gomez",
        periodicity : 1,
        debit_day : 10,
        unlimited: true,
        start_date: "10/05/2023",
        end_date: "10/11/2023"
    }


    

    //var username= process.env.USERNAME;
   // var password = process.env.PASSWORD;
   // console.log(username);
    var session_url = process.env.SUBSBANCARD;
    console.log(session_url);
// var basicAuth = 'Basic ' + Buffer.from(username + ':' + password, 'base64');
const basicAuth =  Buffer.from(`${username}:${password}`).toString('base64');
const headers = { 'Authorization': 'Basic '+ basicAuth };

let json = await axios.post(session_url, jsonData, {
    auth: {
        username: username,
        password: password
      }
});
return json;
 }


 //let abc = getJSONAsync(username,password);
 // console.log('>>>>>>>>>>> abc', abc);

 (async()=>{
    let abc = await getJSONAsync(username,password);
    console.log('>>>>>>>>>>> abc', abc);
 })();
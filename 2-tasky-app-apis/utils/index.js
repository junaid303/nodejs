import fs from "fs";

function generate_id(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'; // Possible characters
  let result = '';


  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // Get a random index
    result += characters.charAt(randomIndex); // Append character at the random index
  }
  //Search if the above random string does already exist 
  let data = fs.readFileSync("data.json");
  data = JSON.parse(data);
  let idFound = data.find(ele => ele._id === result);
  if (idFound) return generate_id(length);
  else return result;
}

function validateTaskdata(body) {
  let { taskname, deadline, status } = body;
  let error = {};
  //Verify taskname : Negative check 
  if (taskname.length < 5 || taskname.length > 200) {//NOTE : In neg checks use || operator
    error.message = "Taskname must be > 5 and Less than < 200 Chars"
  }


  //verify deadline
  /*DEADLINE VERIFICATION : 1) date cannot be backdated, 
  2) it cannot be next 15 min, 
  3) it cannot be more than 30 days  */

  let liveTime = new Date();//Live Time
  let inputTime = new Date(deadline);//Input Time


  let diff_in_miliseconds = inputTime - liveTime;
  let diff_in_minutes = diff_in_miliseconds / (1000 * 60);
  let diff_in_days = diff_in_miliseconds / (1000 * 60 * 60 * 24);


  if (diff_in_minutes < 15 || diff_in_days > 30) {
    error.message = "deadline cannot be within 15 minutes OR must be under 30 days OR backdated"
  }
  //verify status
  if (status && typeof status !== 'boolean') {
    error.message = "Status must be a boolean"
  }
  return error;

}
// validateTaskdata({

//   "taskname": "afsdjsdf",
//   "deadline": "Mon Sept 9 2024 16:50:00 GMT-0400",
//   "status": true
// });

function insertDb(body){
  let data = fs.readFileSync("data.json")
    data = JSON.parse(data);
    data.push(body);
    fs.writeFileSync("data.json",JSON.stringify(data));
}

function updateDb(body, _id){
   let error = {};
  let data = fs.readFileSync("data.json")
    data = JSON.parse(data);
    let index = data.findIndex(ele => ele._id === _id);
    if(index === -1){
      error.message = "The _id is invalid, Bad request"
    }else{
      data[index]= body;
      fs.writeFileSync  ("data.json", JSON.stringify(data));
    }
    return error;
    
    // fs.writeFileSync("data.json",JSON.stringify(data));
}


export {
  generate_id, validateTaskdata, insertDb, updateDb

}
import fs from "fs";

function generate_id(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'; // Possible characters
    let result = '';

  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length); // Get a random index
      result += characters.charAt(randomIndex); // Append character at the random index
    }
    //Search if the above random string does already exist 
    let data = fs.readFileSync("../data.json");
    data = JSON.parse(data);
    let idFound = data.find(ele => ele._id === result);
    if (idFound) return generate_id(length);
    else return result;
  }
  export  {
    generate_id
  
  }
   
  
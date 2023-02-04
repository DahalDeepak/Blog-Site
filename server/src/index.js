const mongoose = require("mongoose");


const app = require("express")();
require("dotenv").config();

const port = process.env.PORT;
const userName = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
app.listen(port, () => {
  console.log(`server is running ${port}`);
});

const URI =`mongodb://${userName}:${password}@ac-xv6zsch-shard-00-00.set2im1.mongodb.net:27017,ac-xv6zsch-shard-00-01.set2im1.mongodb.net:27017,ac-xv6zsch-shard-00-02.set2im1.mongodb.net:27017/?ssl=true&replicaSet=atlas-9ix274-shard-0&authSource=admin&retryWrites=true&w=majority`
try{mongoose.connect(URI).then(()=>console.log("Connected to data base"))}
catch(erro){
  console.log("error occure",error)
}
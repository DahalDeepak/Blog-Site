// const mongoose  = require("mongoose");

// const URI ="mongodb://user:Deepak123@ac-xv6zsch-shard-00-00.set2im1.mongodb.net:27017,ac-xv6zsch-shard-00-01.set2im1.mongodb.net:27017,ac-xv6zsch-shard-00-02.set2im1.mongodb.net:27017/?ssl=true&replicaSet=atlas-9ix274-shard-0&authSource=admin&retryWrites=true&w=majority"
// const Connection =()=> {
//  try{
//   mongoose.connect(URI).then(()=>console.log("Connected to data base"))

//  }
//  catch(err){
//   console.log(err)
//  }
// }

// export default Connection
// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// module.exports = async () => {
//   try {
//     const uri = "mongodb://user:Deepak123@ac-xv6zsch-shard-00-00.set2im1.mongodb.net:27017,ac-xv6zsch-shard-00-01.set2im1.mongodb.net:27017,ac-xv6zsch-shard-00-02.set2im1.mongodb.net:27017/?ssl=true&replicaSet=atlas-9ix274-shard-0&authSource=admin&retryWrites=true&w=majority"
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("connected to mongodb");
//   } catch (error) {
//     console.error(error);
//   }
// };







import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = "mongodb://user:Deepak123@ac-xv6zsch-shard-00-00.set2im1.mongodb.net:27017,ac-xv6zsch-shard-00-01.set2im1.mongodb.net:27017,ac-xv6zsch-shard-00-02.set2im1.mongodb.net:27017/?ssl=true&replicaSet=atlas-9ix274-shard-0&authSource=admin&retryWrites=true&w=majority"
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;
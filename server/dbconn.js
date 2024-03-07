
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://alumni:alumnialumni@alumnicluster.hnk4agr.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);




// let mongo=require('mongodb');
// let MongoClient=mongo.MongoClient;
// let url="mongodb://127.0.0.1:27017";
// let db;
// function dbconnect(){
//     MongoClient.connect(url,(err,client)=>{
//         if(err){
//             console.log("connection error");
//             console.error(err);
//             return "InternaL SeveR ErroR PleasE TrR AfteR SomE TimE";
            
//         };
//         console.log("connection made");
//         db=client.db("alumni")
//     })
// }
// async function getdata(collname,query){
//     let output;
//     output = await db.collection(collname).find(query).toArray()
//     return output
// }
// async function record(collname,query){
//     let output;
//     try{
//         output = await db.collection(collname).findOne(query)
//         return output
//     }
//     catch(err){
//         return "UseR NoT FounD Please GivE ValiD DetailS"
//     }
// }
// async function insertdata(colname,data){
//     let output;
//     try{
//         output = await db.collection(colname).insertOne(data);
//         return "YouR SuccessfullY RegistereD"
//     }
//    catch(err){
//     return "RegisteratioN FaileD TrY AgaiN"
//    }
// }
// module.exports={
//     getdata,
//     dbconnect,
//     record,
//     insertdata
// }

/*let mongoose=require('mongoose')
mongoose.connect('mongodb+srv://alumni:alumni2025@alumnicluster.hnk4agr.mongodb.net/?retryWrites=true&w=majority/alumnidb')*/ 

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose")

// mongoose.set('strictQuery', false);

// mongoose.connect("mongodb+srv://alumni:alumni2025@alumnicluster.hnk4agr.mongodb.net/?retryWrites=true&w=majority"
// ).then(() => console.log("Database connection successful")).catch(()=> console.log("Database connection error"));

// app.listen(3000, function() {
//     console.log("Server listening on port 3000");
// })

const { MongoClient } = require('mongodb');

let db; // This variable will hold the reference to the database connection

//mongodb://127.0.0.1:27017

// const url = env.MONGODB_URL;
// const dbName = env.DB_NAME;




// MongoDB connection URI
const url = 'mongodb+srv://alumni:alumni@cluster0.1znwmui.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'alumni';

// Function to connect to MongoDB
async function dbconnect() {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        db = client.db(dbName); // Set the reference to the database
    } catch (err) {
        console.error('Connection error:', err);
        throw new Error('Internal Server Error. Please try again later.'); // Throw an error to be handled by the caller
    }
}

// Function to fetch data from a collection based on a query
async function getdata(collname, query) {
    try {
        const output = await db.collection(collname).find(query).toArray();
        return output
    } catch (err) {
        console.error('Error fetching data:', err);
        throw new Error('Error fetching data from the database.');
    }
}

async function getPosts(collname) {
    try {
        const output = await db.collection(collname).find().sort({ createdAt: -1 }).limit(10).toArray();
        return output
        
    } catch (err) {
        console.error('Error fetching data:', err);
        throw new Error('Error fetching data from the database.');
    }
}


// Function to find a single record in a collection based on a query
async function record(collname, query) {
    try {
        const output = await db.collection(collname).findOne(query);
        if (!output) {
            throw new Error('User not found. Please provide valid details.');
        }
        return output;
    } catch (err) {
        console.error('Error finding record:', err);
        throw new Error('User not found. Please provide valid details.');
    }
}

// Function to insert data into a collection
async function insertdata(colname, data) {
    try {
        const output = await db.collection(colname).insertOne(data);
        return 'Successfully registered.';
    } catch (err) {
        console.error('Error inserting data:', err);
        throw new Error('Registration failed. Please try again.');
    }
}


module.exports = {
    dbconnect,
    getdata,
    record,
    insertdata,
    getPosts
};


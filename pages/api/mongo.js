const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const uri = "mongodb+srv://sneakerhead:1234Mongo%40@sneakerhead.jfuty.mongodb.net/Sneakerhead?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 
 // The database to use
 const dbName = "Sneakerhead";
 let currentdate = new Date(); 
let datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
 export default async (req, res) => {
     console.log("MONGODB TEST");
    if (req.method === "POST") {
      const data = req.body;
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("orders");

         // Construct a document                                                                                                                                                              
         let personDocument = {
            "orderid": data.orderid,
             "customername": data.customername,                                                                                                                          
             "customeremail":  data.customeremail,
             "date": datetime,
             "estimatedDeliveryDate": data.estimatedDelivery
            
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(personDocument);
         res.status(200).send({"status":"sucess"});

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        // res.status(200).send("sucess");
        await client.close();
    }
    
}
 }

// run().catch(console.dir);
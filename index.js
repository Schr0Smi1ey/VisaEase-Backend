const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@schr0smi1ey.iioky.mongodb.net/?retryWrites=true&w=majority&appName=Schr0Smi1ey`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("VisaEase");
const visaCollection = database.collection("visas");
const applicationCollection = database.collection("applications");
async function run() {
  try {
    // Post
    app.post("/Visa", async (req, res) => {
      const visa = req.body;
      const result = await visaCollection.insertOne(visa);
      res.send(result);
    });
    // Get
    app.get("/Visa", async (req, res) => {
      const cursor = visaCollection.find();
      const visas = await cursor.toArray();
      res.send(visas);
    });
    app.get("/Visa/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const visa = await visaCollection.findOne(query);
      res.send(visa);
    });
    app.put("/Visa/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const visa = req.body;
      console.log(visa);
      const update = { $set: visa };
      const result = await visaCollection.updateOne(query, update);
      res.send(result);
    });
    app.delete("/Visa/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await visaCollection.deleteOne(query);
      res.send(result);
    });
    app.post("/Applications", async (req, res) => {
      const application = req.body;
      const result = await applicationCollection.insertOne(application);
      res.send(result);
    });
    app.get("/Applications", async (req, res) => {
      const cursor = applicationCollection.find();
      const applications = await cursor.toArray();
      res.send(applications);
    });
    app.get("/Applications/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const application = await applicationCollection.findOne(query);
      res.send(application);
    });
    app.delete("/Applications/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await applicationCollection.deleteOne(query);
      res.send(result);
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

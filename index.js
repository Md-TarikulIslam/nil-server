const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c0hninn.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const nilmrcGalleryCollection = client
      .db("nilmrc")
      .collection("nilmrc-gallery");

    app.get("/nilmrc-gallery", async (req, res) => {
      const query = {};
      const photos = await nilmrcGalleryCollection.find(query).toArray();
      res.send(photos);
    });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("NILMRC server is running");
});

app.listen(port, () => {
  console.log(`NILMRC app listening on port ${port}`);
});

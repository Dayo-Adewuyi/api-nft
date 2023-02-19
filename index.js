const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const NftContract = require("./t");
const app = express();

dotenv.config();

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught exception.");
  process.exit(1);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  const { price, uri, creator } = req.body;
  try {
    const contract = await NftContract(price, uri, creator);
    res.status(200).json({
      status: "success",
      data: contract,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

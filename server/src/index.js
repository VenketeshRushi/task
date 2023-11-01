const express = require("express");
const cors = require("cors");
const PORT = 8080;
const dbconnect = require("./config/db");
const bodyParser = require('body-parser');

const productRouter = require("./controllers/allproduct/allproduct.router");

const app = express();

// Increase the limit of payload
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(express.json());

app.use("/allproducts", productRouter);


app.listen(PORT, async () => {
  try {
    await dbconnect();
    console.log(`listening on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});

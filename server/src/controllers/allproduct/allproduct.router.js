const express = require("express");
const Product = require("./allProduct.model");

const app = express.Router();

app.get("/", async (req, res) => {
  console.log(req.query.page);
  try {
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * 12;

    const products = await Product.find().skip(skip).limit(12);

    const totalProductsCount = await Product.countDocuments();

    const totalPages = Math.ceil(totalProductsCount / 12);

    return res.json({
      products: products,
      page: page,
      totalpages: totalPages,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/search", async (req, res) => {
  const { searchinput } = req.body;
  let seacrh = searchinput.trim().toLowerCase();
  try {
    const regex = new RegExp(seacrh, "i");

    const products = await Product.find({
      $or: [{ Title: { $regex: regex } }, { VariantSKU: { $regex: regex } }],
    });

    return res.json({
      products: products,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/single/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.send(product);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

app.post("/addall", async (req, res) => {
  try {
    let products = req.body.products;

    if (!Array.isArray(products)) {
      return res
        .status(400)
        .send("Invalid input. Products should be an array.");
    }

    for (let product of products) {
      let data = {
        Handle: product.Handle,
        Title: product.Title,
        Body: product.Body,
        Vendor: product.Vendor,
        Type: product.Type,
        Tags: product.Tags,
        Option1Name: product["Option1 Name"],
        Option1Value: product["Option1 Value"],
        Option2Name: product["Option2 Name"],
        Option2Value: product["Option2 Value"],
        Option3Name: product["Option3 Name"],
        Option3Value: product["Option3 Value"],
        VariantSKU: product["Variant SKU"],
        VariantGrams: product["Variant Grams"],
        VariantInventoryTracker: product["Variant Inventory Tracker"],
        VariantInventoryQty: product["Variant Inventory Qty"],
        VariantInventoryPolicy: product["Variant Inventory Policy"],
        VariantFulfillmentService: product["Variant Fulfillment Service"],
        VariantPrice: product["Variant Price"],
        VariantCompareAtPrice: product["Variant Compare At Price"],
        ImageSrc: product["Image Src"],
      };

      let newProduct = await Product.create(data);
    }

    return res.status(201).send("Products added successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.patch("/update/:id", async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  try {
    let product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.post("/add", async (req, res) => {
  try {
    let data = {
      Handle: req.body.Handle,
      Title: req.body.Title,
      Body: req.body.Body,
      Vendor: req.body.Vendor,
      Type: req.body.Type,
      Tags: req.body.Tags,
      Option1Name: req.body.Option1Name,
      Option1Value: req.body.Option1Value,
      Option2Name: req.body.Option2Name,
      Option2Value: req.body.Option2Value,
      Option3Name: req.body.Option3Name,
      Option3Value: req.body.Option3Value,
      VariantSKU: req.body.VariantSKU,
      VariantGrams: req.body.VariantGrams,
      VariantInventoryTracker: req.body.VariantInventoryTracker,
      VariantInventoryQty: req.body.VariantInventoryQty,
      VariantInventoryPolicy: req.body.VariantInventoryPolicy,
      VariantFulfillmentService: req.body.VariantFulfillmentService,
      VariantPrice: req.body.VariantPrice,
      VariantCompareAtPrice: req.body.VariantCompareAtPrice,
      ImageSrc: req.body.ImageSrc,
    };
    let product = await Product.create(data);
    return res.send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = app;

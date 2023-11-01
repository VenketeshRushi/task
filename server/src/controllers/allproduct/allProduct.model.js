const mongoose = require("mongoose");

const reqString = { type: String };
const reqNumber = { type: Number };

const productSchema = new mongoose.Schema({
  Handle: reqString,
  Title: reqString,
  Body: reqString,
  Vendor: reqString,
  Type: reqString,
  Tags: reqString,
  Option1Name: reqString,
  Option1Value: reqString,
  Option2Name: reqString,
  Option2Value: reqString,
  Option3Name: reqString,
  Option3Value: reqString,
  VariantSKU: reqString,
  VariantGrams: reqNumber,
  VariantInventoryTracker: reqString,
  VariantInventoryQty: reqNumber,
  VariantInventoryPolicy: reqString,
  VariantFulfillmentService: reqString,
  VariantPrice: reqNumber,
  VariantCompareAtPrice: reqString,
  ImageSrc: reqString
}, {
  versionKey: false
});

const Product = mongoose.model("Productassignment", productSchema);

module.exports = Product;

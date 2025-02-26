import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  short_title: {
    type: String,
    required: [true, "Product name is required"],
    unique: [true, "The product name should ben unique"],
    trim: true,
  },
  long_title: {
    type: String,
    required: [true, "Product name is required"],
    unique: [true, "The product name should ben unique"],
    trim: true,
  },
  stock: {
    type: Number,
    default: 1,
    min: [1, "The minimum product quantity is 1"],
  },
  description: {
    type: String,
    validate: {
      validator: function (v) {
        return v.length > 20;
      },
      message: "the description is too small",
    },
    required: [true, "Product should have a description"],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
    trim: true,
  },
  category: {},
  price: {
    type: Number,
    required: [true, "Price is required"],
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: "Price must be greater than 0",
    },
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  lowStockThreshold: {
    type: Number,
    default: 0,
  }, //Minimum stock before triggering a warning.
  images: {
    type: [String], // Array of image URLs
    required: [true, "At least 3 images are required"],
    validate: {
      validator: function (v) {
        return v.length >= 3; // Ensures minimum 3 images
      },
      message: "A product must have at least 3 images",
    },
  },
  thumbnail: {
    type: String,
    required: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  colors: {
    type: [String],
    required: [true, "At least one color is required"],
    validate: {
      validator: function (v) {
        return v.length >= 1;
      },
      message: "A product must have at least one color",
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  //   totalRatings
  //   reviews – Array of review objects ({ userId, comment, rating, date }).
  //   isApproved
  //status (active, inactive, pending , deleted)
  //model
  //maximum product buy count
  //type
});

const ProductModel = model("Product", productSchema);

export default ProductModel;

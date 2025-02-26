import mongoose from "mongoose";
import { applyPasswordValidatingAndHashing } from "../utils/hashUtils.js";

const { Schema, model } = mongoose;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const CustomerSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username must be unique"],
    trim: true,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "There is already an account with this email address"],
    required: [true, "Email is required"],
    trim: true,
    match: [emailRegex, "Invalid email address"],
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  mobile: {
    type: String,
    validate: {
      validator: function (m) {
        const slMobileRegex = /^(?:\+94|0)7[01245678]\d{7}$/;
        return slMobileRegex.test(m);
      },
      message: "Mobile number is invalid",
    },
  },
  postal_code: {
    type: String,
    validate: {
      validator: function (code) {
        return /^\d{5}$/.test(code);
      },
      message: "Invalid postal code",
    },
  },
  wishlist: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
    default: [],
  },
  cart: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    default: [],
  },
  userType: {
    type: String,
    default: "customer",
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    default: null,
  },
});

applyPasswordValidatingAndHashing(CustomerSchema);

CustomerSchema.pre("save", function (next) {
  if (!this.isModified("isSeller")) return next();

  if (this.isSeller) {
    if (!this.sellerId) {
      return next(
        new Error("sellerId should be provided when isSeller is true")
      );
    }
  } else {
    if (this.sellerId) {
      return next(
        new Error("sellerId should be removed when isSeller is false")
      );
    }
    this.sellerId = undefined;
  }

  next();
});

const CustomerModel = model("Customer", CustomerSchema);

export default CustomerModel;

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v > 0;
        },
        message: "Price must be greater than 0.",
      },
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
  },
  totalamount: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: "Total amount must be greater than 0.",
    },
  },
  orderStatus: {
    type: String,
    enum: ["Confirmed", "Delivered"],
    default: "Confirmed",
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "done",
    required: true,
    immutable: true,
  },
  shippingAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      immutable: true,
      default: "Sri Lanka",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  delieveredBefore: {
    type: Date,
  },
});

OrderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();

  if (!this.delieveredBefore) {
    this.delieveredBefore = new Date();
    this.delieveredBefore.setDate(this.delieveredBefore.getDate() + 7);
  }

  next();
});

const OrderModel = model("order", OrderSchema);

export default OrderModel;

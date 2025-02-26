import HttpStatus from "../constants/httpStatus.js";
import OrderModel from "../models/Order.model.js";

const addOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.create(req.body);
    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Order added successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  const orderId = req.params._id;
  const { ...UpadateData } = req.body;

  const orderexist = await OrderModel.findById(orderId);

  if (!orderexist) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Order not found",
    });
  }

  try {
    const update_order = await OrderModel.findByIdAndUpdate(
      { _id: orderId },
      UpadateData,
      { new: true, runValidators: true }
    );

    if (!update_order) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Order update failed",
      });
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Order updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const getorders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find();
    res.status(HttpStatus.OK).json({ data: orders });
  } catch (err) {
    next(err);
  }
};

const getOrdersById = async (req, res, next) => {
  try {
    const orders = await OrderModel.findById(req.user._id);

    if (!orders) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Order not found" });
    }

    res.status(HttpStatus.OK).json({ data: orders });
  } catch (err) {
    next(err);
  }
};

export { addOrder, updateOrder, getorders, getOrdersById };

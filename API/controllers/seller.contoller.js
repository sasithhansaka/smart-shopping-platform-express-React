import HttpStatus from "../constants/httpStatus.js";
import SelleModel from "../models/Seller.model.js";
import CustomerModel from "../models/Customer.model.js";

const SellerRegister = async (req, res, next) => {
  const { ...SellerData } = req.body;
  const customerId = req.user._id;

  let existcustomer;

  let existSeller;

  existcustomer = await CustomerModel.findById(customerId);

  if (!existcustomer) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "customer not found",
    });
  }

  existSeller = await SelleModel.findOne({ email: SellerData.email });

  if (existSeller) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "email already exist",
    });
  }

  existSeller = await SelleModel.findOne({ Store_name: SellerData.Store_name });

  if (existSeller) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Store name already exist",
    });
  }

  try {
    const newSeller = await SelleModel.create({ ...SellerData });

    const UpdateCustomer = await CustomerModel.findByIdAndUpdate(
      customerId,
      {
        // _id:newSeller._id,
        userType: "seller",
        isSeller: true,
        sellerId: newSeller._id,
      },
      { new: true }
    );

    req.user = UpdateCustomer.select("-hash -salt");
    if (!UpdateCustomer) throw new Error("User not found");

    if (!UpdateCustomer) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "customer update failed ",
      });
    }

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "seller upgrade successfully",
      newSeller,
    });
  } catch (err) {
    next(err);
  }
};

const UpdateSeller = async (req, res, next) => {
  const { ...UpdateData } = req.body;
  const sellerId = req.user.sellerId;

  const sellerExist = await SelleModel.findById(sellerId);

  if (!sellerExist) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "seller not found",
    });
  }

  try {
    const updatedSeller = await SelleModel.findByIdAndUpdate(
      sellerId,
      UpdateData,
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "seller update failed",
      });
    }

    res.status(HttpStatus.ok).json({
      success: true,
      message: "seller updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const SellerDetailsById = async (req, res, next) => {
  const sellerId = req.user.sellerId;

  const sellerExist = await SelleModel.findById(sellerId);

  if (!sellerExist) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "seller not found",
    });
  }
  try {
    res.status(HttpStatus.ok).json({
      success: true,
      message: "seller found",
      sellerExist,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSeller = async (req, res, next) => {
  const sellerId = req.user.sellerId;

  const sellerExist = await SelleModel.findById(sellerId);

  if (!sellerExist) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "seller not found",
    });
  }

  try {
    const deleteSeller = await SelleModel.findByIdAndDelete(sellerId);

    if (!deleteSeller) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "seller delete failed",
      });
    }

    res.status(HttpStatus.ok).json({
      success: true,
      message: "seller deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export { SellerRegister, UpdateSeller, SellerDetailsById, deleteSeller };

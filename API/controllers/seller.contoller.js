import { issueJwt } from "../utils/jwtUtils.js";
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
        userType: "seller",
        isSeller: true,
        sellerId: newSeller._id,
      },
      { new: true }
    ).select("-hash -salt");

    if (!UpdateCustomer) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "customer update failed",
      });
    }

    // Issue new JWT tokens with seller user type
    const { access_token, refresh_Token } = issueJwt(
      UpdateCustomer._id,
      UpdateCustomer.username,
      "seller"
    );

    // Update cookies with new tokens
    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "Strict",
      secure: true,
    });

    res.cookie("refreshToken", refresh_Token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: true,
    });

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "seller upgrade successful",
      data: {
        customer: UpdateCustomer,
        seller: newSeller,
      },
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
      { _id: sellerId },
      UpdateData,
      { new: true, runValidators: true }
    );

    if (!updatedSeller) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "seller update failed",
      });
    }

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "seller updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const SellerDetailsById = async (req, res, next) => {
  // console.log("SellerDetailsById called");
  const sellerId = req.user.sellerId;

  const sellerExist = await SelleModel.findById(sellerId);

  if (!sellerExist) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "seller not found",
    });
  }
  try {
    res.status(HttpStatus.OK).json({
      success: true,
      message: "seller found",
      sellerExist,
    });
  } catch (err) {
    next(err);
  }
};

const SellerDetailsByRequestId = async (req, res, next) => {
  const sellerId = req.params.id; 
  console.log("Seller ID:", sellerId);

  try {
    const seller = await SelleModel.findById(sellerId); // Fetch seller details by ID

    if (!seller) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Seller not found",
      });
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Seller details retrieved successfully",
      data: seller,
    });
  } catch (err) {
    console.error("Error fetching seller details:", err);
    next(err); // Pass error to the error-handling middleware
  }
};

const deleteSeller = async (req, res, next) => {
  const sellerId = req.user.sellerId;

  console.log("Seller ID:", sellerId);

  const sellerExist = await CustomerModel.find(sellerId);

  if (!sellerExist) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Seller not found in CustomerModel",
    });
  }

  try {
    const sellerToDelete = await SelleModel.find(sellerId);

    if (!sellerToDelete) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Seller not found in SelleModel",
      });
    }

    const deleteSeller = await SelleModel.deleteOne(sellerId);

    console.log("Delete Seller:", deleteSeller);

    if (!deleteSeller) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Seller delete failed",
      });
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Seller deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export { SellerRegister, UpdateSeller, SellerDetailsById, deleteSeller , SellerDetailsByRequestId };

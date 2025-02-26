import HttpStatus from "../constants/httpStatus.js";
import ProductModel from "../models/Product.model.js";

const addProduct = async (req, res, next) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    return res.status(HttpStatus.CREATED).json({ data: newProduct });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductModel.deleteOne({
      _id: productId,
      sellerId: req.user.sellerId,
    });

    if (deletedProduct.deletedCount === 0) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Product not found or unauthorized" });
    }

    res.status(HttpStatus.OK).json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const updateData = req.body;

  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: productId, sellerId: req.user.sellerId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Product not found or unauthorized" });
    }

    res.status(HttpStatus.OK).json({ data: updatedProduct });
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find({ sellerId: req.user.sellerId });
    res.status(HttpStatus.OK).json({ data: products });
  } catch (err) {
    next(err);
  }
};

export { addProduct, deleteProduct, updateProduct, getAllProducts };

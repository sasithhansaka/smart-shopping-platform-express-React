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
      sellerId: req.user._id,
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

export { addProduct, deleteProduct };

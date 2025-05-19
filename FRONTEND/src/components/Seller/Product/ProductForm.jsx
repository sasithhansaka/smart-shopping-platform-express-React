import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProductForm.module.css";
import ContentScore from "./ContentScore";
// import useState from "react";

function ProductForm() {
  const [seller, setSeller] = useState(null);

  const [short_title, setShortTitle] = useState("");
  const [long_title, setLongTitle] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [maxBuyCount, setMaxBuyCount] = useState("");
  const [model, setModel] = useState("");
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [base64Images, setBase64Images] = useState([]);

  const handleShortTitle = (e) => setShortTitle(e.target.value);
  const handleLongTitle = (e) => setLongTitle(e.target.value);
  const handleStock = (e) => setStock(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleBrand = (e) => setBrand(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleDiscountPercentage = (e) => setDiscountPercentage(e.target.value);
  const handleMaxBuyCount = (e) => setMaxBuyCount(e.target.value);
  const handleModel = (e) => setModel(e.target.value);

  // Handle color selection
  const handleColors = (color) => {
    setColors((prevColors) => {
      if (prevColors.includes(color)) {
        return prevColors.filter((c) => c !== color);
      } else {
        return [...prevColors, color];
      }
    });
  };

  // Handle image upload with preview and convert to base64
  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImageError("");

    if (selectedFiles.length === 0) return;

    // Check file types
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const invalidFiles = selectedFiles.filter(
      (file) => !validImageTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setImageError("Please select only image files (JPEG, PNG, GIF, WEBP)");
      return;
    }

    setImages(selectedFiles);

    // Generate preview URLs
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls(previewUrls);

    // Convert images to base64
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Images((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/seller", {
          withCredentials: true,
        });
        setSeller(response.data.sellerExist);
        console.log("Seller data:", response.data.sellerExist);
        console.log("Seller Email:", response.data.sellerExist.email);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchSeller();
  }, []);

  // Clean up image preview URLs
  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviewUrls]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!seller) {
      alert("Seller information not loaded. Please try again.");
      return;
    }

    // Validate minimum image requirement
    if (base64Images.length < 3) {
      setImageError("Please upload at least 3 images for the product");
      return;
    }

    // Create data object with all fields including base64 images
    const data = {
      short_title,
      long_title,
      stock,
      description,
      brand,
      category,
      price,
      discountPercentage,
      maxBuyCount,
      model,
      colors,
      sellerId: seller._id,
      // Include the base64 images in the data object
      images: base64Images,
    };

    try {
      console.log("Form data:", data);
      const response = await axios.post(
        "http://localhost:3000/api/product",
        data,
        {
          withCredentials: true,
        }
      );
      alert("Product submitted successfully!");
      handleReset();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "An error occurred while adding the product."
      );
    }
  };

  const worldColors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
    "White",
    "Gray",
    "Purple",
    "Pink",
    "Brown",
    "Orange",
    "Gold",
  ];

  const removeImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });

    setImagePreviewUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      URL.revokeObjectURL(newUrls[index]); // Clean up the URL
      newUrls.splice(index, 1);
      return newUrls;
    });

    setBase64Images((prevB64s) => {
      const newB64s = [...prevB64s];
      newB64s.splice(index, 1);
      return newB64s;
    });

    // Clear error if images are removed but we still have 3+
    if (images.length - 1 >= 3) {
      setImageError("");
    }
  };

  const [completionStatus, setCompletionStatus] = useState({
    basicInfo: false,
    productSpec: false,
    priceStock: false,
    description: false,
  });

  // Add this useEffect to track completion status
  useEffect(() => {
    // Check Basic Information completion
    const basicInfoComplete =
      short_title.trim() !== "" &&
      long_title.trim() !== "" &&
      category.trim() !== "" &&
      images.length >= 3;

    // Check Product Specification completion
    const productSpecComplete =
      brand.trim() !== "" && model.trim() !== "" && colors.length > 0;

    // Check Price, Stock & Variants completion
    const priceStockComplete =
      price !== "" && stock !== "" && maxBuyCount !== "";

    // Check Product Description completion
    const descriptionComplete = description.trim() !== "";

    setCompletionStatus({
      basicInfo: basicInfoComplete,
      productSpec: productSpecComplete,
      priceStock: priceStockComplete,
      description: descriptionComplete,
    });
  }, [
    short_title,
    long_title,
    category,
    images,
    brand,
    model,
    colors,
    price,
    stock,
    maxBuyCount,
    description,
  ]);

  const handleReset = () => {
    setShortTitle("");
    setLongTitle("");
    setStock("");
    setDescription("");
    setBrand("");
    setCategory("");
    setPrice("");
    setDiscountPercentage("");
    setMaxBuyCount("");
    setModel("");
    setColors([]);

    // Clean up image URLs before resetting
    imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    setImagePreviewUrls([]);
    setImages([]);
    setBase64Images([]);
    setImageError("");
  };

  return (
    <div style={{ display: "flex" }}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.detailsContainer}>
          <h1>Basic Information</h1>
          <label>Product Short Name</label>
          <input
            type="text"
            name="short_title"
            placeholder="Ex : nikon coolpix a300 digital cemara"
            maxLength="40"
            value={short_title}
            onChange={handleShortTitle}
            required
          />

          <label>Product long Name</label>
          <input
            type="text"
            name="long_title"
            placeholder="Ex : nikon coolpix a300 digital cemara"
            maxLength="300"
            value={long_title}
            onChange={handleLongTitle}
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={category}
            onChange={handleCategory}
            required
          >
            <option value="">Select your product category</option>
            <option value="sports">Sports</option>
            <option value="gaming">Gaming</option>
            <option value="earphones">Earphones</option>
            <option value="toys">Toys</option>
            <option value="mobilephones">Mobile-Phones</option>
            <option value="laptops">Laptops</option>
          </select>
          <label>Product Images</label>

          <div className={styles.uploadWrapper}>
            <label className={styles.customFileUpload}>
              <span className={styles.plusIcon}>＋</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.hiddenInput}
              />
            </label>
            {imageError && <p className={styles.errorMessage}>{imageError}</p>}
          </div>

          {imagePreviewUrls.length > 0 && (
            <div className={styles.imagePreviewContainer}>
              <p>Selected Images: {images.length}</p>
              <div className={styles.imagePreviewGrid}>
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className={styles.previewItem}>
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className={styles.previewImage}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className={styles.removeImageBtn}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.detailsContainer}>
          <h1>Product Specification</h1>
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={brand}
            onChange={handleBrand}
            required
          />
          <label>Model</label>
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={model}
            onChange={handleModel}
            required
          />
          <div className={styles.colorSelection}>
            <h3>Select Colors</h3>
            <div className={styles.colorList}>
              {worldColors.map((color) => (
                <label key={color} className={styles.colorSwatch}>
                  <input
                    type="checkbox"
                    checked={colors.includes(color)}
                    onChange={() => handleColors(color)}
                  />
                  <span
                    className={styles.colorBox}
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.detailsContainer}>
          <h1>Price, Stock & Variants</h1>
          <label>Product Price</label>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={price}
            onChange={handlePrice}
            required
            min="0"
          />
          <label>Product Discount</label>

          <input
            type="number"
            name="discountPercentage"
            placeholder="Discount %"
            value={discountPercentage}
            onChange={handleDiscountPercentage}
            min="0"
            max="100"
          />
          <label>Product Stock</label>

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={stock}
            onChange={handleStock}
            required
            min="0"
          />
          <label>Product Maximum Buys</label>

          <input
            type="number"
            name="maxBuyCount"
            placeholder="Maximum Purchase Quantity"
            value={maxBuyCount}
            onChange={handleMaxBuyCount}
            required
            min="1"
          />
        </div>

        <div className={styles.detailsContainer}>
          <h1>Product Description</h1>
          <textarea
            name="description"
            placeholder="Add a detailed description of the product"
            value={description}
            onChange={handleDescription}
            required
            rows="10"
            cols={120}
            className={styles.descriptionTextarea}
          ></textarea>
        </div>

        <div className={styles.formButtons}>
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
          >
            Reset
          </button>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>

      <div className={styles.contentScoreContainer}>
        <ContentScore completionStatus={completionStatus} />
      </div>
    </div>
  );
}

export default ProductForm;

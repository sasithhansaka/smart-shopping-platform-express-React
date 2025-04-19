import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AddProducts.module.css";
import ContentScore from "./ContentScore";

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
  const[model, setModel] = useState("");
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/seller", { withCredentials: true });
        setSeller(response.data.sellerExist);
        console.log("Seller data:", response.data.sellerExist);
        console.log("Seller Email:", response.data.sellerExist.email);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };
  
    fetchSeller();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      sellerId: seller._id,
    };

    try {

      console.log("Form data:", data);
      const response = await axios.post("http://localhost:3000/api/product", data, {
        withCredentials: true,
      });
      alert("Product submitted successfully!");
      handleReset();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "An error occurred while adding the note."
      );
    }
  };
  
  

  const worldColors = [
    "Red", "Blue", "Green", "Yellow", "Black", "White",
    "Gray", "Purple", "Pink", "Brown", "Orange", "Cyan",
    "Magenta", "Beige", "Maroon", "Navy", "Teal", "Lime",
    "Olive", "Gold"
  ];

  const handleReset = () => {
    // setFormData({
    //   short_title: "",
    //   long_title: "",
    //   category: "",
    //   images: [],
    //   brand: "",
    //   model: "",
    //   colors: [],
    //   price: "",
    //   discountPercentage: "",
    //   stock: "",
    //   maxBuyCount: "",
    //   description: "",
    // });
  };
  

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <h1>Basic Information</h1>
        <input
          type="text"
          name="short_title"
          placeholder="Short Name (max 40)"
          maxLength="40"
          value={short_title}
          onChange={handleShortTitle}
        />
        <input
          type="text"
          name="long_title"
          placeholder="Long Name (max 300)"
          maxLength="300"
          value={long_title}
          onChange={handleLongTitle}
        />
        <select
          name="category"
          value={category}
          onChange={handleCategory}
        >
          <option value="">Select Category</option>
          <option value="Sports">Sports</option>
          <option value="Gaming">Gaming</option>
          <option value="Earphones">Earphones</option>
        </select>
        {/* <input
          type="file"
          multiple
          accept="image/*"
          onChange={ha}
        /> */}
      </div>

      <div>
        <h1>Product Specification</h1>
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={brand}
          onChange={handleBrand}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={model}
          onChange={handleModel}
        />
        <div>
          {/* {worldColors.map(color => (
            <label key={color}>
              <input
                type="checkbox"
                checked={formData.colors.includes(color)}
                onChange={() => handleColors(color)}
              />
              {color}
            </label>
          ))} */}
        </div>
      </div>

      <div>
        <h1>Price, Stock & Variants</h1>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={handlePrice}
        />
        <input
          type="number"
          name="discountPercentage"
          placeholder="Discount %"
          value={discountPercentage}
          onChange={handleDiscountPercentage}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={stock}
          onChange={handleStock}
        />
        <input
          type="number"
          name="maxBuyCount"
          placeholder="Number of Items"
          value={maxBuyCount}
          onChange={handleMaxBuyCount}
        />
      </div>

      <div>
        <h1>Product Description</h1>
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleDescription}
        ></textarea>
      </div>

      <button type="button" onClick={handleReset}>Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProductForm;

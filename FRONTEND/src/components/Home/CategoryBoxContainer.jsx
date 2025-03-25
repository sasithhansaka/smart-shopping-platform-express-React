import React from "react";
import CategoryBox from "./CategoryBox";

const category_box_btn_styles = {};

function CategoryBoxContainer() {
  function handleCategoryBoxBtnClick(category_name) {}

  return (
    <div className="category-box-container">
      <CategoryBox
        lebel1="LATEST APPLE"
        label2="IPHONES"
        image=""
        box_width=""
        color=""
      >
        <Button
          buttonStyle={category_box_btn_styles}
          handleClick={() => handleCategoryBoxBtnClick("phones")}
        >
          BROWSE
        </Button>
      </CategoryBox>

      <CategoryBox
        lebel1="NEW WEARINGS"
        label2="GALAXIE"
        image=""
        box_width=""
        color=""
      >
        <Button
          buttonStyle={category_box_btn_styles}
          handleClick={() => handleCategoryBoxBtnClick("watches")}
        >
          BROWSE
        </Button>
      </CategoryBox>

      <CategoryBox
        lebel1="NEW TREND"
        label2="DEVICES"
        image=""
        box_width=""
        color=""
      >
        <Button
          buttonStyle={category_box_btn_styles}
          handleClick={() => handleCategoryBoxBtnClick("laptops")}
        >
          BROWSE
        </Button>
      </CategoryBox>

      <CategoryBox
        lebel1="BEST GAMING"
        label2="CONSOLES"
        image=""
        box_width=""
        color=""
      >
        <Button
          buttonStyle={category_box_btn_styles}
          handleClick={() => handleCategoryBoxBtnClick("gaming")}
        >
          BROWSE
        </Button>
      </CategoryBox>

      <CategoryBox
        lebel1="NEW PLAY WITH"
        label2="TOYS"
        image=""
        box_width=""
        color=""
      >
        <Button
          buttonStyle={category_box_btn_styles}
          handleClick={() => handleCategoryBoxBtnClick("toys")}
        >
          BROWSE
        </Button>
      </CategoryBox>

      <CategoryBox
        lebel1="NEW SPORTS"
        label2="ITEMS"
        image=""
        box_width=""
        color=""
      >
        <Button
          buttonStyle={category_box_btn_styles}
          handleClick={() => handleCategoryBoxBtnClick("sport")}
        >
          BROWSE
        </Button>
      </CategoryBox>
    </div>
  );
}

export default CategoryBoxContainer;

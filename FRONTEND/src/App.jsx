import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFound from "./pages/NotFound";
import OrderPage from "./pages/OrderPage";
import SellerPage from "./pages/SellerPage";
import WelcomeSeller from "./components/Seller/WelcomeSeller";
import ManageProducts from "./components/Seller/Product/ManageProducts";
import AddProducts from "./components/Seller/Product/AddProducts";
import BrandManagement from "./components/Seller/Product/BrandManagement";
import Growth from "./components/Seller/Growth/Growth";
import Orders from "./components/Seller/Orders-Reviews/Orders";
import Reviews from "./components/Seller/Orders-Reviews/Reviews";
import Settings from "./components/Seller/Settings/Settings";
import MyProfile from "./components/Seller/Profile/MyProfile";
import ProfilePage from "./pages/ProfilePage";
import BecomeSeller from "./pages/BecomeSeller";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/auth" element={<AuthenticationPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/Seller" element={<SellerPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/BecomeSeller" element={<BecomeSeller />} />
          <Route path="*" element={<NotFound />} />
        
        <Route path="/seller" element={<SellerPage />}>
          <Route path="dashboard" element={<WelcomeSeller />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="add-products" element={<AddProducts />} />
          <Route path="brand-management" element={<BrandManagement />} />
          <Route path="growth" element={<Growth />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="settings" element={<Settings />} />
          <Route path="my-profile" element={<MyProfile />} />
        </Route>
      </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

// {
//   "email": "sasithhansaka2285@gmail.com",
//   "username":"sasithh",
//   "password":"Str0ng!P@ssw0rd"
// }

// seller id =67e53d69e6c9ad24fd658a39

// {
//   "username":"sasithhr Hansaka",
//   "password":"Str0ng!P@ssw0rd"
// }


 {/* <div className={styles.tipsGrid}>
        <div className={styles.tipCard}>
          <h3>Optimize Product Listings</h3>
          <p>
            Use high-quality images, detailed descriptions, and keywords that
            your customers are searching for.
          </p>
        </div>
        <div className={styles.tipCard}>
          <h3>Respond Promptly to Inquiries</h3>
          <p>
            Fast response times build trust and improve your seller ratings.
          </p>
        </div>
        <div className={styles.tipCard}>
          <h3>Offer Promotions</h3>
          <p>
            Attract more buyers by offering discounts, bundles, and seasonal
            offers.
          </p>
        </div>
        <div className={styles.tipCard}>
          <h3>Maintain Stock Levels</h3>
          <p>
            Keep your inventory updated to avoid order cancellations and
            negative reviews.
          </p>
        </div>
      </div> */}
      {/* <h2 className={styles.videoTitle}>Watch & Learn</h2> */}
      {/* <div className={styles.videoContainer}>
        <iframe
          src="https://www.youtube.com/embed/1P4Hn6eCwZU"
          title="E-commerce Tips for Growth"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.video}
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/0t2zstQ84Tw"
          title="How to Grow Your Online Store"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.video}
        ></iframe>
      </div> */}


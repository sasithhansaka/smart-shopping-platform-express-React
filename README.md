# 🛍️ AI-Powered E-Commerce Platform

An advanced, full-stack e-commerce web application with integrated AI features to enhance user experience and operational efficiency. This platform supports traditional shopping functionalities and introduces AI capabilities like smart product recommendations, customer support, and fraud detection.


# Features

### Customer Features
- Register/Login
- Browse and search products
- View detailed product pages
- Add to cart & place orders
- Use AI Gift Assistant for product suggestions
- Chat with AI for customer support

### Seller Features
- Register as a seller
- List, edit, and manage products
- Track customer feedback
- Monitor product sales and performance

### Admin Features
- Approve/reject seller products
- Monitor flagged fake/fraudulent products
- View platform activity and order trends

  
### AI-Powered Use Cases
- Product fraud detection
- Smart gift assistant (AI recommendations)
- Chatbot for customer support (for the products)



## Project Structure

```
SMART-SHOPPING-PLATFORM/
├── API/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── accessToken_privateKey.pem
│   ├── accessToken_publicKey.pem
│   ├── refreshToken_privateKey.pem
│   ├── refreshToken_publicKey.pem
│   ├── app.js
│   ├── generateKeyPair.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
├── FRONTEND/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       └── images/
│       └── pages/
│   ├── app.js
│   ├── generateKeyPair.js
│   ├── package.json
│   ├── index.html
│   └── .gitignore
│   ├── package-lock.json
├── README.md
├── LICENSE
```

## Getting Started

### Prerequisites
- Node.js
- Python 3.x
- MongoDB & MySQL
- OpenAI API Key (for AI features)

### Installation

```bash
# Clone the repo
git clone https://github.com/sasithhansaka/smart-shopping-platform-express-React.git
cd smart-shopping-platform-express-React

# Clone the SmartGiftSuggester-AI repo
git clone https://github.com/sasithhansaka/smart-shopping-platform-express-React.git

# Clone the Shopbot-AI repo
git clone https://github.com/sasithhansaka/shopbot-ai.git

# Install frontend
cd FRONTEND
npm install

# Install backend
cd API
npm install

### Run the App

1. **Start the backend:**
   ```bash
   cd API
   npm run dev
   ```

2. **Start the frontend:**
   ```bash
   cd FRONTEND
   npm start
   ```
3. **Start the AI services :**
   ```bash
   uvicorn run:app --reload
   ```

## Contributing

1. Fork the repository
2. Create your branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


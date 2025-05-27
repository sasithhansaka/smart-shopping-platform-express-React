# 🛍️ AI-Powered E-Commerce Platform

An advanced, full-stack e-commerce web application with integrated AI features to enhance user experience and operational efficiency. This platform supports traditional shopping functionalities and introduces AI capabilities like smart product recommendations, customer support, and fraud detection.


![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)


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
git clone https://github.com/sasithhansaka/SmartGiftSuggester-AI.git

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


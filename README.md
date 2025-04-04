🛋️ IKEA Home Decor & Furniture Web Application (MERN Stack)
This project is a full-stack eCommerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application is designed to mimic an online IKEA-style home decor and furniture store, offering a seamless shopping experience for users along with robust admin management features.

📌 Project Overview
The application allows users to:

🔍 Browse and search furniture and home decor products by categories

🛒 Add products to cart and adjust quantities

🧾 View complete product details

✅ Register and login to proceed with orders

💳 Enter valid card details to complete the payment (with input validation)

📦 Track the order status (e.g., Pending, Shipped, In Review)

Admins can:

➕ Add new products

✏️ Update existing products

❌ Remove products

👀 View and manage customer orders

🔄 Update order status to keep customers informed

🛠️ Tech Stack
Frontend: React.js, HTML5, CSS3, Bootstrap

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose)

Authentication: JWT (JSON Web Tokens)

Form Validation: Client-side (React) and server-side validations for secure data handling

🌐 Application Features
🧑‍💼 User Side:
User registration and login with secure password hashing

Product catalog with category-based filtering and detailed views

Add-to-cart functionality with quantity management

Checkout process with card details validation

View order history and real-time order status

🔐 Admin Side:
Admin login portal

Add/update/delete product catalog

View orders placed by users

Change shipping status of any order (Pending/Shipped)

🧪 Input Validation
Client-side: Ensures valid card number format, required fields filled, etc.

Server-side: Verifies data integrity before writing to the database

📦 Prerequisites
Make sure you have the following installed:

Node.js (v14+)

MongoDB (local or Atlas)

npm (comes with Node.js)

Git

1️⃣ Clone the Repository
git clone https://github.com/your-username/ikea-home-decor.git
cd ikea-home-decor

2️⃣ Set Up the Backend (Express + MongoDB)
cd server
npm install

🔧 Create a .env file inside the server folder with the following content:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

🚀 Start the backend server:
npm start
It should run on http://localhost:5000.

🔐 Admin Credentials
To access admin features, login with:
Username: admin@example.com
Password: admin123

The Webiste Will look like this:

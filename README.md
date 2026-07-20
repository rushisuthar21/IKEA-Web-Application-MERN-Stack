🛋️ IKEA Home Decor & Furniture Web Application (MERN Stack)
This project is a full-stack eCommerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application is designed to mimic an online IKEA-style home decor and furniture store, offering a seamless shopping experience for users along with robust admin management features.

The Webiste look like this:
<img width="1885" height="889" alt="Screenshot (326)" src="https://github.com/user-attachments/assets/12dfd655-7a8f-4cb9-8d9e-08447e1c710b" />
<img width="1892" height="871" alt="Screenshot (327)" src="https://github.com/user-attachments/assets/ac1157df-a3bf-4854-b667-44aa13fe7816" />
<img width="1920" height="878" alt="Screenshot (328)" src="https://github.com/user-attachments/assets/daabec69-67b7-49a9-bf31-7800cad921f5" />
<img width="1920" height="855" alt="Screenshot (333)" src="https://github.com/user-attachments/assets/089cf3a3-6006-4675-987f-3b03c621b37d" />
<img width="1920" height="845" alt="Screenshot (334)" src="https://github.com/user-attachments/assets/2b382f3f-a2fc-422f-ab0f-cd2c88148f40" />
<img width="1920" height="867" alt="Screenshot (329)" src="https://github.com/user-attachments/assets/1288b7b8-1b32-4dd2-90e4-f99621c25765" />
<img width="1920" height="881" alt="Screenshot (330)" src="https://github.com/user-attachments/assets/ca470919-c01d-4722-82aa-cb3e02737837" />
<img width="1920" height="875" alt="Screenshot (331)" src="https://github.com/user-attachments/assets/5aacde88-8bd3-455d-9b4f-16e22eb44390" />
<img width="1920" height="860" alt="Screenshot (332)" src="https://github.com/user-attachments/assets/bdcd6c3c-63e3-4dad-b315-c40ddbf8ef4a" />


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

🛠️ Tech Stack: Frontend: React.js, HTML5, CSS3, Bootstrap
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
npm start<br>
It should run on http://localhost:3000.

🔐 Admin Credentials
To access admin features, login with:<br>
Username: admin@store.com<br>
Password: admin123

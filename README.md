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
npm start<br>
It should run on http://localhost:3000.

🔐 Admin Credentials
To access admin features, login with:<br>
Username: admin@example.com<br>
Password: admin123

The Webiste Will look like this:
![Screenshot (187)](https://github.com/user-attachments/assets/b90ca267-0153-4a42-afd0-73a437c397d1)
![Screenshot (188)](https://github.com/user-attachments/assets/c6660136-4874-43d4-bdbf-e77aec55033d)
![Screenshot (189)](https://github.com/user-attachments/assets/591311d8-af45-4fc5-bec3-419bbb8c8782)
![Screenshot (190)](https://github.com/user-attachments/assets/904a4731-fd36-433c-83b0-6e98b2928e55)
![Screenshot (191)](https://github.com/user-attachments/assets/da1a472b-f04b-4be6-92ec-44d5537c5c80)
![Screenshot (192)](https://github.com/user-attachments/assets/6ba6059e-1aca-4ebe-86e1-9af224096b4c)
![Screenshot (193)](https://github.com/user-attachments/assets/f1223b88-eb4d-4e51-baa7-4d4709746bc7)
![Screenshot (194)](https://github.com/user-attachments/assets/4da7cba0-e043-436f-869e-129424846fde)
![Screenshot (195)](https://github.com/user-attachments/assets/dde02acd-ad67-48a5-b37f-6993c23e30ab)
![Screenshot 2025-04-04 224531](https://github.com/user-attachments/assets/3e860f6e-2e39-4948-80b3-853d9a0adff1)
![Screenshot 2025-04-04 224600](https://github.com/user-attachments/assets/bd622974-b68f-432f-a658-a405dd650c58)
![Screenshot 2025-04-04 224640](https://github.com/user-attachments/assets/ee9736c2-8fa6-41da-9c96-21393018b941)
![Screenshot 2025-04-04 224654](https://github.com/user-attachments/assets/854123ac-d845-4be5-ab61-4622a4de5c2f)









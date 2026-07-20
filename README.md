🛋️ IKEA Home Decor & Furniture Web Application (MERN Stack)
This project is a full-stack eCommerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application is designed to mimic an online IKEA-style home decor and furniture store, offering a seamless shopping experience for users along with robust admin management features.

The Webiste look like this:
<img width="1920" height="1080" alt="Screenshot (326)" src="https://github.com/user-attachments/assets/2ba63839-431b-4476-923c-49f5b8244ecc" />
<img width="1920" height="1080" alt="Screenshot (328)" src="https://github.com/user-attachments/assets/475e1463-1188-4e42-9a8e-b92a6d1764e3" />
<img width="1920" height="1080" alt="Screenshot (327)" src="https://github.com/user-attachments/assets/0346b73f-ae82-4a1a-982b-5c75cb73c634" />
<img width="1920" height="1080" alt="Screenshot (333)" src="https://github.com/user-attachments/assets/100ee885-8107-4021-872e-eef28acdd14b" />
<img width="1920" height="1080" alt="Screenshot (334)" src="https://github.com/user-attachments/assets/fe39b17c-5992-4307-bbb2-80c203826f0b" />
<img width="1920" height="1080" alt="Screenshot (329)" src="https://github.com/user-attachments/assets/3ef55118-dbeb-424e-bb34-ff12a836adfc" />
<img width="1920" height="1080" alt="Screenshot (330)" src="https://github.com/user-attachments/assets/1a29ba97-0aaf-43af-b497-6fe49edec42e" />
<img width="1920" height="1080" alt="Screenshot (331)" src="https://github.com/user-attachments/assets/daa107d6-a25b-4b04-85d6-e38365ba5816" />
<img width="1920" height="1080" alt="Screenshot (332)" src="https://github.com/user-attachments/assets/98228dd1-f434-450d-8b1a-7837ba245800" />


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

# 🍏 GROCERY E-COMMERCE CENTRAL ENGINE — Full-Stack Web Platform

An ultra-premium, full-stack grocery e-commerce and active inventory management platform built on a secure cloud cluster architecture. Featuring independent operational layers for **Store Administrators** (Crimson-Neon UI parameters for inventory addition) and **Customers** (Violet-Neon UI environments for seamless shopping), wired with an absolute secure cookie identity layer and real-time stock synchronization engines.

---

## 🚀 Key Architectural Modules

### 1. Fresh Inventory & Admin Catalog Framework
* **Secure Database Tracing Engine:** Automatic linkage of dynamic structural grocery items with active database admin tokens (`adminId` tracing via Mongo ObjectId) to audit who added or updated the stock.
* **Product Parameters Management:** Complete validation schemas targeting product weights, prices, departments (Fruits, Vegetables, Dairy, Beverages), and image source structures.

### 2. Identity & Session Shield Parameter Block
* **Two-Way Cookie Validation Matrix:** Utilizes dual HTTP-only cookie layers (`accessToken` and `refreshToken`) preventing cross-site scripting variables during checkout flows.
* **Dynamic Active Node Management:** Complete visibility and independent single or bulk session evictions (`logoutAllDevice`) tracking unique user agent signatures.
* **Auto-Pilot Token Rotation Engine:** Seamless background axios interceptor tracking expired access keys and processing silent renewals without page reload flashes.

### 3. Viewport Locked Shopping Terminals (`100vh` Layout)
* **Zero Layout Shifts:** Fixed sidebar and navbar viewport locks utilizing modern CSS Tailwind flex layers preventing layout shifts on deep cards shopping grids.
* **Interactive Responsive Drawers:** Adaptive layout hamburger transitions sync across mobile layouts for on-the-go grocery purchases.

---

## 🛠️ Technological Stacks Integration

* **Frontend Engine:** React 19, Vite, TypeScript Typing Frameworks, Tailwind CSS 4.0, Lucide Graphic Packages.
* **Backend Pipeline:** Node.js, Express.js REST Routers, Mongoose ORM Model Bindings.
* **Session & Store Database:** MongoDB Atlas Schemas (`userModels`, `productModels`, `sessionModels`, `refreshTokenModels`).

---

## 📁 System Core Repository Topology

```text
├── backend/
│   ├── src/
│   │   ├── config/             # DB, Environment and Passport strategies Configurations
│   │   ├── controllers/        # Express Routing Handlers (Auth, Profile, Products, Sessions)
│   │   ├── middleware/         # Security Route Access Guards (authMiddleware, verification)
│   │   ├── models/             # Mongoose Schemas (User, Product, Session, RefreshToken)
│   │   ├── routes/             # Isolated Endpoint Matrix Routing Paths
│   │   └── server.js           # Express Cluster Boot Initialization Engine
│   
├── frontend/
│   ├── src/
│   │   ├── api/                # Custom Axios Instances Configs (privateAPI with Interceptors)
│   │   ├── components/         # Global Layout Modules (User Sidebar, Navbars, Loading Spinners)
│   │   ├── Pages/
│   │   │   ├── Admin/          # Admin Layout Wrappers, AdminProducts Catalog Views
│   │   │   └── UserDashboard/  # User Profiles Controls, UserOrders Tables Views
│   │   ├── App.tsx             # Nested Route Management Control Hub
│   │   └── main.tsx            # React Component Render Mount Path

```

## Now I am moving to Implement the Session management On Frontend

As we create three api on backend For session managemnt so there we implement on Frontend 
so we create a `Component for device card` in components folder pass props and `DeviceManagement` file in Settings Folder where we pass user devices through props
create a `sesssionService` in services folder then call all three apis in `sessionService`  `getSession` `LogOutDevice` `LogoutAllDevice` 
 
## I have to update get-all-session

To add `current key` in session Schema when I am Implemmenting the session management I have to check the user `Current device` for delete one device so i have get `cookie token` in `get-all-session` controller and check the session.refreshToken and cookie token if same then `current` will be change   `true` and then forntend we get true so it is current device   

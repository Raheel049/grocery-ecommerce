// import mongoose from "mongoose";

// export const dbConnect = () => {
//     const URI = process.env.MONGODB_URI;

//     mongoose.connect(URI)
//     .then(() => console.log("Database connected successfully!"))
//     .catch((error) => console.log("through error", error))
// }


import mongoose from "mongoose";

// Ek global variable banayein connection state check karne ke liye
let isConnected = false; 

export const dbConnect = async () => {
    // Agar pehle se connected hai to dobara connect na karein
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    const URI = process.env.MONGODB_URI || "mongodb+srv://raheel25031_db_user:R%40heel049Ahmed@cluster0.vhstakn.mongodb.net/";

    if (!URI) {
        console.log("MONGODB_URI is missing in env variables!");
        return;
    }

    try {
        const db = await mongoose.connect(URI);
        // connection state 1 ka matlab hai "Connected"
        isConnected = db.connections[0].readyState === 1; 
        console.log("Database connected successfully!");
    } catch (error) {
        console.log("Database connection error:", error);
        throw error; // Error throw karein taake API ko pata chale
    }
};
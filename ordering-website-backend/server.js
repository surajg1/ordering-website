// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Item = require("./models/Item"); 
const cors = require("cors");
app.use(cors());


mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB database.");
});

app.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find({}, "name sku price"); 

        res.json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/search", async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({ error: "Search query is required." });
        }

        const items = await Item.find({
            $or: [
                { sku: { $regex: new RegExp(search, "i") } }, 
                { name: { $regex: new RegExp(search, "i") } },
            ],
        });

        res.json(items);
    } catch (error) {
        console.error("Error searching for items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

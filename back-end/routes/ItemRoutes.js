const express = require("express");
const Item = require("../models/Item");

const router = express.Router();


// Create 
router.post("/create",async(req, res)=>{
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
})

module.exports = router;
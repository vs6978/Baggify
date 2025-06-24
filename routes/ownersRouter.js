const express = require('express');
const router = express.Router();
const Owner = require('../models/owners-model');


if (process.env.NODE_ENV === "development") {

    router.post("/create", async function (req, res) {
        let owner = await Owner.find()
        if (owner.length > 0) {
            return res
                .status(500)
                .send("You dont have permission to create a new owner");
        }

        let{fullname,email,password}=req.body;

        let createdOwner=await Owner.create({
            fullname,
            email,
            password,

        });
        res.status(201).send(createdOwner);
    });
}

router.get("/", function (req, res) {
    res.send('hey its working');
});



module.exports = router;
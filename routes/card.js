const express = require("express");
const router = express.Router();
const {cardDetails} = require("../models");


router.get("/cards", (req, res) => {
    const {id} = req.query;
    console.log("Entered");
    run().catch(error => console.log(error.stack));
    async function run() {
        try {
            const row = await cardDetails.findAll({where: {collectionId: id}});
            res.json({status: 1, data: row});        
        } catch (err) {
            console.log(err);
            res.json({status: 0, msg: err});
        }
    }
});

router.post("/cards", (req, res) => {
    const {id, title, frontbody, backbody} = req.body;
    run().catch(error => console.log(error.stack));
    async function run() {
        try {
            const row = await cardDetails.create({
                collectionId: id,
                title: title,
                frontBody: frontbody,
                backBody: backbody
            });
            if(row){
                res.json({status: 1, msg: "Successfully Pushed"});
            } else{
                res.json({status: 0, msg: "Unsuccessfully Pushed"});
            }
        } catch (err) {
            console.log(err);
            res.json({status: 0, msg: "error occured"});
        }
    }

});

router.put("/cards", (req, res) => {
    const {id, collectionId, title, frontbody, backbody} = req.body;
    console.log(req.body);
    run().catch(error => console.log(error.stack));
    async function run() {
        try {
            const row = await cardDetails.update({ collectionId: collectionId, title: title, frontBody: frontbody, backBody:backbody }, {
                where: {
                  id: id
                }
            });
            if(row){
                res.json({status: 1, msg: "Successfully Changed"});
            } else{
                res.json({status: 0, msg: "Id Doesn't Exist Mate!"});
            }
        } catch (err) {
            console.log(err);
            res.json({status: 0, msg: "error occured"});
        }
    }
});

router.delete("/cards/:id", (req, res) => {
    const {id} = req.params;
    run().catch(error => console.log(error.stack));
    async function run() {
        try {
            const row = await cardDetails.destroy({where: {id: id}});
            if(row){
                res.json({status: 1, msg: "Successfully Deleted"});
            } else{
                res.json({status: 0, msg: "Unsuccessfully Deleted"});
            }
        } catch (err) {
            console.log(err);
            res.json({status: 0, msg: "error occured"});
        }
    }


});


module.exports = router;
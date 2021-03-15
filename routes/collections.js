const express = require("express");
const router = express.Router();
const {collection} = require("../models");


router.get("/collection", (req, res) => {
    console.log("Entered");
    run().catch(error => console.log(error.stack));
    async function run() {
        try {
            const row = await collection.findAll({
                attributes: ['id', 'name']
            });
            res.json({status: 1, data: row});        
        } catch (err) {
            console.log(err);
            res.json({status: 0, msg: err});
        }
    }
});

router.post("/collection", (req, res) => {
    let {name} = req.body;
    run().catch(error => console.log(error.stack));
    async function run() {
        try {
            name = name.toLowerCase();
            const row = await collection.create({
                name: name
            });
            if(row){
                res.json({status: 1, msg: "Successfully Pushed"});
            } else{
                res.json({status: 0, msg: "Unsuccessfully Pushed! It already Exist!"});
            }
        } catch (err) {
            console.log(err);
            res.json({status: 0, msg: "error occured"});
        }
    }

});

router.put("/collection/:id/:name", (req, res) => {
    const {id, name} = req.params;
    run().catch(error => console.log(error.stack));
    async function run() {
        try {
            const row = await collection.update({ name: name }, {
                where: {
                  id: id
                }
            });
            if(row){
                res.json({status: 1, msg: "Successfully Changed"});
            } else{
                res.json({status: 0, msg: "Name Should be Unique Pushed! Its Already Present"});
            }
        } catch (err) {
            console.log(err);
            res.json({status: 0, msg: "error occured"});
        }
    }
});

router.delete("/collection/:id", (req, res) => {
    const {id} = req.params;
    run().catch(error => console.log(error.stack));
    async function run() {
        try {
            const row = await collection.destroy({where: {id: id}});
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
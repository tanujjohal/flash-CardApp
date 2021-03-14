const express = require("express");
const { stringify } = require("qs");
const router = express.Router();
const {collection} = require("../models")

let user = 0;

router.get("/api/v1/login", (req, res) => {
    console.log("Login");
    const {id, password} = req.query;
    console.log(req.query);

    if(id == 'admin' && password =='admin'){
        req.session.userID = 1;
        res.json({status: 1})
    } else{
        res.json({status: 0});
    }
});

router.get("/login", (req, res) => {    
    const {userID} = req.session;
    if(userID == undefined){
        res.render('login');
    } else{
        res.redirect('/index');
    }
});

router.get("/logout", (req, res) => {
    console.log("LOgout");
    req.session.destroy(function(err){
        if(err){
           console.log(err);
           res.json({status: 0});
        }else{
            res.json({status: 1});
        }
     });
   
});

router.get("/index", (req,res) => {
    const {userID} = req.session;
    console.log(userID);
    if(userID == undefined){
        res.redirect('login');
    } else{
        run().catch(error => console.log(error.stack));
        async function run() {
            try {
                const row = await collection.findAll({
                    attributes: ['id', 'name']
                }); 
                let data = {};
                row.map((value, index) => {
                    console.log(value.dataValues.name);
                    console.log(value.dataValues.id);
                    data[value.dataValues.name] = value.dataValues.id;
                });
                data = JSON.stringify(data);
                console.log(data);
                
                res.render('index', {
                    data: data
                });
            } catch (err) {
                console.log(err);
            }
        }
    }
})

module.exports = router;
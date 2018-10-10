var express=require('express');
var router=express.Router();
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var Enquiry=require('../models/enquiry');
var Product=require('../models/product');
var multer=require('multer');
var path=require('path');
const storage=multer.diskStorage({
    destination:'./public/uploads',
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload=multer({
    storage:storage
});
router.post('/send/enquiry',(req,res)=>{
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var query=req.body.query;
    const enquiry=new Enquiry({
        name:name,
        phone:phone,
        email:email,
        query:query,
        status:'Query sent'
    });
    enquiry.save.then(result=>{
        res.send(err);
    }).catch(err=>{
        res.send('enquiry sent');
    });
});
router.post('/update/enquiry',(req,res)=>{
    let record={};
    record.name=req.body.name;
    record.phone=req.body.phone;
    record.email=req.body.email;
    record.query=req.body.query;
    let query={_id:req.body._id};
    Enquiry.updateOne(query,record,(err)=>{
        if(err)
            {
                res.status(500).send(err);
            }
        else
            {
                res.status(200).send('Success');
            }
    });
});
router.delete('/delete/enquiry',(req,res)=>{
    var id =req.body._id;
    let query={_id:_id};
    Enquiry.findById(id,(err,Enquiries)=>{
        if(err)
            {
                res.status(500).send(err);
            }
        else
            {
                Enquiry.deleteOne(query,(err)=>{
                    if(err)
                        {
                            res.stauts(500).send(err);
                        }
                    else
                        {
                            res.status(200).send('Success');
                        }
                });
            }
    });

});

router.post('/add/product',upload.single('picture'),(req,res)=>{
     var name=req.body.name;
     var price=req.body.price;
     var category=req.body.category;
     var picture=req.file.originalname;
    
     const product = new Product({
         name:name,
         price:price,
         category:category,
         picture:picture
     });
    product.save().then(result=>{
        res.status(200).send('success');
    }).catch(err=>{
        res.status(500).send(err);
    });
});
module.exports=router;
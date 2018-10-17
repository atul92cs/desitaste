var express=require('express');
var router=express.Router();
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var Enquiry=require('../models/enquiry');
var Product=require('../models/product');
var User=require('../models/user');
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

router.post('/add/product',(req,res)=>{
     var name=req.body.name;
     var price=req.body.price;
     var category=req.body.category;
    
    
     const product = new Product({
         name:name,
         price:price,
         category:category,
         
     });
    product.save().then(result=>{
        
        res.status(200).redirect('back');
    }).catch(err=>{
        res.status(500).send(err);
    });
});
router.post('/update/product',(req,res)=>{
    let record={};
    record.name=req.body.name;
    record.price=req.body.price;
    record.category=req.body.category;
    let query={_id:req.body._id};
    Product.updateOne(query,record,(err)=>{
        if(err)
            {
                res.status(500).send(err);
            }
        else
            {
                res.status(200).send('success');
            }
    });
    
});

router.delete('/delete/product/:id',(req,res)=>{
    var id=req.params.id;
    let query={_id:req.params.id};
    Product.findById(req.params.id,(err,Products)=>{
        if(err)
            {
                
                res.status(500).send('product not found');
            }
        else
            {
               Product.deleteOne(query,(err)=>{
                   if(err)
                       {
                           res.status(500).send('internal error');
                       }
                   else
                       {
                           res.status(200).send('Success');
                       }
               });
            }
    });
});
router.post('/register',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    var password2=req.body.password2;
    User.getUserbyEmail(email,(err,user)=>{
        if(err)
            {
              res.status(500).send(err);   
            }
        else
            {
                var user =new User({
                    email:email,
                    password:password
                });
                User.hashPassword(user,(err,user)=>{
                    if(err) throw err;
                    res.status(200).send('User registered');
                });
            }
    });
});
passport.use(new localStrategy((email, password, done) => {
    User.getUserbyEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return done(null, false);
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);

            } else {
                return done(null, false);
            }
        });
    });
}));
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    User.getUserbyId(id, (err, user) => {
        done(err, user);
    });
});
router.post('/login', passport.authenticate('local', {
    sucessRedirect: '/panel',
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/panel');

});
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
module.exports=router;
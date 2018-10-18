var express=require('express');
var router=express.Router();
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var Enquiry=require('../models/enquiry');
var Product=require('../models/product');
var User=require('../models/user');
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
    enquiry.save().then(result=>{
        res.render('contact',{msg:'Query sent we will reply you in a while'});
    }).catch(err=>{
        res.render('contact',{msg:'oops error occured please try again'});
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
                res.render('panel-enquiries',{msg:'Oops! error occured please try again'})
            }
        else
            {
                res.render('panel-enquiries',{msg:'Query updated'});
                
            }
    });
});
router.delete('/delete/enquiry/:id',(req,res)=>{
    var id =req.params.id;
    let query={_id:req.params.id};
    Enquiry.findById(req.params.id,(err,Enquiries)=>{
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
        
        res.render('panel',{msg:'Product created'});
    }).catch(err=>{
        res.render('panel',{msg:'Opps ! error occured'});
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
                res.render('panel',{msg:'Product updated'});
            }
        else
            {
                res.render('panel',{msg:'Oops! Error occured'});
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
                    res.render('register',{msg:'User registered'});
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
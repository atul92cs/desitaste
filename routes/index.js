const Product = require('../models/product');
const Enquiry=require('../models/enquiry');
exports.home=(req,res)=>{
    res.render('home');
};
exports.about=(req,res)=>{
  res.render('about');  
};
exports.menu=(req,res)=>{
    Product.find({},(err,docs)=>{
        if(err)
            {
                throw err;
                console.log(err);
            }
        else
            {
                var cursor=docs;
                res.render('menu',{Products:cursor}); 
            }
    });
  
    
};
exports.contact=(req,res)=>{
  res.render('contact');  
};
exports.login=(req,res)=>{
    res.render('login');
};
exports.register=(req,res)=>{
    res.render('register');
};
exports.panel=(req,res)=>{
    Product.find({},(err,docs)=>{
        if(err)
          {
              throw err;
              console.log(err);
          }
         else
             {
                 var cursor=docs;
                 res.render('panel',{Products:cursor})
             }
    });
    
};
exports.enquiries=(req,res)=>{
    Enquiry.find({},(err,docs)=>{
        if(err)
            {
                throw err;
                console.log(err);
            }
        else
            {
                var cursor=docs;
                res.render('panel-enquiries',{Enquiries:cursor})
            }
    });
};
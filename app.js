var express=require('express');
var path=require('path');
var http=require('http');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var passport=require('passport');
var user=require('./routes/user');
var routes=require('./routes');
var port=process.env.PORT||8080;
var app=express();
var db=mongoose.connect('mongodb+srv://pari_dhanupaul:pari2013@cluster0-sexi1.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });
app.set('views',__dirname+'/views');
app.set('view engine','pug');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
 app.use(session({ secret: "cats",saveUninitialized: true,
  resave: true  }));
  app.use(passport.initialize());
  app.use(passport.session());
app.post('/add/product',user);
app.post('/send/enquiry',user);
app.post('/update/enquiry',user);
app.post('/add/product',user);
app.post('/update/product',user);
app.post('/update/productpicture',user);
app.post('/register',user);
app.post('/login',user);
app.delete('/delete/enquiry',user);
app.delete('/delete/product/:id',user);
app.get('/',routes.home);
app.listen(port,()=>{
    console.log('server started on' +' ' +port);
});
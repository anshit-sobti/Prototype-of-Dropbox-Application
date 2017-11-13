var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);
var kafka = require('./routes/kafka/client');
var routes = require('./routes/index');
var users = require('./routes/users');
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);
const util = require('util');
var Busboy= require('busboy');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(passport.initialize());
// uncomment after placing your favicon in /publicvar mongoURL = "mongodb://localhost:27017/login";
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);

app.post('/logout', function(req,res) {
    console.log(req.session.user);
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});

app.post('/doLogin', function(req, res) {
	console.log("Inside Do Login");
	var username=req.body.username;
	var password=req.body.password;
	kafka.make_request('login_topic',{type:"login",username:username,password:password}, function(err,results){
                console.log(req.body);
                console.log(results);
                if(err){
                	res.status(500).send({message:"Wrong"});
                }
                else
                {
                    if(results.code == 200){
                    	res.status(201).send(results.value);
                    }
                    else{
                    	res.status(400).send({message:"In else"});
                    }
                }
            });
        	
       // 	res.status(201).send({message:"Sent by register function"});
      
    });

app.post('/register',function(req,res){
	
	var email=req.body.email;
	var firstname=req.body.firstname;
	var lastname=req.body.lastname;
	var birthdate=req.body.birthdate;
	var aboutme=req.body.aboutme;
	var company=req.body.company;
	var school=req.body.school;
	var number=req.body.number;
	var interests=req.body.interests;
	var username=req.body.username;
	var anniversary=req.body.anniversary;
	var password=req.body.password;
	/*
	email: 'a',
	  firstname: 'a',
	  lastname: 'a',
	  birthdate: '2017-10-10',
	  aboutme: 'aa',
	  company: 'a',
	  school: 'a',
	  number: '6692336902',
	  interests: 'a',
	  username: 'a',
	  anniversary: '2017-10-16',
	  password: 'a
	  */
            	kafka.make_request('login_topic',{type:"register",email:email,firstname:firstname,lastname:lastname,birthdate:birthdate,aboutme:aboutme,company:company,school:school,
            number:number,interests:interests,username:username,anniversary:anniversary,password:password		}, function(err,results){
                    console.log(req.body);
                    console.log(results);
                    if(err){
                    	res.status(500).send({message:"Wrong"});
                    }
                    else
                    {
                        if(results.code == 200){
                        	res.status(201).send({message:"Sent by register function"});
                        }
                        else {
                        	res.status(400).send({message:"In else"});
                        }
                    }
                });
            	
           // 	res.status(201).send({message:"Sent by register function"});
          
        });




app.post('/getDetails',function(req,res){
	kafka.make_request('login_topic',{type:"getdetails",username:req.body.username}, function(err,results){
                if(err){
                	res.status(500).send({message:"Wrong"});
                }
                else
                {
                    if(results.code == 200){
                    	
                    	res.status(201).json(results.value);
                    }
                    else {
                    	res.status(400).send({message:"In else"});
                    }
                }
            });
	
})




app.post('/checkSession',function(req,res){
	
	kafka.make_request('login_topic',{type:"checksession"}, function(err,results){
        
        if(err){
        	res.status(500).send({message:"Wrong"});
        }
        else
        {
            if(results.code == 200){
            	
            	res.status(201).json({status:201,username:results.value.username});
            }
            else {
            	res.status(401).json({status:401,message:"In else"});
            }
        }
    });
	
	
});



app.post('/getupload', function(req,res) {
	console.log('In getupload');
	console.log(req.files);
	var busboy = new Busboy({ headers: req.headers });
    /*busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      var saveTo = path.join('./', filename);
      console.log('JAMLA PAIJE UPLOADING '+filename);
      console.log('Uploading: ' + saveTo);
      file.pipe(fs.createWriteStream(saveTo));
    });*/
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
	      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
	      var data1="";
	      file.on('data', function(data) {
	    	  data1=data;
	    	  //console.log("Data is: "+data);
	       // console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
	      });
	      file.on('end', function() {
	      //  console.log('File [' + fieldname + '] Finished');
	      });
	      console.log(data1);
	    });
		req.pipe(busboy);
	
kafka.make_request('login_topic',{type:"uploader",file:req.body.name}, function(err,results){
        
        if(err){
        	res.status(500).send({message:"Wrong"});
        }
        else
        {
            if(results.code == 200){
            	console.log('Ithe gela');
            	res.status(201).json(results.value);
            }
            else {
            	res.status(401).json({status:401,message:"In else"});
            }
        }
    });

	
	//console.log(req.file);
    //console.log('GETUPLOAD');
  
});

module.exports = app;

var express=require('express');
var nodemailer = require("nodemailer");
var config = require('./config.json');

var app=express();

var smtpTransport = nodemailer.createTransport({
    service: config.mail.service,
    host: config.mail.host,
    auth: {
        user: config.mail.user,
        pass: config.mail.password
    }
});


app.get("/",function(req,res, next){
    res.sendfile(config.site.home);
});

app.get("/send", function(req,res){
    var mailOptions={
        from: config.mail.email,
        to: config.mail.destination,
        subject : req.query.subject,
        text: req.query.text,
        replyTo: req.query.replyTo,
    }
    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response);
            res.end("sent");
        }
    });
});

app.use(express.static(__dirname));
app.listen(config.server.port, config.server.url, function(){
    console.log("Express Started on Port " + config.server.port);
});



const express = require("express");
const https = require("https"),
      fs = require("fs");

const options = {
    cert: fs.readFileSync("/etc/letsencrypt/live/mkzense.com/fullchain.pem"),
    key: fs.readFileSync("/etc/letsencrypt/live/mkzense.com/privkey.pem")
};

const app = express();

app.use(function(req, res, next) {
    if (req.secure) {
	console.log("secure request");
        next();
    } else {
	console.log("non-secure request");
        res.redirect('https://' + req.headers.host + req.url);
    }
});

app.use((req, res) => {
    res.writeHead(200);
    res.end("hello world\n");
});

//http on port 80
app.listen(80, ()=>{
    console.log("http listener on port 80");
});

//https on port 443
https.createServer(options, app).listen(443,()=>{
    console.log("https listener on port 443");
});


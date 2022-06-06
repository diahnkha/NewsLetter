const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    //apiKey-mailchimp
    //afba4350ed43ab3cdcefdd32493bfbb8-us17

    //listID
    //c41ebc5616

    const firstName = req.body.fName;
    const lastName =  req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                FNAME: firstName,
                LNAME: lastName 
                }
            }
        ]
    };


    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/c41ebc5616";

    const options = {
        method: "POST",
        auth: "horrorserem:afba4350ed43ab3cdcefdd32493bfbb8-us17"

    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

// app.post("/", function(req, res){

//     const query = "London";
//     const apiKey = "d7634a68daa6b0a26b096891386890b6"
//     const unit = "metric"

//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units= " + unit;

//     https.get(url, function(response){
//         console.log(response);
//     });


//     res.send("mantapp received");
// });

app.listen(process.env.PORT || 3000, function(){
    console.log("app running on port 3000.");
});

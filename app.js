const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const port = 2000;
const app = express();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUrvmGFyKFjRK6rheh7ib_yBu0Cn5Nz4s",
  authDomain: "newsletter--signup-817aa.firebaseapp.com",
  projectId: "newsletter--signup-817aa",
  storageBucket: "newsletter--signup-817aa.appspot.com",
  messagingSenderId: "1011708616575",
  appId: "1:1011708616575:web:fa8f6be5d9e300a475444a",
  measurementId: "G-LNRWH5ZZDW"
};

// Initialize Firebase
app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
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
  const url = "https://us8.api.mailchimp.com/3.0/lists/9d09a83a1a";
  const options = {
    method: "POST",
    auth: "tushar:5d3c95c65c9b08503efcbaaee310975b-us8"
  }

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    }else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  //request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
})

app.listen(process.env.PORT || port, function() {
  console.log("Server is running on " + port);
});


//API Key
//5d3c95c65c9b08503efcbaaee310975b-us8

//List Id
//9d09a83a1a

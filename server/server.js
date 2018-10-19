const express = require("express");
var cors = require("cors");
const app = express();
const port = 3001;

var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/node-twitter",
  {
    useNewUrlParser: true
  }
);

var db = mongoose.connection;

var tweetSchema, Tweet;

db.on("error", err => {
  console.log("Connection error", err);
});
db.once("open", () => {
  console.log("Connected.");

  // tweetSchema = new mongoose.Schema({
  //   text: String
  // });

  // Tweet = mongoose.model("Tweet", tweetSchema);

  // var tweetOne = new Tweet({
  //   text: "Simplicity is the ultimate sophistication."
  // });
  // console.log(tweetOne.text);

  // tweetOne.save((err, result) => {
  //   if (err) return console.error(err);

  //   console.log("Document added.");
  // });
});

var corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());
app.use(express.json());

app.get("/tweet", (req, res, next) => {
  Tweet.find({ author: "kdrenski" }, (err, result) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ tweet_data: result });
    next();
  });
});

app.post("/tweet/add", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Request: ", req.body);
  createTweet(req.body);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

tweetSchema = new mongoose.Schema({
  text: String,
  author: String
});

Tweet = mongoose.model("Tweet", tweetSchema);

// var tweetOne = new Tweet({
//   text: "Simplicity is the ultimate sophistication."
// });
// console.log(tweetOne.text);

// tweetOne.save((err, result) => {
//   if (err) return console.error(err);

//   console.log("Document added.");
// });

var createTweet = data => {
  var tweet = new Tweet({
    text: data.text,
    author: data.author
  });

  tweet.save((err, result) => {
    if (err) {
      return console.error(err);
    }

    console.log("Tweet posted.");
  });
};

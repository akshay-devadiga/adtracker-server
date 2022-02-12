var express = require("express");
var path = require("path");
var campaignRouter = require("./routes/campaign");
var cors = require("cors");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//To allow cross-origin requests
app.use(cors());

// DB connection
var MONGODB_URL = "mongodb+srv://mongotest:e9Ky1YIAadUdTjof@cluster0.ogpxj.mongodb.net/adtracker?retryWrites=true&w=majority";
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});

app.use("/campaigns/", campaignRouter);
// throw 404 if URL not found
app.all("*", function(req, res) {
var data = {
		status: 0,
		message: "Page not found",
	};
	return res.status(404).json(data);
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
        var data = {
            status: 0,
            message: "Unauthorized",
        };
        return res.status(401).json(data);
	}
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;
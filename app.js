const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const ClientRoute = require("./routes/clientRoute");
const CMSRoutes = require("./routes/cmsRoute");
const PageRoutes = require("./routes/pageRoute");
const SectionRoutes = require("./routes/sectionRoute");
const BcRoutes = require("./routes/bcRoute");
const SiteRoutes = require("./routes/siteRoute");
const ProductsRoutes = require("./routes/productRoute");

//Initialize the express application
const app = express();

//Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());

//Session
app.use(cookieParser());
app.set("trust proxy", 1); // trust first proxy

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"]
  })
);

//Routes
app.use("/api/client", ClientRoute);
app.use("/api/cms", CMSRoutes);
app.use("/api/page", PageRoutes);
app.use("/api/section", SectionRoutes);
app.use("/bc", BcRoutes);
app.use("/api/site", SiteRoutes);
app.use("/product", ProductsRoutes);

//app.use("/api/block", BlockRoutes);

//Static files
//app.use(express.static("public"));
if (true) {
  app.use(express.static("client/build"));
}

//Catch 404 Errors and forwards them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status;

  //Respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  //Respond to server
  console.error(err);
});

//Port
const PORT = process.env.PORT || 4000;

//Start the server
app.listen(PORT, console.log(`Application is running on port ${PORT}`));

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const CMSRoutes = require("./routes/cmsRoute");
const PageRoutes = require("./routes/pageRoute");
const SectionRoutes = require("./routes/sectionRoute");

//Initialize the express application
const app = express();

//Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api/cms", CMSRoutes);
app.use("/api/page", PageRoutes);
app.use("/api/section", SectionRoutes);

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

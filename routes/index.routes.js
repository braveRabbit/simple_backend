const errorHandler = require("../middlewares/errorHandler");
const httpStatus = require("http-status");
const sitesRouter = require("./sites.routes");

module.exports = function (app) {
  app.get("/", (req, res, next) => {
    res.status(200).json({
      success: true,
    });
  });

  app.use(`/${process.env.API_PREFIX}/sites`, sitesRouter);

  app.use("*", async (req, res, next) => {
    return res.status(httpStatus.NOT_FOUND).json({
      error: true,
      message: "Route not found! " + req.method + ": " + req.originalUrl,
    });
  });

  app.use(errorHandler);
};


const errorHandler = (error, req, res, next) => {
 // let error = { ...err };
 // error.message = err.message;
  // Log to console for developers
  console.log("sera"+error);
  console.log(error.statusCode);
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error"
  });
};

export default errorHandler;
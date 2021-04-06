const urlNotFound = (req,res,next) => {
    const error = new Error(`URL NOT FOUND - ${req.originalUrl}`);
    res.status(404);
    next(error);
}


const errorHandler = (err, req, res, next) => {
  const StatusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(StatusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "null" : err.stack,
  });

};


export { urlNotFound, errorHandler };
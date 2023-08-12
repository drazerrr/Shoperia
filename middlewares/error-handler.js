const errorHandleMiddleware = (err, req, res, next) => {
    if(err) {
        console.log(err);
    }
}

export default errorHandleMiddleware
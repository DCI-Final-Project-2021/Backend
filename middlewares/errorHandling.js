const errorHandling = (error, req, res, next) => {
    console.log(error);
    res.status(500).send();
};

export default errorHandling;
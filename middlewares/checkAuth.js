import tokenHandler from "../lib/token.js";

const checkAuth = (req, res, next) => {
    if (!req.cookies.token || !tokenHandler.verifyToken(req.cookies.token)) return res.status(401).json({result:false});
    next();
};

export default checkAuth;
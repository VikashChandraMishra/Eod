const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;



const fetchUser = (req, res, next) => {

    const token = req.header('authToken');

    if (!token) {

        return res.status(401).send({ error: "invalid token" });
    
    }

    try {

        req.id = jwt.verify(token, SECRET_KEY);
        next();
    
    } catch (error) {

        return res.send({ error: "invalid token" });
    
    }

}



module.exports = fetchUser;
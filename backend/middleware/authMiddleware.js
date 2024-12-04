const jwt = require('jsonwebtoken')

const {jwt: jwtConfig} = require('../config/config')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ error: 'Токен отсутствует'});
    }

    jwt.verify(token, jwtConfig.secret, (err, user) => {
        if (err) {
            return res.status(403).json({error: 'Неверный токен'});
        }

        req.user = user;
        next();
    })
}

module.exports = authenticateToken;
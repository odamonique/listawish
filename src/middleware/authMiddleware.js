const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

//Middleware de autenticação usando JWT
const authMiddleware = (req, res, next) =>{

    const authHeader = req.headers.authorization;

    //Checar se token existe
    if (!authHeader) {
        return res.status(401).json({
            error: "Token não fornecido"
        });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({
            error: "Token mal formatado"
        });
    }

    const [scheme, token] = parts;

    if (scheme !== 'Bearer') {
        return res.status(401).json({
            error: "Token mal formatado"
        });
    }

    //Verificar o token
    jwt.verify(token, jwtConfig.secret, {algorithms: [jwtConfig.algorithm]}, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: "Token inválido"
            });
        }

        //Id do usuario autenticado
        req.usuarioId = decoded.id;

        return next();
    });

};


module.exports = authMiddleware;
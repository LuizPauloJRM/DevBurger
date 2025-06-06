import authConfig from "../config/auth";
import jwt from 'jsonwebtoken';


function authMiddleware(request, response, next) {
    //console.log(request.headers.authorization);
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' })
    }

    const token = authToken.split(' ').at(1);

    try {
        jwt.verify(token, authConfig.secret, (err, docoded) => {
            if (err) {
                throw new Error()
            }
            //console.log(decoded)
            request.userId = decoded.id;
        });
    } catch (err) {
        return response.status(401).json({ error: 'Token is invalid' });
    }

    return next();
}

export default authMiddleware;
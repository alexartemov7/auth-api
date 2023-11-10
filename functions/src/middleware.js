import jwt from "jsonwebtoken";
import { secretKey } from "./creds.js";

export async function isAuthenticated(req, res, next) {
    //first check if they have a token:
    const { authorization } = req.headers;
    if(!authorization) {
        res.status(401).send({ message: 'No authorization token found'});
        return;
    }
    //then check if the token is valid:
    jwt.verify(authorization, secretKey, (err, decoded) => {
        if(err) {
            res.status(401).send(err);
            return;
        }
        //valid token;
        req.locals = decoded;
        next();
});
}
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
    jwt.verify(authorization, secretKey)
    .then(decoded => {
        req.locals = decoded; // attach our decoded token to the request...
        // if so, go on:
        next();
    })
    .catch(err => { // not valid token;
        res.status(401).send(err);
    })
    //is so, go on:
    next();
}
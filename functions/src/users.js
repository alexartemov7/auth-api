import { Jwt } from "jsonwebtoken";
import { db } from "./dbConnect.js";
import { secretKey } from "./creds.js";
const coll = db.collection('users');

export async function createUser(req, res) {
    const { email, password } = req.body;
    if(!email || !password || email.length < 6 || password.length < 6) {
        res.status(400).send({ message: "invalid email or password."});
        return;
    }
    await coll.add({ email: email.toLowerCase(), password }); // TODO hash the password
    login(req, res);
    // Send something back ??
}

export async function login(req, res) {
    const { email, password } = req.body;
    const userCol = await coll.where('email', '==', email.toLowerCase())
                              .where('password', '==', password)
                              .get()
    const user = userCol.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]
    if(!user) {
        res.status(400).send({ message: 'Not authorized; missing or bad email or password.'})
        return;
    }
    delete user.password; // remove pw from user object
    const token = jwt.sign(user, secretKey)
    res.send({token})
}

import { db } from "./dbConnect.js";

const coll = db.collection('recipes');

export async function createRecipe(req, res) { //PROTECT
    const newRecipe = req.body;
    // add user's id to the recipe
    newRecipe.userID = req.locals.id;
    await coll.add(newRecipe);
    // send updated list of recipes
    getAllRecipes(req, res);
}

export async function getAllRecipes(req, res) {
    const recipeColl = await coll.get()
    const recipes = recipeColl.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    res.send(recipes);
}
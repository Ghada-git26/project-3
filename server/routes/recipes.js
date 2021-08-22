const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const uploader = require("../config/cloudinary");
const auth = require("../middlewares/requireAuth");

//get all recipes

router.get("/", async function(req, res, next) {
    var mainDishes = await Recipe.find({ category: 'Main dish' });
    var desserts = await Recipe.find({ category: 'Dessert' });
    var beverages = await Recipe.find({ category: 'Beverage' });
    res.status(200).json({ mainDishes: mainDishes, desserts: desserts, beverages: beverages });
});

//Get oneRecipe
router.get("/:id", (req, res, next) => {
    Recipe.findById(req.params.id)
        .then((recipeDocument) => {
            if (!recipeDocument) {
                return res.status(404).json({ message: "No item was found" });
            } else {
                res.status(200).json(recipeDocument);
            }
        })
        .catch(next);
});

//upload image
router.post("/", auth.requireAdmin, uploader.single("image"), (req, res, next) => {
    if (req.file) {
        req.body.image = req.file.path;
    } else {
        req.body.image = undefined;
    }

    Recipe.create(req.body)
        .then((recipeDocument) => {
            res.status(201).json(recipeDocument);
        })
        .catch(next);
});

router.patch("/:id", auth.requireAdmin, uploader.single("image"), (req, res, next) => {

    if (req.file) {
        req.body.image = req.file.path;
    } else {
        req.body.image = undefined;
    }

    Recipe.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            return res.status(200).json({ message: "Recipe Updated" });
        })
        .catch((error) => {
            return res.status(500).json({ message: "Unexpected Error", error: error });
        });
});

//delete a recipe
router.delete("/:id", auth.requireAdmin, (req, res, next) => {
    Recipe.findById(req.params.id)
        .then((recipeDocument) => {
            if (!recipeDocument) {
                return res.status(404).json({ message: "Recipe not found" });
            }
            Recipe.findByIdAndDelete(req.params.id)
                .then(() => {
                    return res.sendStatus(204);
                })
                .catch(next);
        })
        .catch(next);
});


module.exports = router;
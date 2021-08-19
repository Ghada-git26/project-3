const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");


//get all recipes

router.get("/", async function (req, res, next) {
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



//Create recipe

router.post("/", (req, res, next) => {
    const updateValues = req.body;
    Recipe.create(updateValues)
        .then((recipeDocument) => {
            recipeDocument
                .then((recipe) => {
                    res.status(201).json(recipe);
                })
                .catch(next);
        })
        .catch(next);
});




router.post("/update/:id", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect("/recipe");
        })
        .catch((error) => {
            console.log(error);
        });
});

//update recipe

router.patch(
    "/:id",
    (req, res, next) => {
        const recipe = { ...req.body };

        Item.findById(req.params.id)
            .then((recipeDocument) => {
                if (!recipeDocument)
                    return res.status(404).json({ message: "Item not found" });

                Recipe.findByIdAndUpdate(req.params.id, item, { new: true })
                    .populate("creator")
                    .then((updatedDocument) => {
                        return res.status(200).json(updatedDocument);
                    })
                    .catch(next);
            })
            .catch(next);
    }
);
//delete a recipe
router.delete("/:id", (req, res, next) => {
    Recipe.findById(req.params.id)
        .then((recipeDocument) => {
            if (!recipeDocument) {
                return res.status(404).json({ message: "Item not found" });
            }
            Item.findByIdAndDelete(req.params.id)
                .then(() => {
                    return res.sendStatus(204);
                })
                .catch(next);
        })
        .catch(next);
});


module.exports = router;
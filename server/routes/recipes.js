const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const Rating = require("../models/Rating");
const User = require("../models/User");
const uploader = require("../config/cloudinary");
const auth = require("../middlewares/requireAuth");

//get all recipes

router.get("/", async function(req, res, next) {
    try {
        var mainDishes = (await Recipe.find({ category: 'Main dish' })).map(o => o.toObject());
        var desserts = (await Recipe.find({ category: 'Dessert' })).map(o => o.toObject());
        var beverages = (await Recipe.find({ category: 'Beverage' })).map(o => o.toObject());
        //Setting conditions for selecting favorite recipes
        if (req.session.currentUser) {
            //Use of populate de display ech user's favorite recipe
            var user = await User.findById(req.session.currentUser._id).populate('favoriteRecipes');
            if (user && user.favoriteRecipes) {
                await setFavorites(user, mainDishes);
                await setFavorites(user, desserts);
                await setFavorites(user, beverages);
            }
        }
        res.status(200).json({ mainDishes: mainDishes, desserts: desserts, beverages: beverages });
    } catch (error) {
        res.status(500).json(error);
    }

});

//function to check if a recipe is a favorite of a user
async function setFavorites(user, recipes) {
    //gettig the id's of a user's favorite recipe
    let recipeIds = user.favoriteRecipes.map(r => r._id);
    for (let i = 0; i < recipes.length; i++) {
        if (recipeIds.indexOf(recipes[i]._id) != -1) {
            recipes[i].isUserFavourite = true;
        }
    }
}



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

//make the recipe with the given id a user favourite
router.get('/setFavourite/:id', auth.requireAuth, async(req, res) => {
    var user = await User.findById(req.session.currentUser._id).populate('favoriteRecipes');
    var recipe = await Recipe.findById(req.params.id);
    if (user && recipe) {
        await User.updateOne({ _id: user._id }, { $push: { favoriteRecipes: recipe } });
    }
    res.status(200).json({ message: "Recipe is Favourite" });
});

//delete the recipe with the given id from user favourites
router.get('/unsetFavourite/:id', auth.requireAuth, async(req, res) => {
    var user = await User.findById(req.session.currentUser._id).populate('favoriteRecipes');
    var recipe = await Recipe.findById(req.params.id);
    if (user && recipe) {
        user.favoriteRecipes.pull(recipe._id);
        await user.save();
    }
    res.status(200).json({ message: "Recipe is no longer favourite" });
});

router.get("/getFavourite", auth.requireAuth, async function(req, res, next) {
    try {
        //Use of populate de display ech user's favorite recipe
        var user = (await User.findById(req.session.currentUser._id).populate('favoriteRecipes')).toObject();
        if (user && user.favoriteRecipes) {
            for (let i = 0; i < user.favoriteRecipes.length; i++) {
                user.favoriteRecipes[i].isUserFavourite = true;
            }
        }
        res.status(200).json(user.favoriteRecipes);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get oneRecipe
router.get("/:id", async(req, res, next) => {
    try {
        let recipe = await Recipe.findById(req.params.id)
            .populate({
                path: 'ratings',
                populate: {
                    path: 'user'
                }
            });
        recipe = recipe.toObject();
        if (req.session.currentUser) {
            var user = await User.findById(req.session.currentUser._id)
                .populate('favoriteRecipes');

            if (user && user.favoriteRecipes) {
                let recipeIds = user.favoriteRecipes.map(r => r._id);
                if (recipeIds.indexOf(recipe._id) != -1) {
                    recipe.isUserFavourite = true;
                }
            }

            //Rating
            recipe.canComment = true;
            let userRating = recipe.ratings
                .filter(f => f.user._id == req.session.currentUser._id);
            if (userRating.length > 0) {
                recipe.canComment = false;
            }
        }

        res.status(200).json(recipe);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});

router.post("/rating/:id", auth.requireAuth, async(req, res, next) => {
    let rating = req.body;
    rating.user = res.locals.currentUser;
    var createdRating = await Rating.create(rating);
    await Recipe.updateOne({ _id: req.params.id }, { $push: { ratings: createdRating } });
    res.status(201).json({ message: 'Rating Added' });
})

router.delete("/rating/:id", auth.requireAdmin, async(req, res, next) => {
    try {
        await Rating.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Rating Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error Occured' });
    }
});
module.exports = router;
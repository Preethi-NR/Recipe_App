// recipes.js

import firestore from "./firebase"; // Assuming you have initialized Firestore

const addRecipeRating = async (recipeId, ratingData) => {
  try {
    await firestore.collection("ratings").doc(recipeId).set(ratingData);
    console.log("Recipe rating added:", recipeId);
  } catch (error) {
    console.error("Error adding recipe rating:", error.message);
  }
};

const getRecipeRating = async (recipeId) => {
  try {
    const ratingSnapshot = await firestore.collection("ratings").doc(recipeId).get();
    if (ratingSnapshot.exists) {
      return ratingSnapshot.data();
    } else {
      console.error("Recipe rating not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting recipe rating:", error.message);
    return null;
  }
};

export { addRecipeRating, getRecipeRating };

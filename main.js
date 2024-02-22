const APIKEY = "";

// Async await and function with 4 parameters well actually 5 parameters
async function searchRecipes(
  foodName,
  diet,
  exclude,
  intolerance,
  apiResponses
) {
  amount = apiResponses;
  const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${foodName}&diet=${diet}&excludeIngredients=${exclude}&intolerances=${intolerance}&number=${amount}&offset=0&type=main%20course`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": APIKEY,
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const ids = data.results.map((recipe) => recipe.id); // Arrow function
    console.log(ids);
    return ids;
  } catch (error) {
    console.error(error);
  }
}

// Promises
function getRecipesInformationBulk(recipeID) {
  const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=${recipeID}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": APIKEY,
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Nested for loops
function buildapiramid(howHigh, character) {
  if (!character) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    character = characters[Math.floor(Math.random() * characters.length)];
  }

  for (let i = 1; i <= howHigh; i++) {
    let row = "";
    for (let j = 0; j < howHigh - i; j++) {
      row += " ";
    }
    for (let k = 0; k < 2 * i - 1; k++) {
      row += character;
    }
    console.log(row);
  }
}

// Nested if loops
function checkNumber(number) {
  if (number > 0) {
    if (number % 2 === 0) {
      console.log(number + " is a positive even number.");
    } else {
      console.log(number + " is a positive odd number.");
    }
  } else if (number < 0) {
    console.log(number + " is a negative number.");
  } else {
    console.log("The number is zero.");
  }
}

function getFood() {
  return new Promise((resolve, reject) => {
    const gotFood = Math.random() > 0.5; // Simulation of something running, eg. waiting for a server response

    if (gotFood) {
      resolve("Yay, I got food!");
    } else {
      reject("Oh no, I didn't get food!");
    }
  });
}

// Async
async function getRecipe(recipeName, howMany) {
  try {
    let recipesID = await searchRecipes(recipeName, "", "", "", howMany); // Test of await

    recipesID = Array.isArray(recipesID) ? recipesID : [recipesID];

    for (let i = 0; i < recipesID.length; i++) {
      const singleID = recipesID[i];
      let counter = i + 1;

      await getRecipesInformationBulk(singleID)
        .then((result) => {
          console.log("\n\nRecipe No:" + counter);
          console.log("\nRecipe result:\n" + result);
        })
        .catch((error) => {
          console.error("Error fetching recipe information");
          console.error(error);
        });
    }
  } catch (error) {
    console.error("Error searching recipes");
    console.error(error);
    return;
  }
}

// Arrow function
const getArrowRecipe = async (recipeName, howMany) => {
  try {
    let output = "";
    let recipesID = await searchRecipes(recipeName, "", "", "", howMany); // Test of await

    recipesID = Array.isArray(recipesID) ? recipesID : [recipesID];

    for (let i = 0; i < recipesID.length; i++) {
      const singleID = recipesID[i];
      let counter = i + 1;

      await getRecipesInformationBulk(singleID)
        .then((result) => {
          output = "\n\nRecipe No:" + counter + "\nRecipe result:\n" + result;
        })
        .catch((error) => {
          console.error("Error fetching recipe information");
          console.error(error);
        });
    }

    return output;
  } catch (error) {
    console.error("Error searching recipes");
    console.error(error);
    return;
  }
};

// Test
getRecipe("Burger", 1); //Async await, promises, arrow functions

getArrowRecipe("Burger", 1) // Arrow function output
  .then((output) => {
    console.log("Arrow function output:");
    console.log(output);
  })
  .catch((error) => {
    console.error("Error getting recipe:");
    console.error(error);
  });

getFood() // Output from the promise method
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });

buildapiramid(5, "*"); // Nested for loops
buildapiramid(3);

checkNumber(5); // Nested if statements
checkNumber(-2);
checkNumber(0);

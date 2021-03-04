// https://api.chucknorris.io/#!
//Får inte till moduler, så kör det jag fick att funka.

'use strict';

import postAndGetChuckImage from './imgflip.js';
import createInputObject from './createHTMLElements.js';
import isString from './typeChecks.js';


let getJokeButton = document.getElementById("getJokeButton");

let quoteDisplay = document.getElementById("quoteDisplay");
let categoriesContainer = document.getElementById("categoriesContainer");
let selectedCategoryDisplay = document.getElementById("selectedCategoryDisplay");


selectedCategoryDisplay.innerHTML = "<i>No category has been selected yet.</i>";
let selectedCategory = ""; //used is API-call to chuck-site.

const apiBase = 'https://api.chucknorris.io/';

let chuckImage = document.getElementById("chuckImage");



//Splits an input string into 2 parts.
//(used for meme top and bottom).
function splitStringInto2Parts(str) {
  if(isString(str)) {
    var wholeArr = str.split(' ');
    var part1 = wholeArr.slice(0, wholeArr.length/2);
    var part2 = wholeArr.slice(wholeArr.length/2, wholeArr.length);

    var str1 = part1.join(' ');
    var str2 = part2.join(' ');

    return [str1, str2];
  } else
    throw Error("input wasn't a string");
}


//
let setSelectedCategoryDisplay = function(category) {
  //input must be string, otherwise post error and reset selectedCategory-data.
  if(!isString(category))
  {
    console.error(`${arguments.callee.name}() --> Input parameter 'category' was not of type 'string'.`);
    selectedCategoryDisplay.innerHTML = "";
    selectedCategory = "";
    return;
  }
  selectedCategoryDisplay.innerHTML = "Selected category: "+category;
  selectedCategory = category;
}

let chuck = (function() {

  const xhttp= new XMLHttpRequest();
  
  return {
    infoVisible: false,

    createChuckMeme: async function() {
      
      let appendCategory = "";

      //if a category is selected, then append it.
      if(isString(selectedCategory))
        appendCategory = `?category=${selectedCategory}`

      xhttp.open("GET", 
              apiBase+`jokes/random`+appendCategory, 
              true);

      xhttp.onload = async function () {

        if (xhttp.readyState==4 && xhttp.status==200) {
          let response = JSON.parse(xhttp.response);
  
          //if everything is ok, continue to display.
          if(response && isString(response.value)) {
            let joke = response.value;

            //split the joke into 2 parts and get an image.
            let splittedJoke = splitStringInto2Parts(joke);
            //try set and get image. If problem arises, skip the image and publish the joke only.
            try {
              let chuckImageURL = await postAndGetChuckImage(splittedJoke[0], splittedJoke[1]);
              chuckImage.src = chuckImageURL;

            } catch {
              chuckImage.src="";
              quoteDisplay.textContent = joke;
            }
          }
          else
            quoteDisplay.textContent = 'Something went wrong when getting a joke about Chuck norris.';
        } 
        else 
          quoteDisplay.textContent = 'Something went wrong fetching the Chuck Norris-FACT.';
      };

      xhttp.send();

    },

    getCategories: function() {

      xhttp.open("GET", 
                apiBase+`jokes/categories`, 
                true);
      
      xhttp.onload = function () {
        if (xhttp.readyState==4 && xhttp.status==200) {
          let response = JSON.parse(xhttp.response);
  
          if(response && typeof response === 'object')
          {
            //Show category-related stuff only if successful load.
            categoriesContainer.style.display="grid";
            categoriesContainer.style.gridTemplateColumns="auto auto auto";

            let count = 0;
            (response).forEach(category => {
              //build the radiobutton-menu and insert them.
              let radioButton = createInputObject('radio', category, );
              
              radioButton.input.addEventListener('change', function(event) {
                setSelectedCategoryDisplay(radioButton.label.innerHTML);
              });

              let gridItem = document.createElement("div");
              gridItem.class="grid-item";
              
              gridItem.appendChild(radioButton.input);
              gridItem.appendChild(radioButton.label);
              categoriesContainer.appendChild(gridItem);

              // categoriesContainer.appendChild(radioButton.input);
              // categoriesContainer.appendChild(radioButton.label);

              // count++;
              // if(count%3 == 0) {
              //   console.log("nu");
              //   categoriesContainer.appendChild(
              //     document.createElement("br")
              //   );
              // }

            });
          }
            
          else
            categoriesContainer.textContent = 'Something went wrong when getting the categories about Chuck norris.';
        } 
      };

      xhttp.send();
    }
  }
})();

chuck.getCategories();

getJokeButton.onclick = chuck.createChuckMeme;



let setChuckImage = async () => {
  let chuckImageURL = await postChuckImage("hej", "hopp");
  chuckImage.src = chuckImageURL;
}
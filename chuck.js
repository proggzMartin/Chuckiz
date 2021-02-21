// https://api.chucknorris.io/#!
//Får inte till moduler, så kör det jag fick att funka.


'use strict';



let getJokeButton = document.getElementById("getJokeButton");

let quoteDisplay = document.getElementById("quoteDisplay");
let categoriesDisplay = document.getElementById("categoriesDisplay");
let selectedCategoryDisplay = document.getElementById("selectedCategoryDisplay");

selectedCategoryDisplay.innerHTML = "<i>No category has been selected yet.</i>";
let selectedCategory = ""; //used is API-call to chuck-site.

const apiBase = 'https://api.chucknorris.io/';


let setSelectedCategoryDisplay = function(category) {
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
//... Because objects are passed as copy of reference: 
//https://stackoverflow.com/questions/13104494/does-javascript-pass-by-reference

let chuck = (function() {

  const xhttp = new XMLHttpRequest();
  
  return {
    infoVisible: false,

    getJoke: function() {
      
      let appendCategory = "";

      //if a category is selected, then append it.
      if(selectedCategory && typeof selectedCategory === 'string')
        appendCategory = `?category=${selectedCategory}`

      xhttp.open("GET", 
              apiBase+`jokes/random`+appendCategory, 
              true);

      xhttp.onreadystatechange = function () {

        if (xhttp.readyState==4 && xhttp.status==200) {
          let response = JSON.parse(xhttp.response);
  
          if(response && response.value && typeof response.value === 'string')
            quoteDisplay.textContent = response.value;
          else
            quoteDisplay.textContent = 'Something went wrong when getting quote about Chuck norris.';
        } else 
            quoteDisplay.textContent = 'Something went wrong fetching the Chuck Norris-FACT.';
        
      };

      xhttp.send();

    },
    getCategories: function() {

      xhttp.open("GET", 
                apiBase+`jokes/categories`, 
                true);
      
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState==4 && xhttp.status==200) {
          let response = JSON.parse(xhttp.response);
  
          if(response && typeof response === 'object')
          {
            (response).forEach(category => {
              //build the radiobutton-menu and insert them.
              let inputObject = createInputObject('radio', category, );
              
              inputObject.input.addEventListener('change', function(event) {
                setSelectedCategoryDisplay(inputObject.label.innerHTML);
              });
              
              categoriesDisplay.appendChild(inputObject.input);
              categoriesDisplay.appendChild(inputObject.label);

            });
          }
            
          else
            categoriesDisplay.textContent = 'Something went wrong when getting the categories about Chuck norris.';
        } 
      };

      xhttp.send();
    }
  }
})();

chuck.getCategories();

getJokeButton.onclick = chuck.getJoke;

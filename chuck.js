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

//======================================================
//======================================================
//TESTCODE
let chuckImage = document.getElementById("chuckImage");

const apiBase2 = 'https://api.imgflip.com/get_memes';

async function getImage() {
  console.log("inuti bajs");

  const resp = await fetch(apiBase2, 
    {
      method: "GET"
    }).then(r => {
      console.log(r);
      r.json().then(p => {
        console.log(p);
        const memes = p.data.memes

        if(memes[0].url)
        {
          console.log(memes[0].url)
          chuckImage.src=memes[1].url;
        }

      });
      // chuckImage.src = r.
    });
}

getImage();


// const xhttp3 = new XMLHttpRequest();
// const apiBase3 = 'https://api.imgflip.com/caption_image';

// xhttp3.open("POST", 
//             apiBase2, 
//             true,
//             );

// xhttp3.onreadystatechange = function () {
//   let response = JSON.parse(xhttp3.response);
//   console.log(response);
// };

// xhttp3.send();
//======================================================
//======================================================


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

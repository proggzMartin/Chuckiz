// https://api.chucknorris.io/#!
//Får inte till moduler, så kör det jag fick att funka.


'use strict';


let getQuoteButton = document.getElementById("getQuoteButton");
let quoteDisplay = document.getElementById("quoteDisplay");

let chuck = (function() {
  //Vill bara ha det uppskrivet, samlat nånstans.

  return {

    
    infoVisible: false,
    getQuote: function() {

      var xhttp = new XMLHttpRequest();

      xhttp.open("GET", 
                  `https://api.chucknorris.io/jokes/random`, 
                  true);
      xhttp.send();

      xhttp.onreadystatechange = function () {

        if (xhttp.readyState==4 && xhttp.status==200) {
          let response = JSON.parse(xhttp.response);
          console.log(response);
  
          if(response && response.value && typeof response.value === 'string')
            quoteDisplay.textContent = response.value;
          else
            quoteDisplay.textContent = "Something went wrong when getting quote about Chuck norris.";
        }
        
      };
    } 
  }
})();


getQuoteButton.onclick = chuck.getQuote;

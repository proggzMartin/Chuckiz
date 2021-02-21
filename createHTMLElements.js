
//V0.0.1 2021-02-21
//Supported elements:
// * Input with types button, checkbox, radio


const availableInputTypes = ['button', 'checkbox', 'radio'];

//If type = 'button', a result-object containing a single input-object is returned which can be inserted into the DOM.
//If type = 'checkbox' or 'radio', result-object contains an input-object and a löabel-object. The label has the 'value'-parameter as text.
let createInputObject = function(type, value) {

  if( !(typeof type === 'string')) {
    console.error(`${arguments.callee.name}() --> Input parameter 'type' was not of type 'string'.`);
    return;
  }
  if( !(typeof value === 'string')) {
    console.error(`${arguments.callee.name}() --> Input parameter 'value' was not of type 'string'.`);
    return;
  }

  if(!availableInputTypes.includes(type)) {
    console.error(`${arguments.callee.name}() --> The input type "${type}" isn't supported.`);
    return;
  }

  let input = document.createElement("input");
  input.type = type;

  let result = {"input" : input };

  if(type === 'button') {
    input.value = value;
  }

  else {

    input.name = type;

    let label = document.createElement("label");
    label.innerHTML = value;

    result.label = label;
  }

  return result;
}
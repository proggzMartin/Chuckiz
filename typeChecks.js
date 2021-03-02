//V0.0.1 2021-02-21

function isString(val) {
  if(val && typeof val === 'string') 
    return true;
  return false;
}


export {isString as default}; //default needs to be removed later.
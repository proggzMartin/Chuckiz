const ImgFlipAPIBase = 'https://api.imgflip.com/';
const URL_ImgFlipGetMemes = ImgFlipAPIBase+"get_memes";
const URL_ImgFlipPost = ImgFlipAPIBase+"caption_image";

const API_userName="proggarmartin";
const API_password="ijTtfrH6FeUIsdf6879GIGYASDasdf1";

//Id's for found chuckmemes at imgFlip api.
let chuckTemplateIDs = [
  "5790452",
  "241304",
  "38579871"
]; 

//Of the found chucknorris-templates, selects at random one of the pictures.
function selectRandomChuckMeme() {
    let x = Math.floor(
      Math.random() * Object.keys(chuckTemplateIDs).length
    );
    return chuckTemplateIDs[x];
}

//Posts to imgFlip-api to create a chucknorris-meme.
//Returns the URL to the created meme.
async function postAndGetChuckImage(topText, bottomText) {
  if(!topText || !bottomText)
    return null;

  const url = await fetch(URL_ImgFlipPost+`?template_id=${selectRandomChuckMeme()}&text0=${topText}&text1=${bottomText}`+
                     `&username=${API_userName}&password=${API_password}`,
  {
    method: "POST"
  })
  .then(r => {
    if(!r.ok) {
      throw new Error(`HTTP Error status ${r.status}`);
    }
    return r.json()
  }).then(p => {
      
    if(p && p.data && p.data.url) {
      return p.data.url;
    }
  });

  return url;
}


//gets an array of empty memes without text on.
//'deprecated', isn't used in the project but saved just in case.
async function getImages() {
  const url = await fetch(URL_ImgFlipGetMemes, 
  {
    method: "GET"
  })
  .then(r => {
    r.json().then(p => {
      const memes = p.data.memes

      if(memes)
        return memes;
    });
  });
}


export {getImages as getImgFlipImages, postAndGetChuckImage as default};
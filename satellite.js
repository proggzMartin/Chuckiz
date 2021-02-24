'use strict';


/*
Todo: Fixa Kommentarer & rensa i koden
*/

window.onload = (event) => {
    mapHandler();
    setInterval(mapHandler, 5000);
}

//Kalla på funktionen getCords och skicka de vidare till updateMap
function mapHandler(){
    let cords = getCord().then(res => {
        let lat = res["lat"]
        let lon = res["lon"]
        updateMap(lon, lat);
    });
}


//Hämta koordinater
async function getCord() {
    let lat = null;
    let lon = null;
    let response = await fetch("https://api.wheretheiss.at/v1/satellites/25544").catch(error => console.error(error));
    let json = await response.json();

    if(json["status"] != 404){
        lat = json["latitude"]
        lon = json["longitude"]
    }

    return {"lat":lat, "lon":lon}
}

//Skapar kartan & en lista med lager (layers)
const map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
            name: "map"
            })
    ],
    target: "map",
    view: new ol.View({center: ol.proj.fromLonLat([0,0]), zoom: 1.5})
});

function updateMap(lon, lat){   

    //Ta bort gammla ikonen
    let lrs = map.getLayers().forEach(layer => {
        if(layer.get("name") == "icon"){
            map.removeLayer(layer)
        }
    })
    
    //Skapa tomt objekt vid koordinaterna lon, lat
    let issFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]), ),
        name: "ISS"
    });

    //Lägger till bilden, anchor 0.5 0.5 gör att bilden blir centrerad
    issFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            src: "img/sat.png",
            scale: 0.1
        })
    }))

    //Skapar en låda med våra features skapade ovan
    let iconLayerSource = new ol.source.Vector({
        features: [issFeature]
    })

    //Skapar ett nytt layer att lägga till i map
    let iconLayer = new ol.layer.Vector({
        source: iconLayerSource,
        name: "icon"
    })

    //Fäster ikonen på kartan 
    map.addLayer(iconLayer)
}
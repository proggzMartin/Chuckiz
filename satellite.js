'use strict';

window.onload = (event) => {
    function mapHandler(){
        let cords = getCord().then(res => {
            let lat = res["lat"]
            let lon = res["lon"]
            updateMap(lon, lat);
            
        });
    }

    setInterval(mapHandler(), 3000);
}

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

const map = new ol.Map({
    layers: [
        new ol.layer.Tile({
        source: new ol.source.OSM(),
        name: "source"
        })
    ],
    target: "map",
    view: new ol.View({center: ol.proj.fromLonLat([0,0]), zoom: 1.5})
});

function updateMap(lon, lat){
    let layers = map.getLayers().getArray()
    console.log(layers)
    
    let issFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]), ),
        name: "ISS"
    });

    issFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: "img/sat.png",
            scale: 0.1
        })
    }))

    let iconLayerSource = new ol.source.Vector({
        features: [issFeature]
    })

    let iconLayer = new ol.layer.Vector({
        source: iconLayerSource
    })
    map.addLayer(iconLayer)
    
}
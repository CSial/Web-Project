import React, {useState, useEffect} from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Line,
  Marker,
  useZoomPan
} from "react-simple-maps";


import arrayli from '../scripts/flowMapArray'


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


function AdminMap(props){
  const position = [39.0742, 21.8243];
  let markers = [];
  const addressPoints = arrayli(props.lineMapData)
  markers = JSON.stringify(addressPoints);

  const mapDataLines =() => {
    const array = props.lineMapData
    return array.map((entry) => {
      let srcCoords = [entry.userLongitude, entry.userLatitude]
      let destCoords = [entry.serverLongitude, entry.serverLatitude]
      return  <Line
        from={srcCoords}
        to={destCoords}
        stroke="#FF5533"
        strokeWidth={entry.count / 100}
        strokeLineCap="straight"
      />
    })
  }
  const mapDataMarkers =() => {
    const array = props.lineMapData
    return array.map((entry) => {
      let srcCoords = [entry.userLongitude, entry.userLatitude]
      let destCoords = [entry.serverLongitude, entry.serverLatitude]
      return <Marker coordinates={destCoords}>
        <g
          fill="none"
          stroke="#FF5533"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(-12, -24)"
        >
          <circle cx="12" cy="10" r="1" />
          <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
        </g>
        </Marker>
    })
  }
    
  return(
    <div style={{position: 'fixed', left: 10, top: -20, bottom: 10, right:10, height: `80%`, width: `100%`, zIndex:-1, zoom: 2}}>
    
      <ComposableMap
        projectionConfig={{
          scale:250,
          center: [38.246639, 21.734573]
        }}>
        <ZoomableGroup zoom={1}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {mapDataMarkers()}
        {mapDataLines()}
      </ZoomableGroup>
    </ComposableMap>
   
  </div>
        
  )
}

export default AdminMap;
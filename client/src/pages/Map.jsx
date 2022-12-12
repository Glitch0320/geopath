import {
  MapContainer,
  TileLayer
} from 'react-leaflet'
import Path from '../components/Path'
import Stats from './Stats'
import MapProvider from '../utils/MapContext'

import './assets/index.css'

function Map() {

  return (
    <MapProvider>
      <MapContainer center={[0, 0]} zoom={18} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Stats />
        <Path />
      </MapContainer>
    </MapProvider>
  );
}

export default Map

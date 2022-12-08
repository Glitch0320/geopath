import {
  MapContainer,
  TileLayer
} from 'react-leaflet'
import Path from '../components/Path'
import Stats from '../components/Stats'
import MapProvider from '../utils/MapContext'

import './assets/index.css'

function Map() {

  return (
    <MapProvider>
      <MapContainer center={[0, 0]} zoom={18}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Stats />
        <Path />
      </MapContainer>
    </MapProvider>
  );
}

export default Map

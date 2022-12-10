import { 
    // useEffect, 
    useState } from "react"
import {
    useMapEvents,
    GeoJSON,
    Circle,
    Marker,
    Popup
} from "react-leaflet"
import { useMapContext } from "../utils/MapContext"
// import { testEvents } from '../utils/testEvents'

export const Path = () => {

    const [notStarted, setNotStarted] = useState(true)
    const [circle, setCircle] = useState({
        latlng: null,
        radius: null
    })
    const [coordinates, setCoordinates] = useState([])

    const { mapState, setMapState } = useMapContext()
    const { distance, time } = mapState

    const map = useMapEvents({
        locationfound(e) {
            console.log(e)
            // remove start button
            if (notStarted) {
                setNotStarted(false)
                map.setView(e.latlng, map.getZoom())
            }
            // Cap accuracy at 15
            if (e.accuracy > 15) {
                setCircle({
                    latlng: e.latlng,
                    radius: e.accuracy
                })
                return
            }
            setCircle({
                latlng: null,
                radius: null
            })
            // First time found, add point
            if (coordinates.length === 0) {
                map.setView(e.latlng, map.getZoom())
                setMapState({
                    ...mapState,
                    latlng: e.latlng,
                    accuracy: e.accuracy,
                    altitude: e.altitude,
                    altitudeAccuracy: e.altitudeAccuracy,
                    speed: e.speed,
                    heading: e.heading,
                    timestamp: e.timestamp,
                    timerOn: true
                })
                setCoordinates([[e.longitude, e.latitude]])
                return
            } else {
                // Ensure new points over 15
                if (e.latlng.distanceTo(mapState.latlng)) {
                    map.setView(e.latlng, map.getZoom())
                    const d = distance + e.latlng.distanceTo(mapState.latlng)
                    setMapState({
                        ...mapState,
                        latlng: e.latlng,
                        accuracy: e.accuracy,
                        altitude: e.altitude,
                        altitudeAccuracy: e.altitudeAccuracy,
                        speed: e.speed,
                        heading: e.heading,
                        timestamp: e.timestamp,
                        distance: d
                    })
                    setCoordinates([...coordinates, [e.longitude, e.latitude]])
                    return
                }
            }
        },
        locationerror(e) {
            console.log(e.message)
            alert(e.message)
        }
    })

    return (
        <>
        {/* Start button */}
            {notStarted && <div
                style={{
                    backgroundColor: 'black',
                    color: '#2cff0f',
                    padding: '1rem',
                    position: 'fixed',
                    zIndex: 1000,
                    bottom: 0
                }}>
                <button onClick={e => map.locate({ watch: true, enableHighAccuracy: true })}>Start</button>
            </div>}
            {/* Focusing */}
            {circle.radius && <Circle center={circle.latlng} radius={circle.radius}
                color='#27E60E' fillColor="#0B4004" fillOpacity={0.32}>
                <Popup>Focusing...</Popup>
            </Circle>}
            {mapState.latlng &&
                <>
                    <Marker position={mapState.latlng}>
                        <Popup>
                            <div style={{
                                overflow: 'scroll',
                                width: '80%',
                                height: 'auto'
                            }}>
                                {mapState.accuracy}<br />
                                {mapState.altitude}<br />
                                {mapState.altitudeAccuracy}<br />
                                {mapState.speed}<br />
                                {mapState.heading}<br />
                                {mapState.timestamp}<br />
                                {coordinates.length}
                            </div>
                        </Popup>
                    </Marker>
                    {coordinates.length >= 2 && <GeoJSON
                        style={mapState.geoStyle}
                        data={{
                            "type": "Feature",
                            "properties": {
                                "distance": distance,
                                "time": time
                            },
                            "geometry": {
                                "coordinates": coordinates,
                                "type": "LineString"
                            }
                        }} />}
                </>
            }
        </>
    )
}

export default Path
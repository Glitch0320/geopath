import {
    // useEffect, 
    useState
} from "react"
import {
    useMapEvents,
    GeoJSON,
    Marker,
    Circle,
    Popup
} from "react-leaflet"
// import { icon } from 'leaflet'
import { useMapContext } from "../utils/MapContext"
// import { testEvents } from '../utils/testEvents'

const Path = () => {

    const { stats, setStats } = useMapContext()

    const [path, setPath] = useState({
        // Marker and circle
        latlng: null,
        accuracy: null,
        coordinates: []
    })
    const { coordinates } = path

    const map = useMapEvents({
        locationfound(e) {
            // If accuracy > 12, show on map as circle
            console.log(e.accuracy)
            if (e.accuracy > 12) {
                // show circle
                setPath({
                    ...path,
                    latlng: e.latlng,
                    accuracy: e.accuracy
                })
                return
            } else {
                // First point ?
                if (!coordinates.length) {
                    // add point and start timer
                    setPath({
                        ...path,
                        latlng: e.latlng,
                        accuracy: e.accuracy,
                        coordinates: [[e.longitude, e.latitude]]
                    })
                    setStats({
                        ...stats,
                        speed: e.speed,
                        heading: e.heading,
                        altitude: e.altitude,
                        altitudeAccuracy: e.altitudeAccuracy,
                        timerOn: true
                    })
                } else {
                    // If > 12 m from last point
                    if (e.latlng.distanceTo(path.latlng) > 12) {
                        setPath({
                            ...path,
                            latlng: e.latlng,
                            accuracy: e.accuracy,
                            coordinates: [...coordinates, [e.longitude, e.latitude]]
                        })
                        setStats({
                            ...stats,
                            speed: e.speed,
                            heading: e.heading,
                            altitude: e.altitude,
                            altitudeAccuracy: e.altitudeAccuracy
                        })
                    }
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
            <button
                style={{
                    position: 'fixed',
                    zIndex: 1000,
                    bottom: '2rem',
                    right: '2rem'
                }}
                onClick={e => map.locate({ setView: true, watch: true })}
            >Start</button>
            {/* Location Innacurate ? Show circle */}
            {path.latlng && path.accuracy > 12 &&
                <Circle
                    center={path.latlng}
                    radius={path.accuracy}>
                    <Popup>Accuracy: {path.accuracy}</Popup>
                </Circle>}
            {/* Accurate Location ? Show marker */}
            {path.latlng && path.accuracy < 12 &&
                <Marker
                    position={path.latlng}>
                    <Popup>
                        Altitude: {Math.round(stats.altitude)}<br />
                        + or - {Math.round(stats.altitudeAccuracy)} meters.
                    </Popup>
                </Marker>}
            {/* At least two points added ? Draw line */}
            <GeoJSON
                data={{
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "coordinates": path.coordinates,
                                "type": "LineString"
                            }
                        }
                    ]
                }}
                style={() => ({
                    color: '#2cff0f',
                    weight: 3.2
                })}
            />
        </>
    )
}

export default Path
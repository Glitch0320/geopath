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
        data: {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "coordinates": [],
                "type": "LineString"
            }
        },
        key: null
    })

    const map = useMapEvents({
        locationfound(e) {
            // Cap accuracy at 15 m
            if (e.accuracy > 15) {
                map.setView(e.latlng, map.getZoom())
                // show circle
                setPath({
                    ...path,
                    latlng: e.latlng,
                    accuracy: e.accuracy
                })
                return
            } else {
                // First point ?
                if (!path.data.geometry.coordinates.length) {
                    map.setView(e.latlng, map.getZoom())
                    // add point and start timer
                    setPath({
                        ...path,
                        latlng: e.latlng,
                        accuracy: e.accuracy,
                        data: {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "coordinates": [[e.longitude, e.latitude]],
                                "type": "LineString"
                            }
                        },
                        key: e.timestamp
                    })
                    // Update stats
                    const speed = e.speed ? e.speed : 0
                    setStats({
                        ...stats,
                        speed: speed,
                        heading: e.heading,
                        altitude: e.altitude,
                        altitudeAccuracy: e.altitudeAccuracy,
                        timerOn: true
                    })
                } else {
                    // If > accuracy from last point
                    if (
                        e.latlng.distanceTo({
                            lat: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 1][1],
                            lng: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 1][0]
                        }) > 13
                        // true
                    ) {
                        map.setView(e.latlng, map.getZoom())
                        setPath({
                            ...path,
                            latlng: e.latlng,
                            accuracy: e.accuracy,
                            data: {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [...path.data.geometry.coordinates, [e.longitude, e.latitude]],
                                    "type": "LineString"
                                }
                            },
                            key: e.timestamp
                        })
                        const speed = e.speed ? e.speed : 0
                        setStats({
                            ...stats,
                            speed: speed,
                            heading: e.heading,
                            altitude: e.altitude,
                            altitudeAccuracy: e.altitudeAccuracy,
                            distance: stats.distance + e.latlng.distanceTo({
                                lat: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 2][1],
                                lng: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 2][0]
                            })
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
            {/* Remove start button when found */}
            {!path.latlng &&
                <button
                    style={{
                        position: 'fixed',
                        zIndex: 500,
                        bottom: '2rem',
                        right: '2rem'
                    }}
                    onClick={e => map.locate({ watch: true, enableHighAccuracy: true })}
                >Start</button>}

            {/* Location Innacurate ? Show circle */}
            {path.latlng && path.accuracy > 15 &&
                <Circle
                    center={path.latlng}
                    radius={path.accuracy}>
                    <Popup>Focusing...</Popup>
                </Circle>}

            {/* Accurate Location ? Show marker */}
            {path.latlng && path.accuracy < 15 &&
                <Marker
                    position={path.latlng}>
                    <Popup>
                        {stats.speed} m/s <br />
                        {stats.distance} m <br />
                        {stats.heading} degrees <br />
                        {stats.altitude} m <br />
                        Within {stats.altitudeAccuracy} m
                    </Popup>
                </Marker>}

            {/* At least two points added ? Draw line */}
            {path.data.geometry.coordinates.length > 1 &&
                <GeoJSON
                    key={path.key}
                    data={path.data}
                    style={() => ({
                        color: '#2cff0f',
                        weight: 3.2
                    })}
                />}
        </>
    )
}

export default Path
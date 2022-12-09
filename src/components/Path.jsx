import { useState } from "react"
import {
    useMapEvents,
    GeoJSON,
    Circle,
    Marker
} from "react-leaflet"
import { useMapContext } from "../utils/MapContext"

export const Path = () => {

    const [notStarted, setNotStarted] = useState(true)
    const [circle, setCircle] = useState({
        latlng: null,
        radius: null
    })

    const { mapState, setMapState } = useMapContext()

    const { path, theme } = mapState
    const { current, coordinates, distance, time } = path

    const map = useMapEvents({
        locationfound(e) {
            setNotStarted(false)
            if (e.accuracy > 15 && coordinates.length === 0) {
                map.setView(e.latlng, map.getZoom())
                setCircle({ latlng: e.latlng, radius: e.accuracy })
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
                    path: {
                        ...path,
                        coordinates: [[e.longitude, e.latitude]],
                        current: {
                            latlng: e.latlng,
                            accuracy: e.accuracy,
                            altitude: e.altitude,
                            altitudeAccuracy: e.altitudeAccuracy,
                            speed: e.speed,
                            heading: e.heading,
                            timestamp: e.timestamp
                        },
                        timerOn: true
                    }
                })
            } else {
                if (e.latlng.distanceTo(current.latlng) > 10) {
                    if (coordinates.length === 1) {
                        map.setView(e.latlng, map.getZoom())
                        setMapState({
                            ...mapState,
                            path: {
                                ...path,
                                coordinates: [...coordinates, [e.longitude, e.latitude]],
                                current: {
                                    latlng: e.latlng,
                                    accuracy: e.accuracy,
                                    altitude: e.altitude,
                                    altitudeAccuracy: e.altitudeAccuracy,
                                    speed: e.speed,
                                    heading: e.heading,
                                    timestamp: e.timestamp
                                },
                                distance: current.latlng.distanceTo(e.latlng)
                            }
                        })
                    } else {
                        map.setView(e.latlng, map.getZoom())
                        setMapState({
                            ...mapState,
                            path: {
                                ...path,
                                coordinates: [...coordinates, [e.longitude, e.latitude]],
                                current: {
                                    latlng: e.latlng,
                                    accuracy: e.accuracy,
                                    altitude: e.altitude,
                                    altitudeAccuracy: e.altitudeAccuracy,
                                    speed: e.speed,
                                    heading: e.heading,
                                    timestamp: e.timestamp
                                },
                                distance: distance + current.latlng.distanceTo(e.latlng)
                            }
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
            {circle.radius && <Circle center={circle.latlng} radius={circle.radius}
            color='#27E60E' fillColor="#0B4004" fillOpacity={0.32}
            />}
            {current.timestamp &&
                <>
                    <Marker position={current.latlng} />
                    <GeoJSON
                        style={theme.geoStyle}
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
                        }} />
                </>
            }
        </>
    )
}

export default Path
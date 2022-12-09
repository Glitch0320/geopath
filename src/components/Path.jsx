import { useState } from "react"
import {
    useMapEvents,
    GeoJSON,
    Marker,
    Circle,
    Popup
} from "react-leaflet"
import { useMapContext } from "../utils/MapContext"

export const Path = () => {

    const [notStarted, setNotStarted] = useState(true)

    const { mapState, setMapState } = useMapContext()

    const { path, theme } = mapState
    const { current, features, distance } = path

    const map = useMapEvents({
        locationfound(e) {
            setNotStarted(false)
            map.setView(e.latlng, map.getZoom())
            // First point found ? add
            if (features.length === 0) {
                setMapState({
                    ...mapState,
                    path: {
                        ...path,
                        current: {
                            latlng: e.latlng,
                            accuracy: e.accuracy,
                            altitude: e.altitude,
                            altitudeAccuracy: e.altitudeAccuracy,
                            heading: e.heading,
                            speed: e.speed,
                            timestamp: e.timestamp
                        },
                        features: [{
                            "type": "Feature",
                            "properties": {
                                "timestamp": e.timestamp
                            },
                            "geometry": {
                                "coordinates": [e.longitude, e.latitude],
                                "type": "Point"
                            }
                        }]
                    }
                })
            } else {
                // Acc <= 15 ? start timer,
                // new point > 12 m from last? add
                if (current.accuracy > 15) {
                    if (e.accuracy < current.accuracy) {
                        setMapState({
                            ...mapState,
                            path: {
                                ...path,
                                current: {
                                    latlng: e.latlng,
                                    accuracy: e.accuracy,
                                    altitude: e.altitude,
                                    altitudeAccuracy: e.altitudeAccuracy,
                                    heading: e.heading,
                                    speed: e.speed,
                                    timestamp: e.timestamp
                                },
                                features: [{
                                    "type": "Feature",
                                    "properties": {
                                        "timestamp": e.timestamp
                                    },
                                    "geometry": {
                                        "coordinates": [e.longitude, e.latitude],
                                        "type": "Point"
                                    }
                                }]
                            }
                        })
                    }
                } else {
                    setMapState({
                        ...mapState,
                        timerOn: true
                    })
                    if (e.latlng.distanceTo(current.latlng) > 12) {
                        if (features.length === 1) {
                            setMapState({
                                ...mapState,
                                path: {
                                    ...path,
                                    features: [...features, {
                                        "type": "Feature",
                                        "properties": {},
                                        "geometry": {
                                            "coordinates": [[current.latlng.lng, current.latlng.lat], [e.longitude, e.latitude]],
                                            "type": "LineString"
                                        }
                                    }],
                                    distance: e.latlng.distanceTo(current.latlng),
                                    current: {
                                        latlng: e.latlng,
                                        accuracy: e.accuracy,
                                        altitude: e.altitude,
                                        altitudeAccuracy: e.altitudeAccuracy,
                                        heading: e.heading,
                                        speed: e.speed,
                                        timestamp: e.timestamp
                                    },
                                }
                            })
                        } else {
                            setMapState({
                                ...mapState,
                                path: {
                                    ...path,
                                    features: [...features, {
                                        "type": "Feature",
                                        "properties": {},
                                        "geometry": {
                                            "coordinates": [...current, [e.longitude, e.latitude]],
                                            "type": "LineString"
                                        }
                                    }],
                                    distance: distance + e.latlng.distanceTo(current.latlng),
                                    current: {
                                        latlng: e.latlng,
                                        accuracy: e.accuracy,
                                        altitude: e.altitude,
                                        altitudeAccuracy: e.altitudeAccuracy,
                                        heading: e.heading,
                                        speed: e.speed,
                                        timestamp: e.timestamp
                                    },
                                }
                            })
                        }
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
            {current.timestamp &&
                <>
                    <Circle center={current.latlng} radius={current.accuracy}>
                        <Popup>
                            {current.accuracy}
                        </Popup>
                    </Circle>
                    <GeoJSON
                        style={theme}
                        data={{
                            "type": "FeatureCollection",
                            "features": features
                        }} />
                </>
            }
        </>
    )
}

export default Path
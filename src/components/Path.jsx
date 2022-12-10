import { useState } from "react"
import {
    useMapEvents,
    GeoJSON,
    Circle,
    Marker,
    Popup
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
            console.log(e)
            if (notStarted) setNotStarted(false)
            // Cap accuracy at 15
            if (e.accuracy > 15) {
                map.setView(e.latlng, map.getZoom())
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
            if (!coordinates.length) {
                map.setView(e.latlng, map.getZoom())
                setMapState({
                    ...mapState,
                    path: {
                        ...path,
                        current: {
                            latlng: e.latlng,
                            speed: e.speed
                        },
                        coordinates: [[e.longitude, e.latitude]],
                        timerOn: true
                    }
                })
            } else {
                // Ensure new points over 15
                if (e.latlng.distanceTo(current.latlng) > 15) {
                    const c = coordinates.map(c => c)
                    c.push([e.longitude, e.latitude])
                    const d = distance + e.latlng.distanceTo(current.latlng)
                    setMapState({
                        ...mapState,
                        path: {
                            ...path,
                            current: {
                                latlng: e.latlng,
                                speed: e.speed
                            },
                            coordinates: c,
                            timerOn: true,
                            distance: d
                        }
                    })
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
                color='#27E60E' fillColor="#0B4004" fillOpacity={0.32}>
                <Popup>Focusing...</Popup>
            </Circle>}
            {current.latlng.lng &&
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
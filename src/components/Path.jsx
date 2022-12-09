import {
    useMapEvents,
    GeoJSON,
    Marker,
    Circle
} from "react-leaflet"
import { useMapContext } from "../utils/MapContext"

export const Path = () => {

    const { mapState, setMapState } = useMapContext()

    const { path, theme } = mapState
    const { current, features } = path

    const map = useMapEvents({
        locationfound(e) {
            // console.log(e)
            map.setView(e.latlng, map.getZoom())
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
                    }
                }
            })
        },
        locationerror(e) {
            alert(e.message)
        }
    })

    return (
        <>
            <div
                style={{
                    backgroundColor: 'black',
                    color: '#2cff0f',
                    padding: '1rem',
                    position: 'fixed',
                    zIndex: 1000,
                    bottom: 0
                }}>
                <button onClick={e => map.locate({ watch: true, enableHighAccuracy: true })}>Start</button>
            </div>
            {current.timestamp &&
                <>
                    <Marker position={current.latlng} />
                    <Circle center={current.latlng} radius={current.accuracy} />
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
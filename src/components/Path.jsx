import { useEffect, useState } from "react"
import {
    useMapEvents,
    GeoJSON,
    Marker,
    Circle,
    // Circle
} from "react-leaflet"
import { useMapContext } from "../utils/MapContext"

export const Path = () => {

    const { mapState, setMapState } = useMapContext()
    const [path, setPath] = useState({
        current: {
            latlng: { lat: '', lng: '' },
            accuracy: '',
            altitude: '',
            altitudeAccuracy: '',
            speed: '',
            heading: '',
            timestamp: ''
        },
        top_speed: {
            speed: 0,
            latlng: { lat: '', lng: '' },
            timestamp: ''
        },
        max_alt: {
            altitude: '',
            latlng: { lat: '', lng: '' },
            timestamp: ''
        },
        min_alt: {
            altitude: '',
            latlng: { lat: '', lng: '' },
            timestamp: ''
        },
        distance: 0,
        time: 0,
    })
    const { current } = path


    const map = useMapEvents({
        locationfound(e) {
            // console.log(e)
            map.setView(e.latlng, map.getZoom())
            setPath({
                ...path,
                current: {
                    ...current,
                    latlng: e.latlng,
                    accuracy: e.accuracy,
                    altitude: e.altitude,
                    altitudeAccuracy: e.altitudeAccuracy,
                    speed: e.speed,
                    heading: e.heading,
                    timestamp: e.timestamp
                }
            })
        }
    })

    return (
        <>
            <div style={{
                backgroundColor: 'black',
                color: '#2cff0f',
                padding: '1rem',
                position: 'fixed',
                zIndex: 1000,
                bottom: 0
            }}>
                <button onClick={e => map.locate({watch:true,enableHighAccuracy:true})}>Start</button>
                    <p>Altitude: {current.altitude}</p>
                    <p>Accuracy: {current.altitudeAccuracy}</p>
                    <p>Speed: {current.speed}</p>
                    <p>Time: {current.timestamp}</p>
            </div>
            {current.timestamp &&
                <>
                    <Marker position={current.latlng} />
                    <Circle center={current.latlng} radius={current.accuracy} />
                </>
            }
        </>
    )
}

export default Path
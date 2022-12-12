import {
    // TEST---------------------------------------TEST
    useRef,
    // TEST---------------------------------------TEST
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
// TEST---------------------------------------TEST
import { testEvents } from '../utils/testEvents'
// TEST---------------------------------------TEST

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

    // TEST---------------------------------------TEST
    const i = useRef(0)
    // TEST---------------------------------------TEST

    const map = useMapEvents({
        locationfound(e) {

            // TEST---------------------------------------TEST
            e = testEvents[i.current]
            if (!e) return
            // TEST---------------------------------------TEST

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
                        timerOn: true
                    })

                    // TEST---------------------------------------TEST
                    i.current = i.current + 1
                    // TEST---------------------------------------TEST

                } else {
                    // If > accuracy from last point
                    if (
                        // e.latlng.distanceTo({
                        //         lat: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 1][1],
                        //         lng: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 1][0]
                        //     }) > 13

                        // TEST---------------------------------------TEST
                        true
                        // TEST---------------------------------------TEST

                    ) {
                        map.setView(e.latlng, map.getZoom())
                        // const distance = stats.distance + e.latlng.distanceTo({
                        //     lat: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 1][1],
                        //     lng: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 1][0]
                        // })

                        // TEST---------------------------------------TEST
                        const distance = stats.distance + Math.floor(Math.random() * (18 - 13) + 13)
                        // TEST---------------------------------------TEST

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
                            distance: distance
                        })

                        // TEST---------------------------------------TEST
                        i.current = i.current + 1
                        // TEST---------------------------------------TEST

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
            {
                // !path.latlng
                // TEST---------------------------------------TEST
                true
                // TEST---------------------------------------TEST
                &&
                <button
                    style={{
                        position: 'fixed',
                        zIndex: 500,
                        bottom: '2rem',
                        right: '2rem'
                    }}
                    onClick={e => map.locate({
                        watch:
                            // true,
                            // TEST---------------------------------------TEST
                            false,
                        // TEST---------------------------------------TEST
                        enableHighAccuracy: true
                    })}
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
                <Marker position={path.latlng} />}

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
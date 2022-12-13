import {
    // TEST---------------------------------------TEST
    // useRef,
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
import { BsSaveFill } from 'react-icons/bs'
import { useMapContext } from "../utils/MapContext"
import cookie from "js-cookie"
// TEST---------------------------------------TEST
// import { testEvents } from '../utils/testEvents'
// TEST---------------------------------------TEST

const Path = () => {

    const { stats, setStats, time } = useMapContext()
    const [topSpeed, setTopSpeed] = useState({
        "speed": 0,
        "timestamp": '',
        "coordinates": []
    })

    const [path, setPath] = useState({
        // Marker and circle
        latlng: null,
        accuracy: null,
        data: {
            "type": "Feature",
            "properties": {
                "distance": stats.distance,
                "date": new Date().toISOString().slice(0, 10),
                "time": time,
                "top_speed": topSpeed
            },
            "geometry": {
                "coordinates": [],
                "type": "LineString"
            }
        },
        key: null
    })

    const [show, setShow] = useState(false)

    // TEST---------------------------------------TEST
    // const i = useRef(0)
    // TEST---------------------------------------TEST

    const map = useMapEvents({
        locationfound(e) {
            // TEST---------------------------------------TEST
            // e = testEvents[i.current]
            // if (!e) return
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
                    if (speed > topSpeed.speed) setTopSpeed({
                        "speed": speed,
                        "timestamp": e.timestamp,
                        "coordinates": [e.longitude, e.latitude]
                    })

                    // TEST---------------------------------------TEST
                    // i.current = i.current + 1
                    // TEST---------------------------------------TEST

                } else {
                    // If > accuracy from last point
                    if (
                        e.latlng.distanceTo({
                            lat: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 1][1],
                            lng: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 1][0]
                        }) > 13

                        // TEST---------------------------------------TEST
                        // true
                        // TEST---------------------------------------TEST

                    ) {
                        map.setView(e.latlng, map.getZoom())
                        const distance = stats.distance + e.latlng.distanceTo({
                            lat: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 1][1],
                            lng: path.data.geometry.coordinates[path.data.geometry.coordinates.length - 1][0]
                        })

                        // TEST---------------------------------------TEST
                        // const distance = stats.distance + Math.floor(Math.random() * (18 - 13) + 13)
                        // TEST---------------------------------------TEST

                        setPath({
                            ...path,
                            latlng: e.latlng,
                            accuracy: e.accuracy,
                            data: {
                                "type": "Feature",
                                "properties": {
                                    ...path.data.properties
                                },
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
                        // i.current = i.current + 1
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

    const handleSave = async e => {
        e.preventDefault()
        const r = await fetch('/api/user/lookup')
        const { payload: { _id } } = await r.json()
        const res = await fetch(`/api/user/path/${_id}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(path)
            })
        if (res.ok) {
            window.location.href = '/profile'
        } else {
            alert('Unable to save path')
        }
    }

    return (
        <>
            {/* Remove start button when found */}
            {
                !path.latlng
                    // TEST---------------------------------------TEST
                    // true
                    // TEST---------------------------------------TEST
                    ?
                    <button
                        style={{
                            position: 'fixed',
                            zIndex: 500,
                            top: '7rem',
                            left: 0,
                            right: 0,
                            margin: 'auto',
                            width: '4rem',
                            height: '2rem',
                            backgroundColor: 'black',
                            borderRadius: '.5rem',
                            color: '#2cff0f'
                        }}
                        onClick={e => {
                            map.locate({
                                watch:
                                    true,
                                // TEST---------------------------------------TEST
                                // false,
                                // TEST---------------------------------------TEST
                                enableHighAccuracy: true
                            })
                        }}
                    >Start</button> :
                    <>{cookie.get('auth-token') && path.data.geometry.coordinates.length > 1 && <BsSaveFill
                        style={{
                            position: 'fixed',
                            zIndex: 500,
                            bottom: '1.5rem',
                            left: '1.5rem',
                            margin: 'auto',
                            width: '3rem',
                            height: 'auto',
                            borderRadius: '.5rem',
                            color: '#2cff0f'
                        }}
                        onClick={e => setShow(true)}
                    />}</>
            }
            {show && <div
                style={{
                    position: 'fixed',
                    zIndex: 500,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    margin: 'auto',
                    height: '9rem',
                    width: '80%',
                    textAlign: 'center',
                    padding: '2rem',
                    border: '.25rem solid #2cff0f',
                    borderRadius: '1rem',
                    backgroundColor: 'black',
                    color: '#2cff0f'
                }}
            >Stop drawing and save path?<br />
                <button
                    style={{
                        margin: '1rem 1rem 0 0',
                        backgroundColor: '#3C29FF',
                        color: 'whitesmoke',
                        padding: '.5rem',
                        border: '.25rem solid #2cff0f'
                    }}
                    onClick={handleSave}
                >Save</button>
                or
                <button
                    style={{
                        margin: '1rem 0 0 1rem',
                        backgroundColor: '#3C29FF',
                        color: 'whitesmoke',
                        padding: '.5rem',
                        border: '.25rem solid #2cff0f'
                    }}
                    onClick={e => setShow(false)}
                >Keep Drawing</button>
            </div>}

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
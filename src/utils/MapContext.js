import { useState, createContext, useContext } from "react"

const MapContext = createContext()

export const useMapContext = () => useContext(MapContext)

const MapProvider = (p) => {
    const [mapState, setMapState] = useState({
        path: {
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
        },
        theme: {
            layer: <></>,
            geoStyle: {
                style: function (feature) {
                    return {
                        color: feature.properties.color,
                        weight: feature.properties.weight
                    }
                }
            }
        }
    })

    return <MapContext.Provider value={{
        mapState, setMapState
    }} {...p} />
}

export default MapProvider
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
            features: [],
            distance: 0,
            time: 0,
        },
        theme: {
            layer: '',
            geoStyle: {
                style: function (feature) {
                    return {
                        color: feature.properties.color,
                        weight: feature.properties.weight
                    }
                }
            }
        },
        unitSchema: 'Metric',
        timerOn: false
    })

    return <MapContext.Provider value={{
        mapState, setMapState
    }} {...p} />
}

export default MapProvider
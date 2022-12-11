import { useState, createContext, useContext } from "react"

const MapContext = createContext()

export const useMapContext = () => useContext(MapContext)

const MapProvider = (p) => {
    const [stats, setStats] = useState({
        altitude: null,
        altitudeAccuracy: null,
        speed: 0,
        heading: 0,
        distance: 0,
        timerOn: false,
        unitSchema: 'Metric'
    })

    return <MapContext.Provider value={{
        stats, setStats
    }} {...p} />
}

export default MapProvider
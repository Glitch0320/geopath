import { useState, createContext, useContext } from "react"

const MapContext = createContext()

export const useMapContext = () => useContext(MapContext)

const MapProvider = (p) => {
    const [stats, setStats] = useState({
        speed: 0,
        distance: 0,
        timerOn: false,
        unitSchema: 'Metric'
    })
    const [time, setTime] = useState(0)

    return <MapContext.Provider value={{
        stats, setStats, time, setTime
    }} {...p} />
}

export default MapProvider
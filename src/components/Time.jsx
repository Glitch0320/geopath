import { useMapContext } from "../utils/MapContext"
import { useEffect } from "react"

const Time = () => {

    const { mapState, setMapState } = useMapContext()
    const { path, timerOn } = mapState
    const { time } = path
    let count = 0

    useEffect(() => {
        if (timerOn) {
            const interval = setInterval(() => {
                setMapState({
                    ...mapState,
                    path: {
                        ...path,
                        time: count
                    }
                })
                count++
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [])

    return (
        <span>
            {time < 3600 ?
                new Date(time * 1000).toISOString().slice(14, 19)
                :
                new Date(time * 1000).toISOString().slice(11, 19)}
        </span>
    )
}

export default Time
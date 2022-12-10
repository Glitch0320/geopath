import { useMapContext } from "../utils/MapContext"
import { useEffect } from "react"

const Time = () => {

    const { mapState, setMapState } = useMapContext()
    const { time } = mapState

    let t = 0

    useEffect(() => {
            console.log(t)
            const interval = setInterval(() => {
                setMapState({
                    ...mapState,
                    time: t
                })
                t++
            }, 1000)
            return () => clearInterval(interval)
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
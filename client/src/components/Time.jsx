import { useEffect } from "react"
import { useMapContext } from "../utils/MapContext"

const Time = () => {

    const {time, setTime} = useMapContext()
    let t = 0

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(t)
            t++
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <span>
            {time && time < 3600 ?
                new Date(time * 1000).toISOString().slice(14, 19)
                :
                new Date(time * 1000).toISOString().slice(11, 19)}
        </span>
    )
}

export default Time
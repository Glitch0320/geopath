import { useMapContext } from "../utils/MapContext"
import { useEffect } from "react"

const Time = () => {

    const { stats, setStats } = useMapContext()

    let t = 0

    useEffect(() => {
        const interval = setInterval(() => {
            setStats({
                ...stats,
                time: t
            })
            t++
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <span>
            {stats.time && stats.time < 3600 ?
                new Date(stats.time * 1000).toISOString().slice(14, 19)
                :
                new Date(stats.time * 1000).toISOString().slice(11, 19)}
        </span>
    )
}

export default Time
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
        <span
            style={{
                backgroundColor: 'black',
                color: '#2cff0f',
                padding: '1rem',
                position: 'fixed',
                zIndex: 1000,
                top: '1rem',
                right: '3%',
                width: '8%',
                height: 'auto',
                maxWidth: '50%',
                borderRadius: '.5rem',
                textAlign: 'center'
            }}
        >
            {time < 3600 ? 
            new Date(time * 1000).toISOString().slice(14, 19)
            :
            new Date(time * 1000).toISOString().slice(11, 19)}
        </span>
    )
}

export default Time
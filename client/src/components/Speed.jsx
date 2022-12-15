import { useMapContext } from "../utils/MapContext"

const Speed = () => {

    const { stats } = useMapContext()
    const { speed } = stats

    return (<span>
        <>{(2.23694 * speed).toFixed(1)} mph</>
    </span>)
}

export default Speed
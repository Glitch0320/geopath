import { useMapContext } from "../utils/MapContext"

const Speed = () => {

    const { stats } = useMapContext()
    const { unitSchema, speed } = stats

    return (<span>
        {unitSchema === 'Metric' ?
            <>{speed > 0 ? (3.6 * speed).toFixed(1) : 0} km/h</> :
            <>{(2.23694 * speed).toFixed(1)} mph</>}
    </span>)
}

export default Speed
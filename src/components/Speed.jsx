import { useMapContext } from "../utils/MapContext"

const Speed = () => {

    const { stats } = useMapContext()
    const { unitSchema, speed } = stats

    return (<span>
        {unitSchema === 'Metric' ?
            <>{3.6 * Math.round(speed)} km/h</> :
            <>{Math.round(2.23694 * speed)} mph</>}
    </span>)
}

export default Speed
import { useMapContext } from "../utils/MapContext"

const Speed = () => {

    const { mapState } = useMapContext()
    const { unitSchema, speed } = mapState

    return (<span>
        {unitSchema === 'Metric' ?
            <>{3.6 * Math.round(speed)} km/h</> :
            <>{Math.round(2.23694 * speed)} mph</>}
    </span>)
}

export default Speed
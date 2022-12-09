import { useMapContext } from "../utils/MapContext"

const Speed = () => {

    const { mapState } = useMapContext()
    const { unitSchema } = mapState
    const { speed } = mapState.path.current

    return (<span>
        {unitSchema === 'Metric' ?
            <>{speed ? Math.round(speed) : 0} m/s</> :
            <>{speed ? Math.round(2.23694 * speed) : 0} mph</>}
    </span>)
}

export default Speed
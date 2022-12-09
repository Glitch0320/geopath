

import { useMapContext } from "../utils/MapContext"

const Distance = () => {

    const { mapState } = useMapContext()
    const { unitSchema } = mapState
    const { distance } = mapState.path

    return (<span>
        {unitSchema === 'Metric' ?
            <>{distance ? Math.round(distance) : 0} m</> :
            <>{distance ? Math.round(2.23694 * distance) : 0} mi</>}
    </span>)
}

export default Distance
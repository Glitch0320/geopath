

import { useMapContext } from "../utils/MapContext"

const Distance = () => {

    const { mapState } = useMapContext()
    const { unitSchema } = mapState
    const { distance } = mapState.path

    return (<span>
        {unitSchema === 'Metric' ?
            <>{distance < 1000 ? (
                <>{Math.round(distance)} m</>
            ) : (
                <>{Math.round(distance) / 1000} km</>
            )}</> :
            <>{Math.round(2.23694 * distance)} mi</>}
    </span>)
}

export default Distance
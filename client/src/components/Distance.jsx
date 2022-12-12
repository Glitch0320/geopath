import { useMapContext } from "../utils/MapContext"

const Distance = () => {

    const { stats } = useMapContext()
    const { unitSchema, distance } = stats

    return (<span>
        {unitSchema === 'Metric' ?
            <>{distance < 1000 ? (
                <>{Math.round(distance)} m</>
            ) : (
                <>{(distance / 1000).toFixed(2)} km</>
            )}</> :
            <>{(2.23694 * distance).toFixed(2)} mi</>}
    </span>)
}

export default Distance
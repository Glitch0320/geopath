import { useMapContext } from "../utils/MapContext"

const Distance = () => {

    const { stats } = useMapContext()
    const { unitSchema, distance } = stats

    return (<span>
        {unitSchema === 'Metric' ?
            <>{distance < 1000 ? (
                <>{Math.round(distance)} m</>
            ) : (
                <>{Math.round(distance / 1000)} km</>
            )}</> :
            <>{Math.round(2.23694 * distance)} mi</>}
    </span>)
}

export default Distance
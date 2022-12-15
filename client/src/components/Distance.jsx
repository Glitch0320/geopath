import { useMapContext } from "../utils/MapContext"

const Distance = () => {

    const { stats } = useMapContext()
    const { distance } = stats

    return (<span>
        {distance < 1609.34 ? (
            <>
                {Math.round(distance * 1.09361)} yds
            </>
        ) : (
            <>
                {Math.round(distance * .000621371)} mi
            </>
        )}
    </span>)
}

export default Distance
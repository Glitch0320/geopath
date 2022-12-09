import Speed from "../components/Speed"
import Distance from '../components/Distance'
import Time from '../components/Time'
import { useMapContext } from "../utils/MapContext"

const Stats = () => {

    const { mapState } = useMapContext()
    const { timerOn } = mapState

    return (
        <>
            {/* DISTANCE AND SPEED */}
            <span
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    backgroundColor: 'black',
                    color: '#2cff0f',
                    padding: '1rem',
                    position: 'fixed',
                    zIndex: 1000,
                    top: '1rem',
                    right: '0',
                    left: '0',
                    margin: 'auto',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '70%',
                    borderRadius: '.5rem',
                    border: '.25rem solid #2cff0f'
                }}>
                <Speed />
                <span>|</span>
                <Distance />
                <span>|</span>
                <Time />
            </span>
        </>
    )
}

export default Stats
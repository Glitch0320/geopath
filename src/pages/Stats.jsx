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
                    right: '4rem',
                    left: '0',
                    margin: 'auto',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '50%',
                    borderRadius: '.5rem'
                }}>
                <Speed />
                <span>|</span>
                <Distance />
            </span>
            {timerOn && <Time />}
        </>
    )
}

export default Stats
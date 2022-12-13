import Speed from "../components/Speed"
import Distance from '../components/Distance'
import Time from '../components/Time'
import { useMapContext } from "../utils/MapContext"

const Stats = () => {

    const { stats } = useMapContext()
    const { timerOn } = stats

    return (
        <>
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
                    left: 0,
                    right: 0,
                    margin: 'auto',
                    width: '90%',
                    height: 'auto',
                    borderRadius: '.5rem',
                    border: '.25rem solid #2cff0f'
                }}>
                <Speed />
                <span>|</span>
                <Distance />
                <span>|</span>
                {timerOn ? <Time /> : '00:00'}
            </span>
        </>
    )
}

export default Stats
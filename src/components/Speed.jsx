import { useMapContext } from "../utils/MapContext"

const Speed = () => {

    const { mapState } = useMapContext()
    const { speed } = mapState.path.current

    return (
        <>
            <span
                style={{
                    backgroundColor: 'black',
                    color: '#2cff0f',
                    padding: '1rem',
                    position: 'fixed',
                    zIndex: 1000,
                    top: '.5rem',
                    right: '.5rem',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '50%',
                    borderBottomLeftRadius: '.5rem'
                }}>
                {speed}32 mph
            </span>
        </>
    )
}

export default Speed